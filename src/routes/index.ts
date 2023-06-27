import React from 'react';
import Home from '../views/home';
import Example1 from '../views/example1';
import Example2 from '../views/example2';
import Example3 from '../views/example3';
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
  }
];

export default routes;