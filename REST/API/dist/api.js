"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductRoutes_1 = require("./src/Infraestructure/Express/Routes/ProductRoutes");
const PORT = process.env.PORT || 8080;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(new ProductRoutes_1.ProductsRoutes().getRouter());
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
