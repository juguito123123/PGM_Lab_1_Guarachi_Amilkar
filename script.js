const escena = new THREE.Scene();
const renderizador = new THREE.WebGLRenderer();
renderizador.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderizador.domElement);
//se crea la camara
const ancho = window.innerWidth;
const alto = window.innerHeight;
// Ajusta la cámara 
const aspect = ancho / alto;
const viewSize = 20;
const camara = new THREE.OrthographicCamera(
    -viewSize * aspect / 2, viewSize * aspect / 2,
    viewSize / 2, -viewSize / 2,
    0.1, 1000
);
camara.position.z = 10;
// creando las figuras geometricas 
// Ambos con tamaño 5, alineados en y=0
const lado = 5;
const radio = 5;

// Cuadro a la izquierda
const geometryBox = new THREE.BoxGeometry(lado, lado, lado);
const materialBox = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cuadro = new THREE.Mesh(geometryBox, materialBox);
cuadro.position.x = -7;
cuadro.position.y = 0;
escena.add(cuadro);

// Esfera a la derecha
const geometrySphere = new THREE.SphereGeometry(radio, 32, 32);
const materialSphere = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const esfera = new THREE.Mesh(geometrySphere, materialSphere);
esfera.position.x = 7;
esfera.position.y = 0;
escena.add(esfera);

function animacion() {
    requestAnimationFrame(animacion);
    // se actualiza la rotación del objeto
    cuadro.rotation.y += 0.1;
    esfera.rotation.z += 0.1;    
    // se renderiza la escena
    renderizador.render(escena, camara);
}

animacion();

//

window.addEventListener('resize', () => {
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    const aspect = ancho / alto;
    camara.left = -viewSize * aspect / 2;
    camara.right = viewSize * aspect / 2;
    camara.top = viewSize / 2;
    camara.bottom = -viewSize / 2;
    camara.updateProjectionMatrix();
    renderizador.setSize(ancho, alto);
});