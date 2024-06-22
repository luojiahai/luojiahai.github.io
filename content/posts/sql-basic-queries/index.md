+++
slug = 'sql-basic-queries'
title = 'SQL: Basic Queries'
date = 2024-06-08T13:46:16+10:00
draft = false
author = 'luojiahai'
+++

Structured query language (SQL) is a programming language for storing and processing information in a relational
database.

SQL was invented in the 1970s based on the relational data model. It was initially known as the structured English query
language (SEQUEL). The term was later shortened to SQL. Oracle, formerly known as Relational Software, became the first
vendor to offer a commercial SQL relational database management system.

## Data Definition Language (DDL)

Create a database.
```sql
CREATE DATABASE [IF NOT EXISTS] company;
```

Delete a database.
```sql
DROP DATABASE [IF EXISTS] company;
```

Update database encoding.
```sql
ALTER DATABASE company CHARACTER SET utf8;
```

Create a table.
```sql
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
)
```

Delete a table.
```sql
DROP TABLE employees;
```

Add a column.
```sql
ALTER TABLE employees ADD email VARCHAR(255);
```

Delete a column.
```sql
ALTER TABLE employees DROP COLUMN email;
```

Update a column.
```sql
ALTER TABLE employees MODIFY COLUMN name VARCHAR(255);
```

Rename a column.
```sql
ALTER TABLE employees RENAME COLUMN name TO full_name;
```

Create an index.
```sql
CREATE INDEX index_employee_name ON employees(name);
```

Delete an index.
```sql
DROP INDEX index_employee_name ON employees;
```

Create a view.
```sql
CREATE VIEW department_summary AS
SELECT department_id, COUNT(*) AS num_employees
FROM employees
GROUP BY department_id;
```

Delete a view.
```sql
DROP VIEW department_summary;
```

Create a primary key.
```sql
ALTER TABLE employees ADD PRIMARY KEY (employee_id);
```

Delete a primary key.
```sql
ALTER TABLE employees DROP PRIMARY KEY;
```

## Data Manipulation Language (DML)

Create a row.
```sql
INSERT INTO employees (id, name, age) VALUES (1, 'John Doe', 18);
```

Update a row.
```sql
UPDATE employees
SET name = 'Jane Doe'
WHERE id = 1;
```

Delete a row.
```sql
DELETE FROM employees WHERE id = 1;
```

## Data Control Language (DCL)

Grant a permission on a table to a user.
```sql
GRANT SELECT ON employees TO user_john;
```

Revoke a permission on a table from a user.
```sql
REVOKE SELECT ON employees FROM user_john;
```

Create a user.
```sql
CREATE USER user_john IDENTIFIED BY 'password';
```

Delete a user.
```sql
DROP USER user_john;
```

Grant specific permissions on a table to a user.
```sql
GRANT INSERT, UPDATE ON employees TO user_john;
```

Revoke specific permissions on a table from a user.
```sql
REVOKE INSERT, UPDATE ON employees FROM user_john;
```

Get user permissions.
```sql
SHOW GRANTS FOR user_john;
```

Set password for a user.
```sql
SET PASSWORD FOR user_john = 'new_password';
```

Update a user permission.
```sql
ALTER USER user_john WITH MAX_QUERIES_PER_HOUR 100;
```

Lock and unlock a user.
```sql
ALTER USER user_john ACCOUNT LOCK;
ALTER USER user_john ACCOUNT UNLOCK;
```

Grant all privileges on all tables to a user.
```sql
GRANT ALL PRIVILEGES ON database_name.* TO user_john;
```

Expire a user password.
```sql
ALTER USER user_john PASSWORD EXPIRE;
```

## Data Query Language (DQL)

Get all rows.
```sql
SELECT * FROM employees;
```

Get all rows. Show only specific columns.
```sql
SELECT name, age FROM employees;
```

Get all rows. Filter by a condition.
```sql
SELECT * FROM employees WHERE age > 30;
```

Get all rows. Limit the returning rows.
```sql
SELECT * FROM employees LIMIT 10;
```

Get all rows. Order by a column.
```sql
SELECT * FROM employees ORDER BY age DESC;
```

Group rows.
```sql
SELECT department_id, COUNT(*) AS num_employees
FROM employees
GROUP BY department_id;
```

Join tables.
```sql
SELECT employees.name, departments.name
FROM employees JOIN departments
ON employees.department_id = departments.department_id;
```

Left join tables.
```sql
SELECT employees.name, departments.name
FROM employees LEFT JOIN departments
ON employees.department_id = departments.department_id;
```

Nested query.
```sql
SELECT name FROM employees
WHERE department_id IN (
    SELECT department_id FROM departments
    WHERE name = 'IT'
);
```

Calculate sum.
```sql
SELECT SUM(salary) FROM employees;
```

Calculate average.
```sql
SELECT AVG(salary) FROM employees;
```

Calculate max.
```sql
SELECT MAX(salary) FROM employees;
```

Calculate min.
```sql
SELECT MIN(salary) FROM employees;
```

Count.
```sql
SELECT COUNT(*) FROM employees;
```

Use alias.
```sql
SELECT COUNT(*) AS total_employees FROM employees;
```

