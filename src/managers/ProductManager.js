import { isValidID } from "../config/mongoose.config.js";
import ErrorManager from "./ErrorManager.js";
import ProductModel from "../models/product.model.js";
import { convertToBoolean } from "../utils/converter.js";

export default class ProductManager {
    #product;

    constructor() {
        this.#product = ProductModel;
    }

    async #findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager("ID inválido", 400);
        }

        const productFound = await this.#product.findById(id);

        if (!productFound) {
            throw new ErrorManager("ID no encontrado", 404);
        }

        return productFound;
    }

    async getAll(params) {
        try {
            const $and = [];

            if (params?.title) {
                $and.push({ title: { $regex: params.title, $options: "i" } });
            }

            const filters = $and.length > 0 ? { $and } : {};

            const sortOptions = {
                asc: { title: 1 },
                desc: { title: -1 },
            };

            const paginationOptions = {
                limit: parseInt(params?.limit) || 10,
                page: parseInt(params?.page) || 1,
                sort: sortOptions[params?.sort] || {},
                lean: true,
            };

            return await this.#product.paginate(filters, paginationOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async getOneById(id) {
        try {
            return await this.#findOneById(id);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async insertOne(data) {
        try {
            const product = await this.#product.create({
                ...data,
                status: convertToBoolean(data.status),
            });

            return product;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async updateOneById(id, data) {
        try {
            const product = await this.#findOneById(id);
            const newValues = {
                ...product,
                ...data,
                status: data.status ? convertToBoolean(data.status) : product.status,
            };

            product.set(newValues);
            product.save();

            return product;
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }

    async deleteOneById(id) {
        try {
            const product = await this.#findOneById(id);
            await product.deleteOne();
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }
}