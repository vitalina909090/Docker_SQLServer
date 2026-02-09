IF DB_ID('test_db') IS NULL
BEGIN
    CREATE DATABASE test_db;
END;
GO

USE test_db;

IF OBJECT_ID('users', 'U') IS NULL
BEGIN
    CREATE TABLE users (
        id INT IDENTITY(1,1) PRIMARY KEY,
        name NVARCHAR(100) NOT NULL,
        email NVARCHAR(100) UNIQUE NOT NULL,
        created_at DATETIME DEFAULT GETDATE()
    );
END;

INSERT INTO users (name, email)
VALUES
('Chack Norris','chack@mail.com'),
('Brus Willis','brus@mail.com');
GO