Get distinct rows.
```sql
SELECT DISTINCT department_id FROM employees;
```

Use CASE function.
```sql
SELECT name, CASE WHEN age >= 18 THEN 'Adult' ELSE 'Minor' END AS status
FROM employees;
```

Use LIKE function.
```sql
SELECT * FROM employees WHERE name LIKE 'J%';
```

Use BETWEEN function.
```sql
SELECT * FROM employees WHERE age BETWEEN 25 AND 35;
```

Use IS NULL function.
```sql
SELECT * FROM employees WHERE department_id IS NULL;
```

Use IS NOT NULL function.
```sql
SELECT * FROM employees WHERE department_id IS NOT NULL;
```

## Transaction Control Language (TCL)

Start a transaction.
```sql
BEGIN;
-- or START TRANSACTION;
```

Commit current transaction.
```sql
COMMIT;
```

Rollback current transaction.
```sql
ROLLBACK;
```

Mark a save point.
```sql
SAVEPOINT savepoint_name;
```

Rollback to a save point.
```sql
ROLLBACK TO savepoint_name;
```

Release a save point.
```sql
RELEASE SAVEPOINT savepoint_name;
```

Set transaction isolation level.
```sql
SET TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
-- other options: READ COMMITTED, REPEATABLE READ, SERIALIZABLE
```

Start a transaction with specific isolation levels.
```sql
START TRANSACTION WITH CONSISTENT SNAPSHOT, READ WRITE;
```

Get current isolation level in current transaction.
```sql
SELECT @@tx_isolation;
```

Start a transaction in read only mode.
```sql
START TRANSACTION READ ONLY;
```

## Advanced Queries

Use nested queries.
```sql
SELECT name, (SELECT AVG(salary) FROM exmployees) AS avg_salary
FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);
```

Use RANK function.
```sql
SELECT name, RANK() OVER (ORDER BY salary DESC) AS rank FROM employees;
```

Use recursive queries.
```sql
WITH RECURSIVE subordinates AS (
    SELECT employee_id, name, manager_id FROM employees WHERE manager_id IS NULL
    UNION ALL
    SELECT e.employee_id, e.name, e.manager_id
    FROM employees e
    INNER JOIN subordinates s ON s.employee_id = e.manager_id
)
SELECT * FROM subordinates;
```

Use locking.
```sql
SELECT * FROM employees FOR UPDATE;
```

Use self-join.
```sql
SELECT a.name AS employee_name, b.name AS manager_name
FROM employees a, employees b
WHERE a.manager_id = b.employee_id;
```

Use OUTER JOIN.
```sql
SELECT employees.name, departments.name
FROM employees
FULL OUTER JOIN departments ON employees.department_id = departments.department_id;
```

Use CROSS JOIN.
```sql
SELECT a.name, b.name
FROM employees a
CROSS JOIN employees b;
```

Use EXISTS.
```sql
SELECT * FROM employees WHERE EXISTS (
    SELECT * FROM departments
    WHERE employees.department_id = departments.department_id
);
```

Use NOT EXISTS.
```sql
SELECT * FROM employees WHERE NOT EXISTS (
    SELECT * FROM departments
    WHERE employees.department_id = departments.department_id
);
```

Use GROUP BY and HAVING to filter.
```sql
SELECT department_id, AVG(salary)
FROM employees
GROUP BY department_id
HAVING AVG(salary) > 50000;
```

Use OFFSET FETCH to paginate.
```sql
SELECT * FROM employees
ORDER BY name
OFFSET 10 ROWS FETCH NEXT 10 ROWS ONLY;
```

Use UNION to combine results.
```sql
SELECT name FROM employees
UNION
SELECT name FROM departments;
```

Use UNION ALL to combine results.
```sql
SELECT name FROM employees
UNION ALL
SELECT name FROM departments;
```

Use INTERSECT to find intersection.
```sql
SELECT name FROM employees
INTERSECT
SELECT name FROM departments;
```

Use EXCEPT to find difference.
```sql
SELECT name FROM employees
EXCEPT
SELECT name FROM departments;
```

## Optimisation

Use FORCE INDEX to optimise query.
```sql
SELECT * FROM employees FORCE INDEX (index_employee_name) WHERE name = 'John';
```

Get query execution plan.
```sql
EXPLAIN SELECT * FROM employees WHERE department_id = 5;
```

Create partitions.
```sql
CREATE TABLE sales (
    sale_id INT,
    sale_date DATE,
    amount DECIMAL(10, 2)
)
PARTITION BY RANGE (YEAR(sale_date)) (
    PARTITION p0 VALUES LESS THAN (1991),
    PARTITION p1 VALUES LESS THAN (1992),
    PARTITION p2 VALUES LESS THAN (1993)
);
```

Use temporary table.
```sql
CREATE TEMPORARY TABLE temp_employees AS
SELECT * FROM employees WHERE department_id = 5;
```

Clear all rows from a table.
```sql
TRUNCATE TABLE employees;
```

Update a column with conditions.
```sql
UPDATE employees SET salary = salary * 1.1 WHERE department_id = 3;
```

Delete rows with conditions.
```sql
DELETE FROM employees WHERE hire_date '2000-01-01';
```

---
