import { ExpenseCategory, ExpenseCategoriesApi } from "../apiClient";

class ExpenseCategoryCache{
    public cache : Map<number, ExpenseCategory>;

    constructor(){
        this.cache = new Map<number, ExpenseCategory>;
    }
    public async GetExpenseCategories() : Promise<void>{
        const client = new ExpenseCategoriesApi();
        const categories = await client.getExpenseCategories()
        categories.data.forEach(element => {
            if(element.Id){
                this.cache.set(element.Id, element)
            }            
        });
    }
}

export default ExpenseCategoryCache;