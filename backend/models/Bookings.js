import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    mobile: {
        type: mongoose.Types.ObjectId,
        ref: "Mobile",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
});

export default mongoose.model("Booking", bookingSchema);