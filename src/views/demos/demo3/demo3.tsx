
import React, { useEffect } from "react";
import * as THREE from "three";
import { createMultiMaterialObject } from "three/examples/jsm/utils/SceneUtils";
// 直线材质demo
function init() {
  // 创建一个场景
  const scene = new THREE.Scene();
  // 创建一个相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  // 创建一个正交相机
  // const camera = new THREE.OrthographicCamera(-10, 10, 10, -10, 0.1, 100);
  // 设置相机的位置
  camera.position.set(0, 0, 20);
  // 创建一个渲染器
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  // 设置渲染器的大小
  renderer.setSize(window.innerWidth, window.innerHeight);
  // 将渲染器添加到页面中
  const container = document.getElementById("demo3") as HTMLElement;
  container.appendChild(renderer.domElement);
  // 添加一个立方体
  // 定义一个立方体的对象
  // const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);  
  // 定义一个材质
  const lambert = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: false }); // wireframe 为true 线框模式
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }); // 线框模式
   const LineMaterial = new THREE.LineBasicMaterial( { // 直线材质
	color: 0xffffff,
	linewidth: 100,
	linecap: 'round', //ignored by WebGLRenderer
	linejoin:  'round' //ignored by WebGLRenderer
   });
  const dashMaterial = new THREE.LineDashedMaterial({
	color: 0xffffff,
	linewidth: 1,
	scale: 1,
	dashSize: 3,
	gapSize: 1,
  });
  // 自定义二维平面
  const shape = new THREE.Shape()
  shape.moveTo(0, 0);
  shape.lineTo(0, 10);
  shape.lineTo(10, 10);
  shape.lineTo(10, 0);
  shape.lineTo(0, 0);
  const cubeGeometry = new THREE.ShapeGeometry(shape)
  // 二维圆
  // const circleGeometry = new THREE.CircleGeometry( 5, 10, 0, Math.PI * 2 );
  // const cube = new THREE.Mesh(cubeGeometry, dashMaterial); // 虚线材质
  // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // const cube = new THREE.Mesh(cubeGeometry, LineMaterial);  // 直线材质
  // const cube = createMultiMaterialObject(cubeGeometry, [lambert, cubeMaterial]); // 联合材质
  // const cube = new THREE.Line(cubeGeometry, cubeMaterial);
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  // 将立方体添加到场景中
  scene.add(cube);
  // 添加一个球体
  // const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  // const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
  // const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  // sphere.position.set(5, 0, 0);
  // scene.add(sphere);
  // 添加一个平面，用来接收阴影
  const planeGeometry = new THREE.PlaneGeometry(20, 30); // 平面的宽度和高度
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff }); // 材质
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  // scene.add(plane);
  plane.rotateZ(20); // 将平面沿着x轴旋转90度
  plane.position.z = -10; 
  plane.position.x = 3;
  // 让立方体和球体产生阴影
  cube.castShadow = true;
  // sphere.castShadow = true;
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
  // 添加雾化效果
  scene.fog = new THREE.Fog(0xffffff, 1, 50); // 可以看到球体距离起点越远，变得越模糊(处在雾化的效果里)
  const animation= () => {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // 渲染
    renderer.render(scene, camera);
    requestAnimationFrame(animation); // 通过requestAnimationFrame来实现动画效果
  }
  animation(); 
}

function Demo3() {
  useEffect(() => {
      init();
  }, []);

  return <div id="demo3"></div> // 这里的id要和上面的container的id一致
}

export default Demo3;