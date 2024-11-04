class ExpenseQueryParams{
    constructor(query){
        this.Id = query.Id? parseInt(query.Id) : null;
        this.Category = query.Category || null;
    }
}

module.exports = ExpenseQueryParams;