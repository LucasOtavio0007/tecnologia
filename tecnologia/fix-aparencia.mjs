import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI)
const Config = mongoose.model("Config", new mongoose.Schema({}, { strict: false }))
const set = { "aparencia.navbarAltura": 88, "aparencia.navbarBlur": 20, "aparencia.borderRadius": 12 }
await Config.updateMany({}, { $set: set })
console.log("Corrigido!")
await mongoose.disconnect()
