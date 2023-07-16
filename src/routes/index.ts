import React from 'react';
import Home from '../views/home';
import Example1 from '../views/example1';
import Example2 from '../views/example2';
// import Example3 from '../views/example3';
import Demo1 from '../views/demos/demo1';
import Demo2 from "../views/demos/demo2";
import Demo3 from '../views/demos/demo3/demo3.tsx';
import Demo4 from "../views/demos/demo4/demo4.tsx";
import Demo5 from '../views/demos/demo5/demo5.tsx';
import Demo6 from '../views/demos/demo6/demo6.tsx';
import Demo7 from '../views/demos/demo7/demo7.tsx';
// import About from './components/About';
// import Users from './components/Users';
interface RouteConfig {
  path: string;
  component: React.ComponentType<any>;
  exact?: boolean;
}

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    exact: true
  },
  {
    path: '/example1',
    component: Example1
  },
  {
    path: '/example2',
    component: Example2
  },
  {
    path: '/users',
    component: Home
  },
  {
    path: '/demo1',
    component: Demo1
  },
  {
    path: '/demo2',
    component: Demo2
  },
  {
    path: '/demo3',   // 直线材质
    component: Demo3
  },
  {
    path: '/demo4',   // 动画
    component: Demo4
  },
  {
    path: '/demo5',   // 动画 orbitControls
    component: Demo5
  },
  {
    path: '/demo6',   //  纹理，基础纹理/凹凸纹理
    component: Demo6
  },
  {
    path: '/demo7',   // 粒子和粒子系统
    component: Demo7
  }
];

export default routes;