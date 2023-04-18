import Contact from "../models/Contact.js";
import User from "../models/User.js";

// ADD CONTACT :
const addContact = async(req, res, next)=>{
    const newContact = new Contact(req.body);
    const user_id = req.params.userID;
    try{
        const savedContact = await newContact.save();
        try{
            await User.findByIdAndUpdate(user_id, {$push : {contacts : savedContact._id}});
        }catch(error){
            next(error);
        }
        res.status(200).json(savedContact);
    }catch(error){
        next(error);
    }

}

//GET ALL CONTACTS OF SPECIFIC USER:
const getContacts = async(req, res, next)=>{
    const userID = req.params.userID;
    try{
        const user = await User.findById(userID);
        if (!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const contacts_array = user.contacts;
        const all_contacts = await Contact.find({ _id: { $in: contacts_array } });
        res.status(200).json(all_contacts);
    }catch(error){
        next(error);
    }
}

// DELETE CONTACT :
const deleteContact = async(req, res, next) =>{
    const userID = req.params.userID;
    const contactID = req.body.contact_id;
    try{
        const deleted = await Contact.deleteOne({_id : contactID})
        res.status(200).json({msg : `Contact with id : ${contactID} Deleted Successfully`});
    }catch(error){
        next(error);
    }
}

// UPDATE CONTACT :


export {addContact, getContacts, deleteContact};