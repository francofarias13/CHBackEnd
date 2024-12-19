const btnActualizar = document.getElementById("bnt-actualizar-productos");

btnActualizar.addEventListener("click", ()=>{
    location.reload();
});

document.addEventListener("DOMContentLoaded", () => {
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const categorySelect = document.getElementById("category");

    const updateProducts = (page, category = '') => {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set("page", page);
        if (category) urlParams.set("category", category);
        window.location.search = urlParams.toString();
    };

    prevPageBtn.addEventListener("click", () => {
        const currentPage = parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
        if (currentPage > 1) {
            updateProducts(currentPage - 1, categorySelect.value);
        }
    });

    nextPageBtn.addEventListener("click", () => {
        const currentPage = parseInt(new URLSearchParams(window.location.search).get("page")) || 1;
        updateProducts(currentPage + 1, categorySelect.value);
    });

    categorySelect.addEventListener("change", () => {
        const selectedCategory = categorySelect.value;
        updateProducts(1, selectedCategory);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const categorySelect = document.getElementById("category");
    const sortSelect = document.getElementById("sort");

    const updateProducts = () => {
        const category = categorySelect.value;
        const sort = sortSelect.value;

        let query = `?`;
        if (category) query += `category=${category}&`;
        if (sort) query += `sort=${sort}`;

        window.location.href = `/products${query}`;
    };

    categorySelect.addEventListener("change", updateProducts);
    sortSelect.addEventListener("change", updateProducts);
});