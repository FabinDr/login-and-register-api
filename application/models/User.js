import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

// import validator from 'validator'
// import JsonWebTokenError from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: [true, "ATENÇAO! O nome completo é obrigatório!"],
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "O campo de e-mail é obrigatório!"],
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Senha é obrigatório!"],
        //select: true para evitar vazamento de senhas
        select: false,
        trim: true,
        // minlength: 7,
    },
    birthday: {
        type: Date
    },
    genero: {
        type: String,
        enum: ['M', 'F'],
        default: null
    },
},
    //adciona um "CreatedAt" e "updtadeAt"
    { timestamps: true }
);

//hash da senha e verificação de mudança de senha para criar um novo hash

//pre save antes de ir para o banco de dados
UserSchema.pre("save", function (next) {
    //se refere ao doc de user atuar sendo salvo
    const user = this;

    if (!user.isModified("password")) return next();
    //salt gera dados aleatórios
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);

            user.password = hash;
            next()
        })
    })

})

export default mongoose.model("Users", UserSchema);
