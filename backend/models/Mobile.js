import mongoose from "mongoose";

const mobileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    posterUrl: {
        type: String,
        required: true
    },
    featured: {
        type: String,
        required: true
    },
    bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true,
    },
});

export default mongoose.model("Mobile", mobileSchema);