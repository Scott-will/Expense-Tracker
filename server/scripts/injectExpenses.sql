Use ExpenseTrackerTest
Delete From Expenses
Delete From ExpenseCategories

DECLARE @new_parent_id INT;

Insert Into ExpenseCategories (Category) Values ('Gas') 
SELECT @new_parent_id = Id FROM ExpenseCategories WHERE Category = 'Gas';
Insert Into Expenses (CategoryId, Amount, Date, Description) Values (@new_parent_id, 55, '2024-10-02', '')

Insert Into ExpenseCategories (Category) Values ('Food') 
SELECT @new_parent_id = Id FROM ExpenseCategories WHERE Category = 'Food';
Insert Into Expenses (CategoryId, Amount, Date, Description) Values (@new_parent_id, 20, '2024-10-02', NULL)

Insert Into ExpenseCategories (Category) Values ('Rent') 
SELECT @new_parent_id = Id FROM ExpenseCategories WHERE Category = 'Rent';
Insert Into Expenses (CategoryId, Amount, Date, Description) Values (@new_parent_id, 1200, '2024-09-01', 'rent for my house')


