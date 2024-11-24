const productsList = document.getElementById("products-list");
const btnRefreshProductsList = document.getElementById("btn-refresh-products-list");

const loadProductsList = async () => {
    const response = await fetch("/api/products", { method: "GET" });
    const data = await response.json();
    const products = data.payload;

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
};

btnRefreshProductsList.addEventListener("click", () => {
    loadProductsList();
    console.log("¡Lista recargada!");
});

// Se ejecuta para cargar la lista de productos al ingresar o refrescar
loadProductsList();