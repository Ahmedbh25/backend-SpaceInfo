import express from "express";
import { addContact, deleteContact, getContacts } from "../controllers/contactController.js";

const router = express.Router();

// ADD CONTACT
router.post("/:userID", addContact);

// GET ALL CONTACTS
router.get("/:userID", getContacts);

// DELETE CONTACT
router.delete("/:userID", deleteContact);

export default router