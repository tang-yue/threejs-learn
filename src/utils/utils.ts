import * as THREE from "three";

export const addGroundPlane = (scene) => {
  // create the ground plane
  const planeGeometry = new THREE.PlaneGeometry(60, 20, 120, 120);
  const planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xffffff,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;

  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 15;
  plane.position.y = 0;
  plane.position.z = 0;

  scene.add(plane);

  return plane;
};

export const initControls = (camera, renderer, OrbitControls) => {
  const controls = new OrbitControls(camera, renderer.domElement);
  // controls.addEventListener("change", render);
  controls.minDistance = 10;
  controls.maxDistance = 500;
  controls.enablePan = false;

  return controls;
};

export const initRenderer = (container, additionalProperties) => {
  const props = typeof additionalProperties !== "undefined" && additionalProperties ? additionalProperties : {};
  const renderer = new THREE.WebGLRenderer(props);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  renderer.setClearColor(new THREE.Color(0x000000));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  return renderer;
};