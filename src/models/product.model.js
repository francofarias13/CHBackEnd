import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new Schema({
    title: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 25, "El nombre debe tener como máximo 30 caracteres" ],
        index: { name: "idx_title" },
    },
    price: {
        type: Number,
        required: [ true, "El precio del producto es obligatorio" ],
        min: [ 0, "El precio debe ser un valor positivo" ],
    },
    //currency: {
     //   type: String,
      //  required: [ true, "Es obligatorio poner la ocurrencia del producto" ],
      //  uppercase: true,
     //   trim: true,
     //   minLength: [ 2, "La ocurrencia debe tener al menos dos caracteres" ],
      //  maxLength: [ 6, "La ocurrencia debe tener maximo seis caracteres" ],
    //},
    description: {
        type: String,
        required: [ true, "La descripcion del producto es obligatoria" ],
        trim: true,
        minLength: [ 12, "La descripcion del producto debe tener al menos 3 caracteres" ],
        maxLength: [ 60, "El nombre debe tener como máximo 25 caracteres" ],
    },
    stock: {
        type: Number,
        required: [ true, "El stock del producto es obligatorio" ],
        min: [ 0, "El stock debe ser un valor positivo" ],
    },
    code: {
        type: String,
        required: [ true, "El codigo del producto es obligatorio" ],
        trim: true,
        minLength: [ 2, "El codigo debe tener al menos dos caracteres" ],
        maxLength: [ 10, "El codigo debe tener maximo seis caracteres" ],
    },
    status: {
        type: Boolean,
        required: [ true, "El estado es obligatorio" ],
    },
    category: {
        type: String,
        required: [ true, "La categoria del producto es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "La categoria debe tener al menos 3 caracteres" ],
        maxLength: [ 15, "La categoria debe tener como máximo 25 caracteres" ],
        index: { name: "idx_category" },
    },
}, {
    timestamps: true,
    versionKey: false,
});

productSchema.index({ title:1, code:1 }, { name:"idx_title_code" });

productSchema.plugin(paginate);

const ProductModel = model("products", productSchema);

export default ProductModel;