import { Router } from "express";
import  ProductManager  from "../manager/ProductsManager.js";
import uploader from "../utils/uploader.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async (req, res) => {
    try {
        const { limit, page, title, sort } = req.query;
        const products = await productManager.getAll({ limit, page, title, sort });
        res.status(200).json({
            status: "success",
            products,
        });
    } catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

router.get ("/:pid",async (req, res)=>{
    let product = await productManager.getOneById(req.params?.pid);
    try {
        res.status(200).json({status: "success", product})
    } catch (error) {
        res.status(error.code || 500).json({status: "error", message: "error al consultar los productos"});
    }
});

router.post("/", uploader.single("file"), (req, res)=>{
    const product = productManager.insertOne(req.body);
   
    res.status(201).json({status: "success", product});
    
});

router.post("/", async (req, res)=>{
    const product = await productManager.insertOne(req.body);
    try {
        res.status(201).json({status: "success", product})
    } catch (error) {
        res.status(error.code || 500).json({status: "error", message: "error al consultar los productos"});
    }
});

router.put("/:pid", async (req, res)=>{
    const product = await productManager.updateOneById(req.params?.pid, req.body);
    try {
        res.status(200).json({status: "success", product})
    } catch (error) {
        res.status(error.code || 500).json({status: "error", message: "error al consultar los productos"});
    }
});

router.delete("/:pid", async (req, res)=>{
    const product = await productManager.deleteOneById(req.params?.pid);
    try {
        res.status(200).json({status: "success", product})
    } catch (error) {
        res.status(error.code || 500).json({status: "error", message: "error al consultar los productos"});
    }
});

export default router;