const socket = io();

const productList = document.querySelector(".container-products");
const productsForm = document.getElementById("insert-product");
const errorMessage = document.getElementById("error-message");
const btnDeleteProduct = document.getElementById("btn-delete-product");
const inputProductId = document.getElementById("input-product-id");
let prevPageBtn = document.getElementById("prev-page");
let nextPageBtn = document.getElementById("next-page");
let currentPageText = document.getElementById("current-page");

socket.on("products-list", (data) => {
    console.log("Datos recibidos:", data);
    const products = data.products?.docs ?? [];
    
    if (!Array.isArray(products)) {
        console.error("Los datos no son un arreglo:", products);
        return;
    }

    productList.innerHTML = ''; 

    products.forEach((product) => {
        productList.innerHTML += `
            <div class="product-card">
                <ul>
                    <li>Nombre: ${product.title}</li>
                    <li>Precio: ${product.price}</li>
                    <li>Categoría: ${product.category}</li>
                    <li>Descripción: ${product.description}</li>
                    <li>Stock: ${product.stock}</li>
                    <li>Código: ${product.code}</li>
                    <li>Estado: ${product.status}</li>
                    <button class="view-product-btn" data-id="${product._id}">Ver Detalles</button>
                </ul>
            </div>
        `;
    });
});

prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        loadProducts(currentPage); 
    }
});

nextPageBtn.addEventListener("click", () => {
    currentPage++;
    loadProducts(currentPage);  
});

loadProducts(currentPage);



productsForm.onsubmit = (e) => {
    e.preventDefault(); 
    const form = e.target;
    const formData = new FormData(form);

    const status = formData.get("status") === "on";

    errorMessage.innerText = "";
    form.reset();

    socket.emit("insert-product", {
        title: formData.get("title"),    
        price: formData.get("price"),        
        description: formData.get("description"),
        stock: formData.get("stock"),
        code: formData.get("code"),
        status: status,
        category: formData.get("category")
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
    console.log(data.message);
});

function showProductModal(product) {
    const modalContent = `
        <div class="modal">
            <h2>${product.title}</h2>
            <p>Precio: ${product.price}</p>
            <p>Categoria: ${product.category}</p>
            <p>Descripcion: ${product.description}</p>
            <p>Stock: ${product.stock}</p>
            <p>Codigo: ${product.code}</p>
            <p>Estado: ${product.status}</p>
            <button id="close-modal">Cerrar</button>
        </div>
    `;
    document.body.innerHTML += modalContent;
    document.getElementById("close-modal").onclick = () => {
        document.querySelector(".modal").remove();
    };
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-product-btn")) {
        const productId = e.target.getAttribute("data-id");
        const product = products.find(p => p._id === productId);
        if (product) {
            showProductModal(product); 
        }
    }
});