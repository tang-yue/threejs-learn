import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Demo6 = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useEffect(() => {
    const init = () => {
      // 创建一个场景
      const scene = new THREE.Scene();
      // sceneRef.current = scene;
      // 创建一个透视相机
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      );
      // 设置相机的位置
      camera.position.set(0, 0, 20);
      cameraRef.current = camera;

      // 创建一个渲染器
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      rendererRef.current = renderer;
    
      // 设置渲染器输出的大小
      // const { clientWidth, clientHeight } = containerRef.current!;
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // 将渲染器添加到页面中
      containerRef.current!.appendChild(renderer.domElement);
      // 添加一个立方体
      const cubeGeometry = new THREE.BoxGeometry(6, 6, 6);
      // const cubeMaterial = new THREE.MeshBasicMaterial({
      //   color: 0x00ff00,
      //   wireframe: false,
      // });
      // const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      // scene.add(cube);
      // 创建一个纹理加载器 ===> 基础纹理
      const textureLoader = new THREE.TextureLoader();
      // // // 加载纹理
      // textureLoader.load("../../../public/textures/stone.jpg", (texture) => {
      //   // 创建一个材质
      //   const material = new THREE.MeshLambertMaterial({ // 对光源有反应的，暗淡材质
      //   // const material = new THREE.MeshPhongMaterial({
      //     map: texture
      //   });
      //   const cube = new THREE.Mesh(cubeGeometry, material);
      //   scene.add(cube);
      // })
      // 凹凸纹理
      textureLoader.load("../../../public/textures/stone.jpg", (texture) => {
        textureLoader.load("../../../public/textures/stone-bump.jpg", (bump) => {
          // 创建一个材质
          const material = new THREE.MeshPhongMaterial({ // 对光源有反应的，明亮材质
            map: texture,
            bumpMap: bump,
            bumpScale: 0.5
          });
          const cube = new THREE.Mesh(cubeGeometry, material);
          cube.position.set(5, 0, 0);
          scene.add(cube);
          })
      })
      

      // 添加一个球体
      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x0000ff,
        wireframe: false,
      });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(5, 0, 0);
      // scene.add(sphere);
      // 添加一个平面，用来接收阴影
      const planeGeometry = new THREE.PlaneGeometry(20, 30);
      const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
      });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      // scene.add(plane);
      plane.rotateZ(20);
      plane.position.z = -10;
      plane.position.x = 3;

      // 让立方体和球体产生阴影
      // cube.castShadow = true;
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

      // 添加雾化效果
      scene.fog = new THREE.Fog(0xffffff, 1, 50);

      const animate = () => {
        // cube.rotation.x += 0.01;
        // cube.rotation.y += 0.01;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      animate();
    };

    // 在容器元素正确挂载之后初始化场景
    if (containerRef.current) {
      init();
    }
  }, []);

  return (
    <div
      id="demo2"
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Demo6;