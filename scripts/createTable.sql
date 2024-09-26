CREATE TABLE Expenses (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Description NVARCHAR(255) NOT NULL,
    Type INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Date DATETIME DEFAULT GETDATE()
);

Create TABLE Categories(
    Id INT PRIMARY KEY IDENTITY(1,1),
    Type NVARCHAR(255) Not NULL
)
