document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
});

let carrito = [];
let total = 0;

async function cargarProductos() {
    try {
        const response = await fetch('/api/productos');
        const productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error('Error al cargar productos:', error);
    }
}

function mostrarProductos(productos) {
    const lista = document.getElementById('lista-productos');
    lista.innerHTML = '';
    productos.forEach(producto => {
        const div = document.createElement('div');
        div.className = 'producto';
        div.innerHTML = `
            <div>
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p>Precio: $${producto.precio.toFixed(2)}</p>
            </div>
            <button onclick="agregarAlCarrito(${producto.id}, '${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
        `;
        lista.appendChild(div);
    });
}

function agregarAlCarrito(id, nombre, precio) {
    carrito.push({ id, nombre, precio });
    total += precio;
    actualizarCarrito();
}

function actualizarCarrito() {
    const lista = document.getElementById('lista-carrito');
    lista.innerHTML = '';
    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        lista.appendChild(li);
    });
    document.getElementById('total').textContent = total.toFixed(2);
}

document.getElementById('checkout').addEventListener('click', () => {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    alert(`Compra finalizada. Total: $${total.toFixed(2)}`);
    carrito = [];
    total = 0;
    actualizarCarrito();
});