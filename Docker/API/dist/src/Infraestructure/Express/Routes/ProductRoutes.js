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
exports.ProductsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const GetProductListFactory_1 = require("../../../CompositionRoot/GetProductListFactory");
const PostProductFactory_1 = require("../../../CompositionRoot/PostProductFactory");
const PatchProductFactory_1 = require("../../../CompositionRoot/PatchProductFactory");
const ApiKey_1 = require("./ApiKey");
class ProductsRoutes {
    constructor() {
        this.getProductListController = GetProductListFactory_1.GetProductListFactory.create();
        this.postProductController = PostProductFactory_1.PostProductFactory.create();
        this.patchProductController = PatchProductFactory_1.PatchProductFactory.create();
    }
    getRouter() {
        const router = express_1.default.Router();
        router.get('/products', this.validateKey(), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.getProductListController.getProductsList();
                res.json(result);
            }
            catch (error) {
                res.status(500).send(error); // Manejo de errores
            }
        }));
        router.post('/products', this.validateKey(), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.postProductController.postProduct(req.body);
                res.json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error); // Manejo de errores
            }
        }));
        router.patch('/products/:id', this.validateKey(), (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.patchProductController.patchProductStock(req.params.id, req.body.stock);
                res.json(result);
            }
            catch (error) {
                console.log(error);
                res.status(500).send(error); // Manejo de errores
            }
        }));
        return router;
    }
    validateKey() {
        return (req, res, next) => {
            const key = req.headers['api-key'];
            if (!key) {
                res.status(401).send('Api Key is required');
                return;
            }
            else if (ApiKey_1.ApiKey.validateKey(key) === 'invalid key') {
                res.status(401).send('Invalid Api Key');
                return;
            }
            else if (ApiKey_1.ApiKey.validateKey(key) === 'limit reached') {
                res.status(429).send('Limit of requests reached');
                return;
            }
            next();
        };
    }
}
exports.ProductsRoutes = ProductsRoutes;
