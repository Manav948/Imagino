import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("dataBase connected successfully ");
    } catch (error) {
        console.log("Error in dataBase connection : " , error);
    }
}
export default connectDB