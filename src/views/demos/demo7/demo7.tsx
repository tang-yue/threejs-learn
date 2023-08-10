import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Demo7 = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();

  useEffect(() => {
    const init = () => {
      // 创建一个场景
      const scene = new THREE.Scene();
      sceneRef.current = scene;
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
      renderer.setClearColor(0xffffff, 1.0);
    
      // 设置渲染器输出的大小
      // const { clientWidth, clientHeight } = containerRef.current!;
      renderer.setSize(window.innerWidth, window.innerHeight);
      
      // 将渲染器添加到页面中
      containerRef.current!.appendChild(renderer.domElement);
      // 添加一个立方体
      const cubeGeometry = new THREE.BoxGeometry(2, 2, 2);
      const cubeMaterial = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: false,
      });
      const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
      // scene.add(cube);

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
      cube.castShadow = true;
      sphere.castShadow = true;

      // 让平面接收阴影
      plane.receiveShadow = true;

      // 添加聚灯光
      const spotLight = new THREE.SpotLight(0xffffff);
      spotLight.position.set(-10, 10, 90);
      // scene.add(spotLight);

      // 设置灯光开启阴影
      spotLight.castShadow = true;

      // 让渲染器支持阴影
      renderer.shadowMap.enabled = true;

      // 添加雾化效果
      scene.fog = new THREE.Fog(0xffffff, 1, 50);

      // createNormalSprite();
      // 创建一个基础的粒子
      // function createNormalSprite() {
      //   for (let i = 0; i < 5; i++) {
      //     for (let j = 0; j < 5; j++) {
      //       const spriteMaterial = new THREE.SpriteMaterial({
      //         color: Math.random() * 0xffffff,
      //       });
      //       const sprite = new THREE.Sprite(spriteMaterial);
      //       sprite.position.set(i * 5, j * 5, 0);
      //       scene.add(sprite);
      //     }
      //   }
      // }
      createParticleSystem();
      // 创建一个粒子系统函数
      function createParticleSystem() {
        // 创建一个粒子系统几何体
        const geometry = new THREE.BufferGeometry();
        // 创建一个粒子系统材质
        const material = new THREE.PointsMaterial({
          size: 0.2,
          vertexColors: true,
          color: 0xf0ffff,
        });
        // 创建粒子系统
        const particleCount = 1000;
        const positions = new Float32Array(particleCount * 3); // 设置位置
        for (let i = 0; i < particleCount; i++) {
          const x = Math.random() * 20 - 10;
          const y = Math.random() * 20 - 10;
          const z = 0;
          positions[i * 3] = x;
          positions[i * 3 + 1] = y;
          positions[i * 3 + 2] = z;
        }
        geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        // 创建粒子系统 
        const particleSystem = new THREE.Points(geometry, material);
        scene.add(particleSystem);
      }


      const animate = () => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

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
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Demo7;