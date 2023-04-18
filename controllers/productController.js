import Product from "../models/Product.js";
import { errorCreator } from "../utils/error.js";
import Cart from "../models/Cart.js";

// get Single Product By ID :
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.prodID);
    if (product.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    errorCreator(404, error);
  }
};

// get Single Product By REFERENCE :
export const getProductByRef = async (req, res, next) => {
  const referenceProd = req.body.refer;
  try {
    const product = await Product.findOne({reference : referenceProd});
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const {_id, name } = product
    res.status(200).json({_id, name });
  } catch (error) {
    errorCreator(404, error);
  }
};

// get Single Product By NAME :
export const getProductByName = async (req, res, next) => {
  const nameProd = req.body.Productname.replace(/\s+/g, '');
  if(nameProd.length <1){
    return res.status(404).json({});
  }
  try {
    const product = await Product.find({ name: { $regex: nameProd, $options: 'i' }});
    if (product.length < 1) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    errorCreator(404, error);
  }
};

// get List of all Products :

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

// CREATE PRODUCT :
export const createProduct = async (req, res, next) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    next(err);
  }
};

export const BuyProduct = async(req, res, next) => {
  const ProductID = req.body.ProductID;
  const UserID = req.body.userID;

  try {
    const product = await Product.findById(ProductID);
    try{
      await Cart.findOne();
      const cart = await Cart.updateOne({user_id : UserID}, { $push: { money_budget: money_budget - product.price } } , { new: true });
      res.status(200).json("card Updated Successfully ", cart )
    }catch(error){
      next(error)
    }
  }catch(error){
    next(error)
  }
}