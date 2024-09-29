class ExpenseQueryParams{
    constructor(query){
        this.Id = query.Id? parseInt(query.Id) : null;
        this.Category = query.Category || null;
        this.Amount = query.Amount? parseFloat(query.Amount) : null;
        this.Date = query.Date ? Date.parse(query.Date) : null;
    }
}

exports = ExpenseQueryParams;