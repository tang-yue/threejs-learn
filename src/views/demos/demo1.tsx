import { useEffect } from "react";
import * as THREE from "three";

function init() {
  // 创建一个场景
  const scene = new THREE.Scene();
  // 创建一个相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  // 设置相机的位置
  camera.position.set(0, 0, 20);
  // 创建一个渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  // 设置渲染器的大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 将渲染器添加到页面中
  const container = document.getElementById("demo1") as HTMLElement;
  container.appendChild(renderer.domElement);
  // 添加一个立方体
  // 定义一个立方体的对象
  const cubeGeometry = new THREE.BoxGeometry(2, 2, 2); // 参数：立方体的宽度、高度、深度
  // 定义一个材质
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false }); // 线框模式
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // 将立方体添加到场景中
  scene.add(cube);
  // 添加一个球体
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32); // 参数：球体的半径、水平分段数、垂直分段数
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.position.set(5, 0, 0);
  scene.add(sphere);
  // 添加一个平面，用来接收阴影
  const planeGeometry = new THREE.PlaneGeometry(20, 30); // 平面的宽度和高度
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // 材质
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  scene.add(plane);
  plane.rotateZ(20); // 将平面沿着x轴旋转90度
  plane.position.z = -10; 
  plane.position.x = 3;
  // 让立方体和球体产生阴影
  cube.castShadow = true;
  sphere.castShadow = true;
  // 让平面接收阴影
  plane.receiveShadow = true;
  // 添加聚灯光
  const spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-10, 10, 90);
  scene.add(spotLight);
  // 设置灯光开启阴影
  spotLight.castShadow = true;
  // 让渲染器支持阴影
  renderer.shadowMap.enabled = true;

  const animation= () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // 渲染
    renderer.render(scene, camera);
    requestAnimationFrame(animation); // 通过requestAnimationFrame来实现动画效果
  }
  animation(); 
}

function Demo1() {
  useEffect(() => {
      init();
  }, []);

  return <div id="demo1"></div>;
}

export default Demo1;