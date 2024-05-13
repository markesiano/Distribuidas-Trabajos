import { model, Schema } from 'mongoose';
export class MongoDBConnector{

    public static productSchema = new Schema({
        _id: Schema.Types.ObjectId,
        name: String,
        description: String,
        price: Number,
        stock: Number,
        status: Number
    });
    constructor(){
    }
}
export default model('Product', MongoDBConnector.productSchema);