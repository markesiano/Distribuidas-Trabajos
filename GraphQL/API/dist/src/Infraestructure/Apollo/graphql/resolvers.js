"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Resolvers = void 0;
const MongoDBConnector_1 = __importDefault(require("../../Database/MongoDBConnector"));
const mongoose_1 = __importDefault(require("mongoose"));
class Resolvers {
    constructor() {
    }
}
exports.Resolvers = Resolvers;
Resolvers.resolvers = {
    Query: {
        getProducts(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { amount }) {
                return yield MongoDBConnector_1.default.find({}).limit(amount).skip(0);
            });
        },
        getProduct(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { ID }) {
                return yield MongoDBConnector_1.default.findById(ID);
            });
        },
    },
    Mutation: {
        createProduct(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { input: { name, description, price, stock } }) {
                console.log("se entro al método create");
                // Generate random id
                const createdProduct = new MongoDBConnector_1.default({ _id: new mongoose_1.default.Types.ObjectId(), name: name, description: description, price: price, stock: stock, status: 1 });
                const result = yield createdProduct.save();
                console.log("se creó");
                return {
                    id: result.id,
                    name: result.name,
                    description: result.description,
                    price: result.price,
                    stock: result.stock,
                    status: result.status
                };
            });
        },
        deleteProduct(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { ID }) {
                const wasDeleted = (yield MongoDBConnector_1.default.deleteOne({ _id: ID })).deletedCount;
                return wasDeleted;
            });
        },
        updateProduct(_1, _a) {
            return __awaiter(this, arguments, void 0, function* (_, { ID, input: { name, description, price, stock } }) {
                const wasUpdated = (yield MongoDBConnector_1.default.updateOne({ _id: ID }, { name: name, description: description, price: price, stock: stock })).modifiedCount;
                return wasUpdated;
            });
        }
    }
};
exports.default = Resolvers.resolvers;
