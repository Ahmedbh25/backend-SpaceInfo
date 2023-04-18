import express from "express";
const router = express.Router();
import {
    getUser,
    updateUser,
  } from "../controllers/userController.js";


import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";


// GET
router.get("/:id", verifyUser, getUser);

// UPDATE
router.put("/:id", verifyUser, updateUser);

/*
// GET ALL
router.get("/", verifyAdmin, getUsers);



//DELETE
router.delete("/:id", verifyUser, deleteUser);

*/

export default router;
