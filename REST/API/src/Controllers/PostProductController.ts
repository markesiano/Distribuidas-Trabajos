import { IPostProduct } from "../Domain/Interfaces/IPostProduct";

export class PostProductController {
    private postProductUseCase: IPostProduct;

    constructor(postProductUseCase: IPostProduct) {
        this.postProductUseCase = postProductUseCase;
    }
    async postProduct(data: any) {
        try {
            const result = await this.postProductUseCase.excecute(data);
            return result;
        } catch (error) {
            throw error;
        }
    }
}