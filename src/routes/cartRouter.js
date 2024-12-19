import { Router } from "express";
import CartManager from "../manager/CartManager.js";

const router = Router();
const cartManager = new CartManager();

router.get("/", async (req, res) => {
    const cart = await cartManager.getAll();
    try {
        res.status(201).json({ status: "success", cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: "error al consultar los productos" });
    }
});

router.post("/", async (req, res) => {
    const cart = await cartManager.insertOne();
    try {
        res.status(201).json({ status: "success", cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: "error al consultar los productos" });
    }
});

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        let cart = await cartManager.getOneById(cartId);
        if (!cart) {
            cart = await cartManager.insertOne({ products: [] });
        }
        res.status(200).json({ status: "success",cart,});
    } catch (error) {
        res.status(500).json({status: "error", message: error.message,});
    }
});


router.post("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.addOneProduct(cid, pid);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.put("/:cid/products/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.updateCartById(cid, pid);
        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});




router.delete("/:cid/product/:pid", async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartManager.removeOneProduct(cid, pid);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Producto no encontrado en el carrito." });
        }

        res.status(200).json({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});



router.put("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    const products = req.body.products;

    try {
        const updatedCart = await cartManager.updateCartById(cartId, products);
        res.status(200).json({ status: "success", cart: updatedCart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.post("/:cid", async (req, res) => {
    const cartId = req.params.cid;

    try {
        let cart = await cartManager.getOneById(cartId);
        if (!cart) {
            cart = await cartManager.insertOne({ products: [] });
        }

        res.status(200).json({ status: "success", cart });
    } catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});


router.delete("/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.clearCart(cid);

        if (!cart) {
            return res.status(404).json({ status: "error", message: "Carrito no encontrado." });
        }

        res.status(200).json({ status: "success", message: "El carrito se vacio con éxito.", payload: cart });
    } catch (error) {
        res.status(500).json({ status: "error", message: error.message });
    }
});



export default router;
