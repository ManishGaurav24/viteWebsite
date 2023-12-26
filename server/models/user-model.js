const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

//secure the password with bcrypt
userSchema.pre('save', async function (next) {
    // console.log(this);
    const user = this;
    if (!user.isModified("password")) {
        next();
    }
    try {
        const saltRounds = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRounds)
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

//comparing password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compare(password, this.password);
}


//json web token(always stored in client side and not in db)
userSchema.methods.generateToken = function(){
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SIGNATURE,
        {
            expiresIn: "30d",
        }
        );
    } catch (error) {
        console.log(error);
    }
};


//define the model or the collection name
const User = new mongoose.model("User", userSchema);

module.exports = User;