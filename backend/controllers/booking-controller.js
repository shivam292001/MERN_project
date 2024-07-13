import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Mobile from "../models/Mobile";
import User from "../models/User";

export const newBooking = async (req, res, next) => {
    const { mobile, date, user } = req.body;

    let existingMobile;
    let existingUser;
    try {
        existingMobile = await Mobile.findById(mobile);
        existingUser = await User.findById(user);
    } catch (err) {
        return console.log(err);
    }
    if (!existingMobile) {
        return res.status(404).json({ message: "Mobile not found" });
    }
    if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
    }

    let booking;

    try {
        booking = new Bookings({
            mobile,
            date: new Date(`${date}`),
            user
        });
        const session = await mongoose.startSession();
        session.startTransaction();
        existingUser.bookings.push(booking);
        existingMobile.bookings.push(booking);
        await existingUser.save({ session });
        await existingMobile.save({ session });
        await booking.save({ session });
        session.commitTransaction();
    } catch (err) {
        return console.log(err);
    }

    if (!booking) {
        return res.status(500).json({ message: "Unable to create a booking" });
    }

    return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findById(id);
    } catch (err) {
        return console.log(err);
    }
    if (!booking) {
        return res.status(500).json({ message: "Unexpected Error" });
    }
    return res.status(200).json({ booking });
}

export const deleteBooking = async (req, res, next) => {
    const id = req.params.id;
    let booking;
    try {
        booking = await Bookings.findByIdAndRemove(id).populate("user mobile");
        console.log(booking);
        const session = await mongoose.startSession();
        session.startTransaction();
        await booking.user.bookings.pull(booking);
        await booking.mobile.bookings.pull(booking);
        await booking.mobile.save({ session });
        await booking.user.save({ session });
        session.commitTransaction();


    } catch (err) {
        return console.log(err);
    };
    if (!booking) {
        return res.status(500).json({ message: "Unable to Delete" });
    }
    return res.status(200).json({ message: "Successfully Deleted" });
};