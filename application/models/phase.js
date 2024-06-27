import mongoose from 'mongoose';

const PhaseSchema = new mongoose.Schema({
    namephase: {
        type: String,
        required: [true, "Defina um nome para a fase!"]
    },
    orderphase: {
        type: Number,
        required: true
    },
    pointsphase: {
        type: Number
    }
},
    { timestamps: true }
);

export default mongoose.model("Phase", PhaseSchema);