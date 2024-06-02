import express from 'express';

import { GetProductListFactory } from '../../../CompositionRoot/GetProductListFactory'; 
import { PostProductFactory } from '../../../CompositionRoot/PostProductFactory'; 
import { GetProductListController } from '../../../Controllers/GetProductListController';
import { PostProductController } from '../../../Controllers/PostProductController';
import { PatchProductController } from '../../../Controllers/PatchProductController';
import { PatchProductFactory } from '../../../CompositionRoot/PatchProductFactory';

import { ApiKey } from './ApiKey';

export class ProductsRoutes {
    private getProductListController: GetProductListController;
    private postProductController: PostProductController;
    private patchProductController: PatchProductController

    constructor(){
        this.getProductListController = GetProductListFactory.create();
        this.postProductController = PostProductFactory.create();
        this.patchProductController = PatchProductFactory.create();

    }
    public getRouter(){
        const router = express.Router();

        router.get('/products',this.validateKey(), async (req, res) => {
            try {
                const result = await this.getProductListController.getProductsList();
                res.json(result);
            } catch (error) {
                res.status(500).send(error); // Manejo de errores
            }
        });

        router.post('/products',this.validateKey(), async (req, res) => {
            try {
                const result = await this.postProductController.postProduct(req.body);
                res.json(result);
            } catch (error) {
                console.log(error);
                res.status(500).send(error); // Manejo de errores
            }
        });

        router.patch('/products/:id',this.validateKey(), async (req, res) => {
            try {
                const result = await this.patchProductController.patchProductStock(req.params.id, req.body.stock);
                res.json(result);
            } catch (error) {
                console.log(error);
                res.status(500).send(error); // Manejo de errores
            }
        }
        );



        return router;
    }

    private validateKey(){
        return (req: express.Request, res: express.Response, next: express.NextFunction) => {
            const key = req.headers['api-key'];
            if(!key){
                res.status(401).send('Api Key is required');
                return;
            }else if(ApiKey.validateKey(key as string) === 'invalid key'){
                res.status(401).send('Invalid Api Key');
                return;
            }else if(ApiKey.validateKey(key as string) === 'limit reached'){
                res.status(429).send('Limit of requests reached');
                return;
            }
            next();
        }
    }


}
