class ExpenseView{
    constructor(expenseView){
        this.Id = expenseView.Id
        this.Category = expenseView.CategoryId;
        this.Amount = expenseView.Amount
        this.Description = expenseView.Description;
        this.Date = expenseView.Date
    }
}

module.exports = ExpenseView