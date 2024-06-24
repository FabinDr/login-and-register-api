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

// //Tabela  Usuário fases
// const UserToPhaseSchema = new mongoose.Schema({



// },
//     { timestamps: true }
// );


export default mongoose.model("Phase", PhaseSchema);


// export default mongoose.model("Phase", "UserToPhaseSchema", PhaseSchema, UserToPhaseSchema);