import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name field is required"],
      minLength: 3,
      maxLength: 50,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email field is required"],
      trim: true,
      lowercase: true,
      unique: true,
      minLength: 3,
      maxLength: 50,
    },
    phoneNumber: {
      type: String,
      required: [true, "PhoneNumber is required"],
      unique: true,
      minLength: 10,
      maxLength: 15,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6,
      maxLength: 100,
    },
    role: {
      type: String,
      enum: ["customer", "owner", "delivery", "admin"],
      default: "customer",
    },
    avatar: String,
    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zip: { type: String },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      role: this.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15min" }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d" }
  );
};

userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", userSchema);
