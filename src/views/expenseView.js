class ExpenseView{
    constructor(expenseView){
        this.Id = expenseView.id
        this.Category = expenseView.category;
        this.Amount = expenseView.amount
        this.Description = expenseView.description;
        this.Date = expenseView.date
    }
}

module.exports = ExpenseView