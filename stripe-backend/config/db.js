import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://masumverma17:masumverma17@grasshawk.dxdbpyi.mongodb.net/grasshawk?retryWrites=true&w=majority&appName=grasshawk"
    )
    .then(() => {
      console.log("DB connected");
    });
};
