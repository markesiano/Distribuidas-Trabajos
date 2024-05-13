import { IGetProductList } from '../Domain/Interfaces/IGetProductList';

export class GetProductListController {
    private getProductsListUseCase: IGetProductList;

    constructor(getProductsListUseCase: IGetProductList) {
        this.getProductsListUseCase = getProductsListUseCase;
    }
    async getProductsList() {
        try {
            const result = await this.getProductsListUseCase.excecute();
            return result;
        } catch (error) {
            throw error;
        }
    }
}