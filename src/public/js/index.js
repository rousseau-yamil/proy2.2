const socket = io();

function $(selector) {
    return document.querySelector(selector);
}

socket.on('statusError', data => {
    console.log(data);
    alert(data);
});

socket.on('publishProducts', data => {
    $('.products-box').innerHTML = '';

    let html = '';
    data.forEach(product => {
        html += `<div class="product-card">
                    <h3>${product.title}</h3>
                    <hr>
                    <p>Categoria: ${product.category}</p>
                    <p>Descripción: ${product.description}</p>
                    <p>Precio: $ ${product.price}</p>
                    <button id="button-delete" onclick="deleteProduct('${product._id}')">Eliminar</button>
                </div>`;
    });

    $('.products-box').innerHTML = html;
});

function createProduct(event) {
    event.preventDefault();
    const newProduct = {
        title: $('#title').value,
        description: $('#description').value,
        code: $('#code').value,
        price: $('#price').value,
        stock: $('#stock').value,
        category: $('#category').value
    }

    cleanForm();

    socket.emit('createProduct', newProduct);
}

function deleteProduct(pid) {
    socket.emit('deleteProduct', { pid });
}

function cleanForm() {
    $('#title').value = '';
    $('#description').value = '';
    $('#code').value = '';
    $('#price').value = '';
    $('#stock').value = '';
    $('#category').value = '';
}
//agregado
socket.on("publishProducts", (products) => {
    const container = document.querySelector(".products-box");
    container.innerHTML = ''; // Limpiar productos anteriores

    products.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("product-card");
        div.innerHTML = `
            <h3>${p.title}</h3>
            <hr>
            <p>Categoria: ${p.category}</p>
            <p>Descripción: ${p.description}</p>
            <p>Precio: $ ${p.price}</p>
            <button onclick="deleteProduct('${p._id}')">Eliminar</button>
        `;
        container.appendChild(div);
    });
});