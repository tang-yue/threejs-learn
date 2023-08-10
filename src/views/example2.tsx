/* eslint-disable */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { initRenderer, initControls, addGroundPlane } from "../utils/utils.js";
import { createMultiMaterialObject } from "../../node_modules/three/examples/jsm/utils/SceneUtils";

let container: any;
let camera: any;
let scene: any;
let renderer: any;
let stats: any;
let controls: any;
let clock: any;
let plane: any;
let params: any;
let operations: any;

  // 使用专栏的列子，或者使用刚刚看到的列子。
  // 先使用专栏的，然后进行对比

function init() {
  container = document.getElementById("container2");
  scene = new THREE.Scene();

  //创建相机对象
  // camera = initCamera(scene);
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 50, 110);
  camera.position.set(-50, 40, 50);
  camera.lookAt(scene.position);
  renderer = initRenderer(container);

  // controls
  controls = initControls(camera, renderer, OrbitControls);
  // stats
  stats = new Stats();
  container.appendChild(stats.dom);
  // AxisHelper
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);

  // add subtle ambient lighting // 环境光
  const ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  // // add spotlight for the shadows // 聚光灯
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-40, 60, -10);
  spotLight.castShadow = true;
  scene.add(spotLight);

  // // create the ground plane
  // plane = addGroundPlane(scene);
  // scene.add(plane);

  // createCorps
  createCorps();

  window.addEventListener("resize", onWindowResize, false);
}

function render() {
  stats.update();

  animate();
  // render using requestAnimationFrame
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

function animate() {
  // 这个地方又不跳动了
  // rotate the cubes around its axes
  scene.traverse((e) => {
    if (e instanceof THREE.Group) {
      // console.log('animate')
      e.rotation.x += 2;
      // e.rotation.x += params.rotationSpeed;
      e.rotation.y += params.rotationSpeed;
      console.log(e.rotation.y, '这里没有执行吗？')
      e.rotation.z += params.rotationSpeed;
    }
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

// createCorps
function createCorps() {
  setupControls();
}

  function setupControls() {
  // 要将下面这段代码改写成react版
    params = new (function () {
      this.cameraNear = camera.near;
      this.cameraFar = camera.far;
      this.rotationSpeed = 0.01;
      this.numberOfObjects = scene.children.length;
      this.color = 0x00ff00;

      this.removeCube = () => {
        const allChildren = scene.children;
        const lastObject = allChildren[allChildren.length - 1];
        if (lastObject instanceof THREE.Group) {
          scene.remove(lastObject);
          this.numberOfObjects = scene.children.length;
        }
      };

      this.addCube = () => {
        const cubeSize = Math.ceil(3 + Math.random() * 3);
        const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);

        //let cubeMaterial = new THREE.MeshLambertMaterial({color:  Math.random() * 0xffffff });
        const cubeMaterial = new THREE.MeshDepthMaterial();
        const colorMaterial = new THREE.MeshBasicMaterial({
          color: params.color,
          transparent: true,
          blending: THREE.MultiplyBlending,
        });
        const cube = new createMultiMaterialObject(cubeGeometry, [colorMaterial, cubeMaterial]);
        cube.children[1].scale.set(0.99, 0.99, 0.99);
        cube.castShadow = true;

        // position the cube randomly in the scene
        cube.position.x = -60 + Math.round(Math.random() * 100);
        cube.position.y = Math.round(Math.random() * 10);
        cube.position.z = -100 + Math.round(Math.random() * 150);

        // add the cube to the scene
        scene.add(cube);
        this.numberOfObjects = scene.children.length;
      };

      this.outputObjects = () => {
        console.log(scene.children);
      };
    })();

  const gui = new GUI();
  gui.addColor(params, "color");
  gui.add(params, "rotationSpeed", 0, 0.5);
  gui.add(params, "addCube");
  gui.add(params, "removeCube");
  gui.add(params, "cameraNear", 0, 50).onChange((e) => {
    camera.near = e;
    camera.updateProjectionMatrix();
  });
  gui.add(params, "cameraFar", 50, 200).onChange((e) => {
    camera.far = e;
    camera.updateProjectionMatrix();
  });

  let i = 0;
  while (i < 10) {
    params.addCube();
    i++;
  }

  render();

  return params;
  }
function Example2() {
  useEffect(() => {
    init();
    render();
  }, []);

  return <div id="container2"></div>;
}

export default Example2;