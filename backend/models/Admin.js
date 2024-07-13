import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    addedMobile: [  //addedMovies
        {
            type: mongoose.Types.ObjectId,
            ref: "Mobile",
        },
    ],
});

export default mongoose.model("Admin", adminSchema);