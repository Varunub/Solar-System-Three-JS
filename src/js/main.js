/* eslint-disable no-unused-vars */
import * as THREE from 'three'
import sunTexture from '../img/sun.jpg'
import star from '../img/stars.jpg'
import earthTexture from '../img/earth.jpg'
import jupyterTexture from '../img/jupiter.jpg'
import mercuryTexture from '../img/mercury.jpg'
import marsTexture from '../img/mars.jpg'
import uranusTexture from '../img/uranus.jpg'
import uringTexture from '../img/uranus ring.png'
import venusTexture from '../img/venus.jpg'
import saturnTexture from '../img/saturn.jpg'
import sringTexture from '../img/saturn ring.png'
import neptuneTexture from '../img/neptune.jpg'
import plutoTexture from '../img/pluto.jpg'

// import {TextGeometry} from 'three/addons/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
const orbit=new OrbitControls(camera,renderer.domElement)
camera.position.set(-160,200,200)
orbit.update()
const ambientLight=new THREE.AmbientLight(0x33333333);
scene.add(ambientLight)

// const tgeo=new THREE.TextGeometry()

const textureLoader = new THREE.TextureLoader()
const sungeo=new THREE.SphereGeometry(16,30,30)
const sunmat=new THREE.MeshBasicMaterial({map:textureLoader.load(sunTexture)})
const sun=new THREE.Mesh(sungeo, sunmat)
// sun.material.wireframe = true;
scene.add(sun)

const cubetexture=new THREE.CubeTextureLoader()
scene.background=cubetexture.load([
    star,
    star,
    star,
    star,
    star,
    star,
])

function createGeometry(img,size,position,ring) {
    const geo=new THREE.SphereGeometry(size,30,30)
    const mat=new THREE.MeshBasicMaterial({map:textureLoader.load(img)})
    const mesh=new THREE.Mesh(geo, mat)
    const obj=new THREE.Object3D();
    obj.add(mesh)
    if(ring){
        const ringgeo=new THREE.RingGeometry(ring.inneradius,ring.outteradius,32)
        const ringmat=new THREE.MeshBasicMaterial({map:textureLoader.load(ring.img),side:THREE.DoubleSide})
        const ringde=new THREE.Mesh(ringgeo,ringmat)
        ringde.position.x=position
        ringde.rotation.x=-0.5*Math.PI
        obj.add(ringde)
    }
    mesh.position.x=position
    const curve=new THREE.EllipseCurve(
        0,0,
        position,position,
        0,2*Math.PI,
        false,
        0
    )
    const points=curve.getPoints(50)
    const geometry=new THREE.BufferGeometry().setFromPoints(points)
    const material=new THREE.LineBasicMaterial({color:0xFFFFFF})
    const ellipse=new THREE.Line(geometry,material)
    ellipse.rotateX(1.58)
    scene.add(ellipse)
    scene.add(obj)
    return {mesh,obj}
}

const mercury = createGeometry(mercuryTexture,3.2,28)
const venus=createGeometry(venusTexture,5.8,44)
const earth=createGeometry(earthTexture,6,63)
const mars=createGeometry(marsTexture,4,78)
const jupyter=createGeometry(jupyterTexture,12,100)
const saturn = createGeometry(saturnTexture,10,138,{
    innerradius:10,
    outteradius:20,
    img:sringTexture
})
const uranus =createGeometry(uranusTexture,7,176,{
    innerradius:7,
    outteradius:12,
    img:uringTexture
})
const neptune =createGeometry(neptuneTexture,7,200)
const pluto = createGeometry(plutoTexture,2.8,216)



const pointLight = new THREE.PointLight(0xFFFFFF,2,300)
scene.add(pointLight)

function animate(){
    requestAnimationFrame(animate);
    mercury.mesh.rotateY(0.004)
    venus.mesh.rotateY(0.002)
    earth.mesh.rotateY(0.02)
    mars.mesh.rotateY(0.018)
    jupyter.mesh.rotateY(0.04)
    saturn.mesh.rotateY(0.038)
    uranus.mesh.rotateY(0.03)
    neptune.mesh.rotateY(0.032)
    pluto.mesh.rotateY(0.008)

    mercury.obj.rotateY(0.04)
    venus.obj.rotateY(0.015)
    earth.obj.rotateY(0.01)
    mars.obj.rotateY(0.008)
    jupyter.obj.rotateY(0.002)
    saturn.obj.rotateY(0.0009)
    uranus.obj.rotateY(0.0004)
    neptune.obj.rotateY(0.0001)
    pluto.obj.rotateY(0.00007)




    sun.rotation.y+=0.01
    renderer.render(scene, camera)
}





window.addEventListener("resize",function(){
    camera.aspect=window.innerWidth/window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth,window.innerHeight)
})

animate()