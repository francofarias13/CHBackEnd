document.addEventListener("DOMContentLoaded", () => {
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
  
    addToCartButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            event.preventDefault();
  
            const productId = button.getAttribute("data-product-id"); 
            const cid = "6761a32acc3a0b76156c6aab"; 
  
            try {
                const response = await fetch(`/api/cart/${cid}/products/${productId}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const result = await response.json();
                    alert("Producto añadido al carrito con éxito");
                } else {
                    const errorData = await response.json();
                    alert(`Error: ${errorData.message}`);
                }
            } catch (error) {
                console.error("Error al agregar producto al carrito:", error);
            }
        });
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const btnDeleteAll = document.getElementById("btn-deleteAll");
    const cartId = "6761a32acc3a0b76156c6aab";

    btnDeleteAll.addEventListener("click", async () => {
        try {
            const response = await fetch(`/api/cart/${cartId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message);
                location.reload();
            } else {
                const errorText = await response.text();
                console.error("Error del servidor:", errorText);
                alert("Error al vaciar el carrito. Revisa la consola para más detalles.");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
            alert("Hubo un problema al conectarse al servidor.");
        }
    });
  });

  document.addEventListener("DOMContentLoaded", () => {
    const removeButtons = document.querySelectorAll(".remove-from-cart");
    const cartId = "6761a32acc3a0b76156c6aab";

    removeButtons.forEach((button) => {
        button.addEventListener("click", async (event) => {
            const productId = button.getAttribute("data-product-id");

            if (!productId) {
                console.error("El ID del producto no está definido.");
                return;
            }

            try {
                const response = await fetch(`/api/cart/${cartId}/product/${productId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al eliminar el producto: ${response.statusText}`);
                }

                const result = await response.json();
                if (result.status === "success") {
                    const productElement = button.closest("li");
                    productElement.remove();
                    alert("Producto eliminado del carrito.");
                } else {
                    alert("No se pudo eliminar el producto. Revisa los logs.");
                }
            } catch (error) {
                console.error("Error al eliminar el producto:", error);
            }
        });
    });
});