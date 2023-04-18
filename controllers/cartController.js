import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import User from "../models/User.js";

//  CREATE CART FOR USER :
export const createCart = async (req, res, next) => {
    try {
        try {
            if (!mongoose.Types.ObjectId.isValid(req.body.user_id)) {
                return res.status(404).json({ message: 'Invalid user ID' });
            }
            const user = await User.findById(req.body.user_id);
            if (!user) {
                return res.status(404).json("This ID not belong to any user ");
            }
        } catch (error) {
            next(error);
        }
        try {
            const FetchCart = await Cart.findOne({ user_id: req.body.user_id })
            if (FetchCart) {
                return res.status(400).json("This user already has a card");
            }
        } catch (error) {
            next(error)
        }
        const cart = new Cart(req.body);
        const savedCart = await cart.save();
        res.status(200).json({ msg: "Cart Is Saved Successfully", savedCart });
    } catch (error) {
        next(error)
    }
}

// SHOW USER CARD :
export const userCard = async (req, res, next) => {
    const userID = req.body.userID;
    try {
        const cart = await Cart.findOne({ user_id: userID });
        if (!cart) {
            res.status(404).json(`Cart Not Found for user !`);
        }
        res.status(200).json(cart);
    } catch (error) {
        next(error);
    }
}

// SHOW ALL CARDS :
export const showALLCard = async () => {
    try {
        const carts = await Cart.find();
        if (!carts) {
            res.status(404).json(`No Cart is Available for Know !`);
        }
        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
}

// DELETE CART : 
export const DeleteCard = async () => {
    const CartID = req.body.CartID;
    try {
        const cartdel = await Cart.findByIdAndDelete(CartID);
        res.status(200).json({ msg: "card was deleted Successfully", cartdel });
    } catch (error) {
        next(error);
    }
}