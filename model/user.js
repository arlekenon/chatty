const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    id: { type: Number, default: 0 },
    chatID: { type: Number, unique: true },
    firstName: String,
    lastName: String,
    username: String,
    admin: { type: Boolean, default: false },
    startPayload: String,
    limits: Number,
    timestamps: Number,
    requestchat: { type: Number, default: 0 },
    personaj: { type: Number, default: 0 },
    vibe: { type: Number, default: 0 },
    prosetting: { type: Number, default: 0 },
    vozmojnosti: { type: Number, default: 0 },
    surpriz: { type: Number, default: 0 },
    info: { type: Number, default: 0 },
    zayavka: { type: Number, default: 0 },
    keyboard: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'created_at' } });

module.exports = db.define("user",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        chatID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        startPayload: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    }
);