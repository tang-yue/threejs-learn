import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// orbitControls
function MyScene(): JSX.Element {
  const mountRef = useRef<HTMLDivElement>(null);
  const [renderer, setRenderer] = useState<THREE.WebGLRenderer | null>(null);
  const [scene, setScene] = useState<THREE.Scene | null>(null);
  const [camera, setCamera] = useState<THREE.PerspectiveCamera | null>(null);
  const [cube, setCube] = useState<THREE.Mesh | null>(null);
  const [orbitControls, setOrbitControls] = useState<OrbitControls | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    // 创建场景
    const newScene = new THREE.Scene();
    setScene(newScene);

    // 创建相机
    const newCamera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    newCamera.position.z = 5;
    setCamera(newCamera);

    // 创建渲染器
    const newRenderer = new THREE.WebGLRenderer();
    newRenderer.setSize(window.innerWidth, window.innerHeight);
    if (mountRef.current) {
      mountRef.current.appendChild(newRenderer.domElement);
    }
    setRenderer(newRenderer);

    // 创建立方体
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const newCube = new THREE.Mesh(geometry, material);
    newScene.add(newCube);
    setCube(newCube);

    // 创建 OrbitControls 控制器
    const newOrbitControls = new OrbitControls(newCamera, newRenderer.domElement);
    newOrbitControls.autoRotate = true;
    newOrbitControls.autoRotateSpeed = 2.0;
    newOrbitControls.minDistance = 2;
    newOrbitControls.maxDistance = 10;
    newOrbitControls.minPolarAngle = 0;
    newOrbitControls.maxPolarAngle = Math.PI / 2;
    setOrbitControls(newOrbitControls);

    // 标记已经完成初始化
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    console.log(`isInitialized: ${isInitialized}`);
  }, [isInitialized]);

  // 渲染循环
  useEffect(() => {
    function animate() {
      requestAnimationFrame(animate);
      if (orbitControls && isInitialized) {
        orbitControls.update();
      }
      if (renderer && scene && camera && isInitialized) {
        renderer.render(scene, camera);
      }
    }
    animate();

    // 组件卸载时销毁场景、相机、渲染器和控制器
    return () => {
      if (renderer) {
        renderer.dispose();
      }
      if (scene) {
        scene.dispose();
      }
      if (orbitControls) {
        orbitControls.dispose();
      }
    };
  }, [orbitControls, renderer, scene, camera, isInitialized]);

  return <div ref={mountRef} />;
}

export default MyScene;