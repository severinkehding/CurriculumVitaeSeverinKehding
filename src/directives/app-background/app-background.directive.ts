/**
 *
 * @author      Severin Kehding
 * @version     1.0.0
 * @since
 * @creation    09-Jul-18
 *
 */
import * as THREE from 'THREE';
import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({selector: 'canvas[appBackground]'})
export class AppBackgroundDirective implements OnInit {
  /** Optional Parameters for the WebGL Renderer */
  options: THREE.WebGLRendererParameters = {};

  /** This hold the Three.js PerspectiveCamera Object extends Camera Object
   *
   *  @see {@link THREE.Camera}
   *  @see {@link THREE.PerspectiveCamera}
   */
  camera: THREE.PerspectiveCamera = null;

  /** This hold the Three.js WebGLRenderer Object extends Renderer Object
   *
   *  @see {@link THREE.Renderer}
   *  @see {@link THREE.WebGLRenderer}
   */
  webGLRenderer: THREE.WebGLRenderer = null;

  /** This hold the Three.js Clock Object
   *
   *  @see {@link THREE.Clock}
   */
  clock: THREE.Clock = null;

  /** This hold the Three.js Scene Object extends Renderer Object3D
   *
   *  @see {@link THREE.Object3D}
   *  @see {@link THREE.Scene}
   */
  scene: THREE.Scene = null;

  /** This hold the Three.js Scene Object extends Renderer Object3D
   *
   *  @see {@link THREE.Object3D}
   *  @see {@link THREE.Mesh}
   */
  mesh: THREE.Mesh = null;

  /** Native DOM element */
  element: any = null;

  /** Height and Width for the WebGLRenderer */
  width: number = null;
  height: number = null;
  cubeSin: number;
  smokeParticles: any[];

  constructor(private el: ElementRef) {
    /** Get the Native DOM Element from the Canvas Object */
    this.element = el.nativeElement;
    /** Set Window default sizing based on the browser screen */
    const defaults = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    /** overwrite default parameters for the Three.js Object if some are given, else take the defaults */
    Object.assign(this, this.options, defaults);
  }

  ngOnInit(): void {
    const {element, width, height} = this;

    this.clock = new THREE.Clock();
    const webGLRenderer = this.webGLRenderer = new THREE.WebGLRenderer({
      canvas: element,
    });

    webGLRenderer.setSize(width, height);

    this.scene = new THREE.Scene();

    const meshGeometry = new THREE.CubeGeometry(200, 200, 200);
    const meshMaterial = new THREE.MeshLambertMaterial({
      color: 0xaa6666,
      wireframe: false,
    });
    this.mesh = new THREE.Mesh(meshGeometry, meshMaterial);

    this.cubeSin = 0;

    this.addCamera();
    this.addLights();
    this.addParticles();
    this.addBackground();
    this.update();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    /** extract the PerspectiveCamera from the Three.js Object */
    const {camera} = this;

    /** Set Window Widht and Height based on the current inner browser container size */
    const windowWidth = event.target.innerWidth;
    const windowHeight = event.target.innerHeight;

    /** calculate camera aspect ratio and update the projection matrix because of the parameter change  */
    camera.aspect = windowWidth / windowHeight;
    camera.updateProjectionMatrix();

    /** Update the canvas size */
    this.webGLRenderer.setSize(windowWidth, windowHeight);
  }

  /**
   * This Function will add the Background scene and render the grid afterwards
   */
  addBackground() {
    /** Extract scene from the Three.js Object */
    const {scene} = this;
    const textureLoader = new THREE.TextureLoader();
    /** Define Grid Buffer */
    const textGeometry = new THREE.PlaneBufferGeometry(600, 320);

    /** Load the Grid asset which functions as Background */
    textureLoader.load('assets/images/grid.png', (texture) => {
      const textMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: texture,
        opacity: 1,
      });
      /** Define the repeat pattern of the background image to create a real grid */
      textMaterial.map.wrapS = THREE.RepeatWrapping;
      textMaterial.map.wrapT = THREE.RepeatWrapping;
      textMaterial.map.repeat.set(20, 20);
      const text = new THREE.Mesh(textGeometry, textMaterial);

      text.position.z = 800;
      scene.add(text);
    });
  }

  /**
   * Let 'em smokes spin indefinitely
   *
   * @param delta - get the last seconds since the last call of the method.
   *                @see {@link THREE.Clock.getDelta()}
   */
  evolveSmoke(delta: number) {
    /** Extract the Smoke particles */
    const {smokeParticles} = this;

    let smokeParticlesLength = smokeParticles.length;

    /** Let 'em spin! */
    while (smokeParticlesLength--) {
      smokeParticles[smokeParticlesLength].rotation.z += delta * 0.2;
    }
  }

  /**
   * Add the lights to the spinning smoke particles to create some "depth"
   */
  addLights() {
    /** Extract the Scene object and add some light to the smoke */
    const {scene} = this;
    /** Create White light particles with 0.3 the intensity */
    const light = new THREE.DirectionalLight(0xffffff, 0.3);
    /** shine from bottom*/
    light.position.set(-1, 0, 1);
    scene.add(light);
  }

  /**
   * Add the Camera Scene. This projection mode is designed to mimic the way the human eye sees.
   */
  addCamera() {
    /** Extract Scene object to add the camera angle */
    const {scene} = this;
    /** Define FOV, Aspect, near and far plane of the camera angle */
    const camera = this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 1, 10000);

    camera.position.z = 1000;
    scene.add(camera);
  }

  /**
   * Add the Smoke particles themselves
   */
  addParticles() {
    /** Exctrat scene to add smoke particles */
    const {scene} = this;
    const textureLoader = new THREE.TextureLoader();
    const smokeParticles = this.smokeParticles = [];

    /** Load the Smoke image ressource */
    textureLoader.load('assets/images/smoke.png', (texture) => {
      const smokeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: texture,
        transparent: true,
      });
      /** Define the Filter of the smoke partice and the size of the object itself */
      smokeMaterial.map.minFilter = THREE.LinearFilter;
      const smokeGeometry = new THREE.PlaneBufferGeometry(200, 200);

      const smokeMeshes = [];
      /** Limit the smoke mashes, overlapping etc. */
      let limit = 150;

      while (limit--) {
        smokeMeshes[limit] = new THREE.Mesh(smokeGeometry, smokeMaterial);
        smokeMeshes[limit].position.set(Math.random() * 500 - 250, Math.random() * 500 - 250, Math.random() * 1000 - 100);
        smokeMeshes[limit].rotation.z = Math.random() * 360;
        smokeParticles.push(smokeMeshes[limit]);
        scene.add(smokeMeshes[limit]);
      }
    });
  }

  /**
   * Render Each reload a differend position.
   * This Function will also render the whole scene and add the needed angles
   */
  render() {
    const {mesh} = this;
    let {cubeSin} = this;

    cubeSin += 0.01;

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;
    mesh.position.z = 100 + Math.sin(cubeSin) * 500;

    this.webGLRenderer.render(this.scene, this.camera);
  }

  /**
   *  Update the Smoke particles to make 'em spin.
   */
  update() {
    /** Call Spinning function with the time delta of the last call since the smoke started one cycle */
    this.evolveSmoke(this.clock.getDelta());
    this.render();

    /** Tell the browser that i want to perform an animation */
    requestAnimationFrame(this.update.bind(this));
  }
}
