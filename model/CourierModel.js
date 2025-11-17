import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    id: Number,
    weight: Number,
    distance: Number,
    offerCode: String,
    _id: false
});

const courierSchema = new mongoose.Schema({
    basePrice: Number,
    packageCount: Number,
    packages: [packageSchema]
});

export const Courier = mongoose.model("Courier", courierSchema);