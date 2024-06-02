import express from 'express';

import { ProductsRoutes } from './src/Infraestructure/Express/Routes/ProductRoutes';

const PORT = process.env.PORT || 8080;

const app = express();
app.use(express.json());


app.use(new ProductsRoutes().getRouter());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
