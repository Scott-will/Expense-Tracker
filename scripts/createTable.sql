
IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = 'ExpenseTracker') 
BEGIN
CREATE DATABASE [ExpenseTracker]
END

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Categories' AND xtype='U')
BEGIN
Create TABLE Categories(
    Id INT PRIMARY KEY IDENTITY(1,1),
    Type NVARCHAR(255) Not NULL
)
END

IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Expenses' AND xtype='U')
BEGIN
CREATE TABLE Expenses (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Description NVARCHAR(255) NOT NULL,
    Type INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Date DATETIME DEFAULT GETDATE()
);
END
