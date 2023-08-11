react + ts 实现的几个小demo
# three.js
- [基础](#threejs-基础-简单实现一些阴影雾化的效果)
  - [什么是three.js](#一什么是threejs)
  - [渲染三维对象](#二渲染三维对象)
  - [场景添加灯光](#三场景添加灯光)
  - [场景添加阴影效果](#四场景添加阴影效果)
  - [添加雾化效果](#五添加雾化效果)
- [组件](#threejs-组件)
  - [Scene](#一基础组件-scene)
  - [几何体](#二基础组件-几何体)
  - [正射投影相机](#三正射投影相机)
  - [透视投影相机](#四透视投影相机)
- [光源](#threejs-光源)
  - [光源类型](#一光源类型)
  - [聚光灯](#二聚光灯光源)
  - [环境光](#三环境光)
  - [点光源](#四点光源)
  - [平行光](#五平行光)
  - [半球光](#六半球光)
- [材质](#threejs-材质)
  - [材质简介](#一材质简介)
  - [基础材质](#二基础材质-meshbasicmaterial)
  - [深度材质](#三深度材质-meshdepthmaterial)
  - [法向材质](#四法向材质-meshnormalmaterial)
  - [lambert 网格材质 MeshLambertMaterial](#五lambert-网格材质-meshlambertmaterial)
  - [phong 材质 MeshPhongMaterial](#六phong-材质-meshphongmaterial)
  - [着色器材质](#七着色器材质)
  - [直线和虚线](#八直线和虚线)
  - [联合材质](#九联合材质)
- [几何体](#threejs-几何体)
  - [几何体简介](#一几何体简介)
  - [二维平面](#二二维平面)
  - [二维圆](#三二维圆)
  - [自定义二维图形](#四自定义二维图形)
  - [立方体](#五立方体)
  - [其他同理不赘述]
- [动画/变换相机的角度](#threejs-动画变换相机的角度)
  - [基础动画](#一基础动画)
  - [引用Tween.js动画库](#二通过tweenjs-动画库)
  - [加载外部文件](#三加载外部文件)
  - [使用相机控件](#四使用相机控件)
- [纹理](#threejs-纹理)
  - [基础纹理](#一基础纹理)
  - [凹凸纹理](#二凹凸纹理)
  - [其他同理不赘述]
- [粒子/粒子系统](#threejs-粒子粒子系统)
## three.js 基础 简单实现一些阴影、雾化的效果
### 一、什么是three.js

### 二、渲染三维对象
  相机的参数
  - PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
  - fov — 摄像机视锥体垂直视野角度
  - aspect — 摄像机视锥体长宽比
  - near — 摄像机视锥体近端面
  - far — 摄像机视锥体远端面

### 三、场景添加灯光
### 四、场景添加阴影效果
### 五、添加雾化效果

以上demo1 demo2 可看效果

## threejs 组件
### 一、基础组件 Scene
Scene 的一些方法和介绍
  - add()：向场景中添加对象
  - getObjectByName()：创建对象时可以赋值一个唯一name，通过此方法可以获取该对象
  - remove()：从场景中移除一个对象  `scene.remove(sphere)`
Scene 的一些属性和介绍
  - children： 返回场景中所有对象的列表
  - fog：设置场景中雾化效果
  - overrideMaterial：强制场景中所有对象使用相同材质

### 二、基础组件 几何体
如何修改几何体的位置，旋转，缩放来更好的实现动画效果
- 直接赋值
  ```js
    sphere.position = new THREE.Vector3(0,0,0);
    sphere.rotation = new THREE.Vector3(0.5 * Math.PI, 0, 0);
    sphere.scale = new THREE.Vector3(2,0,0);
  ```
- 单个赋值
  ```js
    sphere.position.x = 0
    sphere.rotation.x = 0.5 * Math.PI
    sphere.scale.x = 2
  ```
- 通过方法赋值
  ```js
  sphere.position.set(0,0,0)
  sphere.rotation.set(0.5 * Math.PI, 0, 0)
  sphere.scale.set(2,0,0)
  ```
### 三、正射投影相机
  ```js
    const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 )
  ```

  - left：视锥体左侧面的位置
  - right：视锥体右侧面的位置
  - top：视锥体顶部面的位置
  - bottom：视锥体底部面的位置
  - near：近截面，表示摄像机视锥体的近端面到摄像机的距离。在这个距离以内的物体将不会被渲染出来。通常设为1
  - far：远截面，表示摄像机视锥体的远端面到摄像机的距离。在这个距离以外的物体也将不会被渲染出来。其值应该大于near，并且不能太大，否则会影响性能。

  | 参数 | 效果 |
| --- | --- |
| left | 视锥体左侧位置变化，值变小时，场景向右移动。 |
| right | 视锥体右侧位置变化，值变小时，场景向左移动。 |
| top | 视锥体顶部位置变化，值变小时，场景向下移动。 |
| bottom | 视锥体底部位置变化，值变小时，场景向上移动。 |
| near | 近截面变化，值变小时，离摄像机近的物体被裁剪，值变大时，近截面距离摄像机更远。 |
| far | 远截面变化，值变小时，离摄像机远的物体被裁剪，值变大时，远截面距离摄像机更远。 |

  具体参数效果
  | 参数 | 效果 |
| --- | --- |
| left=-100 | 视锥体左侧位置变小，场景向右移动。 |
| left=100 | 视锥体左侧位置变大，场景向左移动。 |
| right=-100 | 视锥体右侧位置变小，场景向左移动。 |
| right=100 | 视锥体右侧位置变大，场景向右移动。 |
| top=-100 | 视锥体顶部位置变小，场景向下移动。 |
| top=100 | 视锥体顶部位置变大，场景向上移动。 |
| bottom=-100 | 视锥体底部位置变小，场景向上移动。 |
| bottom=100 | 视锥体底部位置变大，场景向下移动。 |
| near=10 | 摄像机距离场景更近，场景中离摄像机近的物体被裁剪。 |
| near=100 | 摄像机距离场景更远，场景中离摄像机近的物体不会被裁剪。 |
| far=1000 | 摄像机可以看到更远的物体。 |
| far=5000 | 摄像机可以看到更远的物体，但如果值过大，会导致性能问题。 |


  在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都**保持不变**。

  但是在透视投影模式下，物体的大小取决于它们在**视野中的位置和距离摄像机的距离**，透视摄像机的参数会影响物体的大小和形状。fov值越大，场景范围越广，远处的物体看起来更小；near值过小会导致物体变得非常大，超出渲染范围；far值过大会影响性能，而且远处的物体在渲染图像中可能会变得非常小。

### 四、透视投影相机
```js
const camera = new THREE.PerspectiveCamera( 45, width / height, 1, 1000 ); // 分别对应fov aspect near far
```
- fov (field of view)：视场角，以度数为单位。用于控制摄像机的视野范围，其值越小，表示视野范围越小，视野越集中；值越大，表示视野范围越大，视野越分散。在three.js中，通常使用45度的视场角。
- aspect：宽高比，表示摄像机视野的宽度与高度之比。它的值等于场景渲染区域的宽度除以高度。
- near：近截面，表示摄像机视锥体的近端面到摄像机的距离。在这个距离以内的物体将不会被渲染出来。通常设为1。
- far：远截面，表示摄像机视锥体的远端面到摄像机的距离。在这个距离以外的物体也将不会被渲染出来。其值应该大于near，并且不能太大，否则会影响性能。

摄像机视锥体：用来决定哪些物体会被渲染的一个几何体。它是一个由6个平面组成的六面体，其中一个端点是摄像机位置，而另一个端点则是远截面(far plane)上的顶点。视锥体的形状和大小由透视摄像机的参数决定，包括视场角(fov)、宽高比(aspect)、近截面(near)和远截面(far)。当场景渲染时，仅位于视锥体内的物体（几何体）才会被渲染。因此，摄像机的位置和参数设置非常重要，以确保需要渲染的物体在视锥体内

| 参数 | 效果 |
| --- | --- |
| fov | 视野范围变化，值越小，视野范围越小，视野越集中；值越大，视野范围越大，视野越分散 |
| aspect | 视野比例变化，值变小时，场景被压缩，值变大时，场景被拉伸 |
| near | 近截面变化，值变小时，离摄像机近的物体被裁剪，值变大时，近截面距离摄像机更远 |
| far  | 远截面变化，值变小时，离摄像机远的物体被裁剪，值变大时，远截面距离摄像机更远 |

具体值改变以及出现的效果
| 参数 | 效果 |
| --- | --- |
| fov=30 | 视野范围变小，场景看起来更加聚焦 |
| fov=90 | 视野范围变大，场景看起来更加散步 |
| aspect=1 | 场景被压缩，宽度和高度相等 |
| aspect=2 | 场景被拉伸，宽度是高度的两倍 |
| near=10 | 摄像机距离场景更近，场景中离摄像机近的物体被裁剪 |
| near=100 | 摄像机距离场景更远，场景中离摄像机近的物体不会被裁剪 |
| far=1000 | 摄像机可以看到更远的物体 |
| far=5000 | 摄像机可以看到更远的物体，但如果值过大，会导致性能问题 |

## threejs 光源
### 一、光源类型

1. 基础光源
  - 环境光（AmbientLight）：基础光源，作用在当前场景内的所有物体上
  - 点光源（PointLight）：空间中的一个点，向所有方向发射光线，如：恒星光源
  - 聚光灯光源（SpotLight）：如：灯光、手电筒等
  - 平行光（DirectionalLight）：如：太阳光照射再地球上

2. 特殊光源
  - 半球光（HemisphereLight）：可以参考夕阳和日出时的光，创建更加自然的户外效果
  - 面光源（AreaLight）：散发光线的平面，不是一个点

3. 光源效果
  - 镜面眩光（LensFlare）：不是光源，但是可以未光源添加炫光效果

### 二、聚光灯光源
 - 锥形效果，可以参考手电筒、路灯等光源。（需要设置光源位置）
 - 可以生成阴影

使用方式
```js
new THREE.SpotLight(color, intensity, distance, angle, exponent)
```
参数定义
| 参数名称 | 描述 | 默认值 |
| --- | --- | --- |
| color | 光源颜色 | 无 |
| intensity | 光照强度 | 1 |
| distance  | 光源照射的最大距离 | 0（无限远） |
| angle  | 光线照射范围的角度 | Math.PI/3 |
| exponent  | 控制光线强度的指数因子 | 0 |

备注：在spotLight中，光线的强度随着距离的增加而减少。exponent属性的作用是使光线在距离光源较远的地方更快的减弱。exponent越大，光线在距离光源较远的地方就会更快的减弱。

[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-03/03-spot-light.html)

### 三、环境光
- 不需要设置位置，对整个场景内的对象都生效
- 没有特定的来源，也不会影响阴影的形成
- 不能作为场景内的唯一光源，需要配合其他光源使用
- 用来减弱阴影，或者给物体添加一些颜色

```js
const light = new THREE.AmbientLight( 0x404040 ); // 柔和的白光
scene.add( light );
```
[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-03/01-ambient-light.html)

### 四、点光源
- 单点发光，照射所有方向的光源。（需要设置光源位置）
- 不会生成阴影。
```js
const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set( 50, 50, 50 );
scene.add( light );
```
参数定义
| 参数名称 | 描述 | 默认值 |
| --- | --- | --- |
| color | 光源颜色 | 无 |
| intensity | 光照强度 | 1 |
| distance  | 光源照射的最大距离 | 0（无限远） |

[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-03/02-point-light.html) 可调整参数看到变化

### 五、平行光
- 平行光也可以模拟太阳光
- 会产生阴影
```js
const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 ); // 第二个参数是光照强度
scene.add( directionalLight );
```
[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-03/04-directional-light.html)

### 六、半球光
- 模拟室外自然光照，光源直接放置于场景之上，光照颜色从天空颜色渐变到地面光线颜色
- 不会产生阴影
```js
const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 ); // 1、天空颜色 2、地面颜色 3、光照强度
scene.add( light );
```
[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-03/05-hemisphere-light.html)

第三章 第五小节 半球光

## threejs 材质

### 一、材质简介

- 网络基础材质（MeshBasicMaterial）： 基础材质，显示几何体线框或添加简单颜色
- 网络深度材质（MeshDepthMaterial）： 根据网络到相机的距离，决定如何染色
- 网络法向材质（MeshNormalMaterial）：根据物体表面法向向量计算颜色
- 网络朗伯材质（MeshLambertMaterial）：会考虑光照，创建暗淡的，不光亮的物体
- 网络Phong(冯氏)材质（MeshPhongMaterial）：会考虑光照，创建光亮的物体
- 着色器材质 (ShaderMaterial)：自定义着色器程序
- 直线基础材质 (LineBasicMaterial)：用于直线几何体
- 虚线材质（LineDashedMaterial）：创建虚线效果
  
材质的属性：基础属性；融合属性；高级属性

1. 基础属性

| 属性名称 | 描述 |
| --- | --- |
| id | 标识，创建物体时赋值 |
| name | 名称，可以通过此属性赋值给物体名称 |
| opacity  | 透明度恶，取值范围0 ~ 1，需要和transparent 结合使用 |
| transparent  | 是否透明，true 透明，并且可以修改透明度，false 不透明 |
| overdraw  | 过度描绘，可以消除在使用CanvasRenderer渲染物体之间的缝隙 |
| visible  | 是否可见，是否能在场景中看到此物体 |
| side  | 侧面，设置在哪一面使用材质 |
| needsUpdate  | 是否需要刷新，可以刷新材质缓存 |

2. 融合属性

决定物体如何与背景融合

| 属性名称 | 描述 |
| --- | --- |
| blending | 融合，决定物体上的材质如何与背景融合 |
| blendsrc | 融合源，创建自定义的融合模式 |
| blenddst  | 融合目标 |
| blendingequation  | 融合公式 |

3. 高级属性

控制底层webgl上下文如何渲染物体

| 属性名称 | 描述 |
| --- | --- |
| depthTest | 深度测试 |
| depthWrite | 是否影响深度缓存 |
| alphaTest  | 指定一个值，如果某个像素的值小于它，则不会将该像素展示 |

### 二、基础材质 MeshBasicMaterial

不会对光照产生任何反应，光照不会对它产生影响，也可以决定是否以线框的方式渲染物体

属性介绍

| 属性名称 | 描述 |
| --- | --- |
| color | 材质颜色 |
| wireframe | 是否渲染成线框 |
| wireframeLinecap  | 线段间的端点如何显示 |
| wireframeLinejoin| 线段的连接点如何显示 |
| shading| 定义如何着色 |
| vertexColors | 为每个顶点定义不同的颜色 |
| fog | 是否会受全局雾化效果设置的影响 |

[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-04/01-basic-mesh-material.html) 
[官网演示地址](https://threejs.org/docs/index.html#api/zh/materials/MeshBasicMaterial)

### 三、深度材质 MeshDepthMaterial

不受光照影响，同时不能设置材质的颜色，影响它的只是摄像机到物体的距离，距离越远表现显示越暗

[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-04/02-depth-material.html) 
[官网参数演示地址](https://threejs.org/docs/index.html#api/zh/materials/MeshDepthMaterial)

### 四、法向材质 MeshNormalMaterial

颜色只和表面法向向量有关，不需要生成颜色

[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-04/04-mesh-normal-material.html) 
[官网参数演示地址](https://threejs.org/docs/index.html#api/zh/materials/MeshNormalMaterial)

### 五、lambert 网格材质 MeshLambertMaterial

它比其他材质多了几个参数：除color（材质颜色）之外，还有ambient（用于设置物体环境光颜色的属性），emissive（只控制物体表面的自发光颜色），

```js
const material = new THREE.MeshLambertMaterial({
  // 其他属性同上述
  ambient: 0x00ff00,
  color: 0xffffff,
  emissive: 0xff0000
})
```
[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-04/06-mesh-lambert-material.html)
[官网参数演示地址](https://threejs.org/docs/index.html#api/zh/materials/MeshLambertMaterial)

### 六、phong 材质 MeshPhongMaterial

和lambert类似，光照也会影响它产生颜色，但是它能创建表面发亮的物体，可以模拟金属材质

```js
const material = new THREE.MeshPhongMaterial({
  // 其他属性同上述
  ambient: 0x00ff00,
  color: 0xffffff,
  emissive: 0xff0000,
  specular: 0x999999, // 设置物体高光颜色为灰色
  shininess: 100  // 设置物体高光锐度为100 （用于控制物体高光的大小和锐度）它的值越大，物体表面的高光越小而且更集中（更锐利），值越小，物体表面的高光越大而且更散（更模糊）
})
```
[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-04/07-mesh-phong-material.html)
[官网参数演示地址](https://threejs.org/docs/index.html#api/zh/materials/MeshPhongMaterial)

### 七、着色器材质
[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-04/08-shader-material.html)
<!-- [官网演示地址](https://threejs.org/docs/index.html#api/zh/materials/MeshPhongMaterial) -->

### 八、直线和虚线
直线：[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-04/09-line-material.html)

虚线：[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-04/10-line-material-dashed.html)

### 九、联合材质

[官网介绍地址](https://threejs.org/docs/#examples/zh/utils/SceneUtils)

```js
const lambert = new THREE.MeshLambertMaterial({ color: 0xff0000, wireframe: false }); // wireframe 为true 线框模式
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true }); // 线框模式
const cube = createMultiMaterialObject(cubeGeometry, [lambert, cubeMaterial]);
  // 将立方体添加到场景中
scene.add(cube);
```
demo3 可以演示

## threejs 几何体

### 一、几何体简介

二维几何

| 名称 | 描述 |
| --- | --- |
|  PlaneGeometry | 二维平面 |
| PlaneBufferGeometry | 二维平面 （降低内存占用） |
| CircleGeometry  | 二维圆 |
| ShapeGeometry | 自定义二维图形 |

三维几何

| 名称 | 描述 |
| --- | --- |
|  CubeGeometry | 立方体 |
| SphereGeometry | 球体 |
| CylinderGeometry  | 圆柱体 |
| TorusGeometry | 圆环 |
| TorusKnotGeometry | 纽结 ｜
| PolyhedronGeometry | 多面体，可以自定义面体 ｜
| lcosahedronGeometry | 正20面体 ｜
| TetrahedronGeometry | 正四面体 ｜
| OctahedronGeometry | 正八面体 ｜
| TextGeometry | 文本 ｜

### 二、二维平面

PlaneGeometry/PlaneBufferGeometry

| 属性名称 | 描述 |
| --- | --- |
|  width | 指定平面的宽度 |
| height | 指定平面的高度 |
| widthSegments  | 宽度线段划分的段数量 |
| heightSegments | 高度线段划分的段数量 |

[官网参数演示地址](https://threejs.org/docs/#api/zh/geometries/PlaneGeometry) 可直接演示

[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-05/01-basic-2d-geometries-plane.html)

### 三、二维圆

CircleGeometry

| 属性名称 | 描述 |
| --- | --- |
|  radius | 半径 |
| segments | 指定创建圆需要的面的数量，最少3个 |
| thetaStart  | 起始角度，从哪里开始绘制圆，范围0 - Math.PI * 2 |
| thetaLength | 角度，定义圆要画多大 |

```js
const geometry = new THREE.CircleGeometry(4, 10, 0, Math.PI * 2) // 参数分别对应以下表格
```
| 参数 | 参数说明 |
| --- | --- |
| radius | 圆的半径 |
| segments | 圆的分段数，这决定了圆的精度和平滑度 |
| thetaStart | 圆弧的起始角度，以弧度为单位 |
| thetaLength | 圆弧的结束角度，以弧度为单位 |

[官网参数演示地址](https://threejs.org/docs/#api/zh/geometries/CircleGeometry) 可直接演示

[示列代码地址](https://github.com/josdirksen/learning-threejs/blob/master/chapter-05/02-basic-2d-geometries-circle.html)

### 四、自定义二维图形

自定义二维图需要用到`Shape对象`和`ShapeGeometry对象`

```js
const shape = new THREE.Shape()
  shape.moveTo(0, 0);
  shape.lineTo(0, 10);
  shape.lineTo(10, 10);
  shape.lineTo(10, 0);
  shape.lineTo(0, 0);
const cubeGeometry = new THREE.ShapeGeometry(shape)
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  scene.add(cube);
```
shape 的方法

| 方法 | 描述 |
| --- | --- |
| moveTo(x,y) | 将绘制点移动到某处 |
| lineTo(x,y) | 从起始位置开始，绘制到xy处停止 |
| quadricCurveTo | 二次曲线 |
| bezierCurveTo | 贝塞尔曲线 |
| arc | 绘制圆 |

### 五、立方体
其他几何体官网上都有，不再赘述。

## threejs 动画/变换相机的角度

### 一、基础动画

通过 `requestAnimationFrame(animate)`

代码示列
```js
// 创建一个场景
const scene = new THREE.Scene();

// 创建一个相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
// 创建一个几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建一个材质
const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
// 创建一个网格
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
// 创建一个动画对象
const animateCube = new THREE.Object3D();
// 将网格添加到动画对象中
animateCube.add(cube);
// 创建一个动画函数
const animate = function () {
  requestAnimationFrame(animate);
  // 旋转动画
  animateCube.rotation.x += 0.01;
  animateCube.rotation.y += 0.01;
  // 移动动画
  animateCube.position.x = Math.sin(Date.now() * 0.001) * 2;
  animateCube.position.y = Math.cos(Date.now() * 0.001) * 2;
  // 缩放动画
  animateCube.scale.x = Math.sin(Date.now() * 0.001) + 1;
  animateCube.scale.y = Math.sin(Date.now() * 0.001) + 1;
  // 更新动画对象的矩阵
  animateCube.updateMatrix();
  // 渲染场景
  renderer.render(scene, camera);
};
// 添加动画对象到场景中
scene.add(animateCube);
// 开始动画
animate();
```

### 二、通过Tween.js 动画库

引入Tween动画库

示列伪代码

```js
const group = new THREE.Points(ply, material);
    group.scale.set(1, 1, 1);
    // group.scale.set(posSrc.pos, posSrc.pos, posSrc.pos);
    group.position.x = cubePos.x;
    scene.add(group);

    const upDataFn = () => {
      group.position.x = cubePos.x;
    };

    const tween = new TWEEN.Tween(cubePos).to({ x: 50 }, 2000);
    tween.easing(TWEEN.Easing.Elastic.InOut);
    tween.onUpdate(upDataFn);
```

### 三、加载外部文件

看 demo4 即可 gltf 格式

### 四、使用相机控件

| 控制器名称 | 描述 |
| --- | --- |
| `OrbitControls` | 旋转、缩放和平移场景的控制器。用户可以通过鼠标进行交互操作，可以自由旋转、缩放和平移场景。 |
| `FlyControls` | 模拟飞行器的控制器。用户可以通过键盘进行交互操作，可以控制飞行器的方向、速度和高度等属性。 |
| `PointerLockControls` | 锁定鼠标指针的控制器。用户可以通过鼠标进行交互操作，可以控制相机的方向和旋转。 |
| `DeviceOrientationControls` | 基于设备方向的控制器。用户可以通过移动设备进行交互操作，可以控制相机的方向和旋转。 |
| `FirstPersonControls` | 第一人称视角控制器。用户可以通过鼠标和键盘进行交互操作，可以控制相机的位置、方向和旋转。 |
| `TrackballControls` | 轨迹球控制器。用户可以通过鼠标进行交互操作，可以控制相机的位置、方向和旋转，具有较高的自由度。 |

#### OrbitControls 缩放
`OrbitControls` 控制器的构造函数接受三个参数：

| 参数名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `object` | `Object3D` | `null` | 要控制的相机对象。 |
| `domElement` | `HTMLElement` | `document` | 接受鼠标和触摸事件的 DOM 元素。 |
| `options` | `Object` | `{}` | 控制器选项，包括以下属性：`enableZoom`、`enableRotate`、`enablePan`、`autoRotate`、`autoRotateSpeed`、`minDistance`、`maxDistance`、`minPolarAngle`、`maxPolarAngle` 等。 |

其中，`options` 参数的详细说明如下：

| 属性名 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| `enableZoom` | `Boolean` | `true` | 是否启用缩放。 |
| `enableRotate` | `Boolean` | `true` | 是否启用旋转。 |
| `enablePan` | `Boolean` | `true` | 是否启用平移。 |
| `autoRotate` | `Boolean` | `false` | 是否自动旋转。 |
| `autoRotateSpeed` | `Number` | `2.0` | 自动旋转的速度。 |
| `minDistance` | `Number` | `0` | 相机到目标点的最小距离。 |
| `maxDistance` | `Number` | `Infinity` | 相机到目标点的最大距离。 |
| `minPolarAngle` | `Number` | `0` | 极角的最小值（0为顶部，Math.PI为底部）。 |
| `maxPolarAngle` | `Number` | `Math.PI` | 极角的最大值（0为顶部，Math.PI为底部）。 |

关键代码
```js
// 引入 OrbitControls
// 创建一个 OrbitControls 实例并将其绑定到要控制的相机上
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const orbitControls = new THREE.OrbitControls(camera, renderer.domElement);
// 在渲染循环中更新控制器：
function animate() {
  requestAnimationFrame(animate);
  orbitControls.update();
  renderer.render(scene, camera);
}
```
可看demo5

其他的api 是相同的道理，不再赘述

## Threejs 纹理

### 一、基础纹理

代码示列
```js
// 创建一个纹理加载器 ===> 基础纹理
const textureLoader = new THREE.TextureLoader();
// 加载纹理
textureLoader.load("../../../public/textures/stone.jpg", (texture) => {
  // 创建一个材质
  const material = new THREE.MeshLambertMaterial({
    map: texture
  });
  const cube = new THREE.Mesh(cubeGeometry, material);
  scene.add(cube);
})
```

### 二、凹凸纹理

代码示列
```js
 // 凹凸纹理
  textureLoader.load("../../../public/textures/stone.jpg", (texture) => {
    textureLoader.load("../../../public/textures/stone-bump.jpg", (bump) => {
      // 创建一个材质
      const material = new THREE.MeshPhongMaterial({ // 对光源有反应的，明亮材质
        map: texture,
        bumpMap: bump,
        bumpScale: 100
      });
      const cube = new THREE.Mesh(cubeGeometry, material);
      cube.position.set(5, 0, 0);
      scene.add(cube);
      })
  })
```
demo6 可看

其他纹理同理不再赘述

## Threejs 粒子/粒子系统

可以模拟雪，沙尘等

创建一个基础粒子代码示列
```js
// createNormalSprite();
  // 创建一个基础的粒子
  function createNormalSprite() {
    for (let i = -5; i < 5; i++) {
      for (let j = -5; j < 5; j++) {
        const spriteMaterial = new THREE.SpriteMaterial({
          color: Math.random() * 0xffffff,
        });
        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(i * 2, j * 2, 0);
        scene.add(sprite);
      }
    }
  }
```
创建一个粒子系统代码示列
```js
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
```
demo7 可看效果

[参考项目: learning-threejs](https://github.com/josdirksen/learning-threejs)
[参考项目: my-three](https://github.com/cshenger/my-three)
