import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Mobile from "../models/Mobile";
import Admin from "../models/Admin";
export const addMobile = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken && extractedToken.trim() === "") {
        return res.status(404).json({ message: "No token provided." });
    }

    let adminId;

    // verify token
    jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(400).json({ message: `${err.message}` });
        } else {
            adminId = decrypted.id;
            return;
        }
    });

    // create token
    const { title, price, company, posterUrl, featured } = req.body;
    if (!title &&
        title.trim() === "" &&
        !price &&
        price.trim() === "" &&
        !company &&
        company.trim() === "" &&
        !posterUrl &&
        posterUrl.trim() === "" &&
        !featured &&
        featured.trim() === ""
    ) {
        return res.status(422).json({ message: "Please fill all fields." });
    }

    let mobile;
    try {
        mobile = new Mobile({
            title,
            price,
            company,
            posterUrl,
            featured,
            admin: adminId
        });
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await mobile.save({ session });
        adminUser.addedMobile.push(mobile);
        await adminUser.save({ session });
        await session.commitTransaction();
    } catch (err) {
        return console.log(err);
    };


    if (!mobile) {
        return res.status(500).json({ message: "Request Failed" });
    }

    return res.status(201).json({ mobile });
};

export const getAllMobiles = async (req, res, next) => {
    let mobiles;

    try {
        mobiles = await Mobile.find();
    } catch (err) {
        return console.log(err);
    }

    if (!mobiles) {
        return res.status(500).json({ message: "Request Failed" });
    }
    return res.status(200).json({ mobiles });
};

export const getMobileById = async (req, res, next) => {
    const id = req.params.id;
    let mobile;
    try {
        mobile = await Mobile.findById(id);
    } catch (err) {
        return console.log(err);
    };

    if (!mobile) {
        return res.status(404).json({ message: "Invalid Mobile ID" });
    }

    return res.status(200).json({ mobile });
};