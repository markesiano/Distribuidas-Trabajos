import  MongoDBConnector  from "../../Database/MongoDBConnector";
import mongoose from "mongoose";
export class Resolvers {

    public static resolvers = {
        Query: {
            async getProducts(_: any, {amount}: any){
                return await MongoDBConnector.find({}).limit(amount).skip(0);
            },
            async getProduct(_: any, {ID}: any){
                return await MongoDBConnector.findById(ID);
            },
        },
        Mutation:{
            async createProduct(_: any, {input: {name, description, price, stock}}: any){
                console.log("se entro al método create");
                // Generate random id
                const createdProduct = new MongoDBConnector({_id: new mongoose.Types.ObjectId(),name: name, description: description, price: price, stock: stock, status: 1});
                const result = await createdProduct.save();
                console.log("se creó");
                return {
                    id: result.id,
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    stock: result.stock,
                    status: result.status
                }
            },
            async deleteProduct(_: any, {ID}: any){
                const wasDeleted = (await MongoDBConnector.deleteOne({_id:ID})).deletedCount;
                return wasDeleted;
            },
            async updateProduct(_: any, {ID, input: {name,description,price,stock}}: any){

                const wasUpdated = (await MongoDBConnector.updateOne({_id:ID}, {name: name, description: description, price: price, stock: stock})).modifiedCount;
                return wasUpdated;
            }
        }
    }

    constructor(){
    }
}

export default Resolvers.resolvers;