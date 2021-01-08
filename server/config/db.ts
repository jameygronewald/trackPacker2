import mongoose from 'mongoose';
require('dotenv').config();

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) throw new Error('Cannot find connection URI.');
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    // Exit process w failure
    process.exit(1);
  }
};

export default connectDB;
