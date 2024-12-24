import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//add a product to database
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageLinks = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      bestSeller: bestSeller === "true" ? true : false,
      subCategory,
      sizes: JSON.parse(sizes),
      Image: imageLinks,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    console.log(
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestSeller
    );
    console.log(imageLinks);

    return res.json({ success: true, message: "product added success" });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

//list all products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    console.log(products);
    return res.json({ success: true, products });
  } catch (error) {
    return res.json({ success: false, error });
  }
};
//remove a product from database
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    return res.json({ success: true, message: "product removed success" });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

//get info of single products
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    return res.json({ success: true, product });
  } catch (error) {
    return res.json({ success: false, error });
  }
};

export { addProduct, removeProduct, listProduct, singleProduct };
