const socket = io();

const productsList = document.getElementById("products-list");
const productsForm = document.getElementById("products-form");
const inputProductId = document.getElementById("input-product-id");
const btnDeleteProduct = document.getElementById("btn-delete-product");
const errorMessage = document.getElementById("error-message");

socket.on("products-list", (data) => {
    const products = data.products ?? [];
    productsList.innerText = "";

    products.forEach((product) => {
        productsList.innerHTML += `
            <li>
                <strong>ID:</strong> ${product.id} <br>
                <strong>Nombre:</strong> ${product.title} <br>
                <strong>Descripción:</strong> ${product.description} <br>
                <strong>Código:</strong> ${product.code} <br>
                <strong>Precio:</strong> $${product.price} <br>
                <strong>Stock:</strong> ${product.stock} <br>
                <strong>Categoría:</strong> ${product.category} <br>
                <strong>Activo:</strong> ${product.status ? "Sí" : "No"}
            </li><br>`;
    });
});

productsForm.onsubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    errorMessage.innerText = "";

    form.reset();

    socket.emit("insert-product", {
        title: formData.get("title"),
        description: formData.get("description"),
        code: formData.get("code"),
        price: formData.get("price"),
        stock: formData.get("stock"),
        category: formData.get("category"),
        status: formData.get("status") || "off", // Enviar "off" si el checkbox no está seleccionado
    });
};

btnDeleteProduct.onclick = () => {
    const id = Number(inputProductId.value);
    inputProductId.value = "";
    errorMessage.innerText = "";

    if (id > 0) {
        socket.emit("delete-product", { id });
    }
};

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message;
});