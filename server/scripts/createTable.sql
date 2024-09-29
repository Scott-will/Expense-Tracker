
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ExpenseTracker') 
BEGIN
CREATE DATABASE [ExpenseTracker]
END

Use ExpenseTracker

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='ExpenseCategories' AND xtype='U')
BEGIN
Create TABLE ExpenseCategories(
    Id INT PRIMARY KEY IDENTITY(1,1),
    Category NVARCHAR(255) Not NULL
)
END

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Expenses' AND xtype='U')
BEGIN
CREATE TABLE Expenses (
    Id INT PRIMARY KEY IDENTITY(1,1),
	CategoryId int
    FOREIGN Key (CategoryId) REFERENCES ExpenseCategories(Id),
    Amount DECIMAL(10, 2) NOT NULL,
    Date DATETIME DEFAULT GETDATE(),
    Description NVARCHAR(255) NULL
);
END
