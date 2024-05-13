import { MongoDBConfig } from "../../../../config/mongoDB.config";
import mongoose from 'mongoose';

const stringConection = "mongodb+srv://"+MongoDBConfig.USER+":"+MongoDBConfig.PASSWORD+"@"+MongoDBConfig.CLUSTER+"/?"+MongoDBConfig.CONFIG;
const clientOptions: mongoose.ConnectOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(stringConection, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (e) {
    console.error("Error connecting to MongoDB: ", e);
  } 
}
export default run().catch(console.dir);