"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDBConnector = void 0;
const mongoose_1 = require("mongoose");
class MongoDBConnector {
    constructor() {
    }
}
exports.MongoDBConnector = MongoDBConnector;
MongoDBConnector.productSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    name: String,
    description: String,
    price: Number,
    stock: Number,
    status: Number
});
exports.default = (0, mongoose_1.model)('Product', MongoDBConnector.productSchema);
