import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/user.js";
import productsRoute from "./routes/product.js";
import contactsRoute from "./routes/contact.js";
import reviewsRoute from "./routes/reviews.js";
import cartRoute from "./routes/cart.js";

const app = express();
dotenv.config();

//connect to Database.
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
}
mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});


// middlewares :
app.use(cors());
//a middleware which parses cookies attached to the client request object.
app.use(cookieParser());
//parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/products", productsRoute);
app.use("/api/contacts", contactsRoute);
app.use("/api/reviews", reviewsRoute);
app.use("/api/cart", cartRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});


// connect to Backend : 
app.listen(8800, () => {
    connect();
    console.log("Connected to backend.");
});

//Fashionista ahmedbenhamouda98webdev  zPnSSNaZvahWtKQi 

// 192.168.43.20  255.255.255.0  192.168.0.1