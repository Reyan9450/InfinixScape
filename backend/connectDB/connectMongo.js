import mongoose from 'mongoose';
import dotenv from 'dotenv';


// console.log(process.env.PORT)

dotenv.config();
const uri = process.env.URI;
const number = process.env.PORT
// console.log("Environment Variables:", process.env);
console.log("number ",uri);

const connectMongo = async () => {

    try {

        await mongoose.connect( uri )
        console.log('MongoDB connected ')

    } catch (error) {
        
        console.log("Failed to connect to MongoDB\n",error)
    }
}

// Export the connectMongo function and optionally the client
export { connectMongo};
