const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    place: { type: String, require: true },
    review: { type: String, require: true, unique: true },
    rating: { type: Number, require: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
}, {timestamps: true})

module.exports = mongoose.model("Review", reviewSchema);