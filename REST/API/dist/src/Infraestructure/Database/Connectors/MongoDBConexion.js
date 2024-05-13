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
const mongoDB_config_1 = require("../../../../config/mongoDB.config");
const mongoose_1 = __importDefault(require("mongoose"));
const stringConection = "mongodb+srv://" + mongoDB_config_1.MongoDBConfig.USER + ":" + mongoDB_config_1.MongoDBConfig.PASSWORD + "@" + mongoDB_config_1.MongoDBConfig.CLUSTER + "/?" + mongoDB_config_1.MongoDBConfig.CONFIG;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
            yield mongoose_1.default.connect(stringConection, clientOptions);
            yield mongoose_1.default.connection.db.admin().command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
        }
        catch (e) {
            console.error("Error connecting to MongoDB: ", e);
        }
    });
}
exports.default = run().catch(console.dir);
