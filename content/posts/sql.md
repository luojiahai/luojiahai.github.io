+++
title = 'SQL'
date = 2024-06-08T13:46:16+10:00
draft = false
author = 'luojiahai'
+++

Structured query language (SQL) is a programming language for storing and processing information in a relational database.

SQL was invented in the 1970s based on the relational data model. It was initially known as the structured English query language (SEQUEL). The term was later shortened to SQL. Oracle, formerly known as Relational Software, became the first vendor to offer a commercial SQL relational database management system.

SQL commands are mainly categorized into the following categories:
- [Data Definition Language (DDL)]({{% ref "#ddl" %}})
- [Data Manipulation Language (DML)]({{% ref "#dml" %}})
- [Data Query Language (DQL)]({{% ref "#dql" %}})
- [Data Control Language (DCL)]({{% ref "#dcl" %}})
- [Transaction Control Language (TCL)]({{% ref "#tcl" %}})

## Data Definition Language (DDL) {#ddl}

Create a database.
```
CREATE DATABASE [IF NOT EXISTS] company;
```

Delete a database.
```
DROP DATABASE [IF EXISTS] company;
```

Update database encoding.
```
ALTER DATABASE company CHARACTER SET utf8;
```

Create a table.
```
CREATE TABLE employees (
    employee_id INT PRIMARY KEY,
    name VARCHAR(100),
    age INT,
)
```

Delete a table.
```
DROP TABLE employees;
```

Add a column.
```
ALTER TABLE employees ADD email VARCHAR(255);
```

Delete a column.
```
ALTER TABLE employees DROP COLUMN email;
```

Update a column.
```
ALTER TABLE employees MODIFY COLUMN name VARCHAR(255);
```

Rename a column.
```
ALTER TABLE employees RENAME COLUMN name TO full_name;
```

Create an index.
```
CREATE INDEX index_employee_name ON employees(name);
```

Delete an index.
```
DROP INDEX index_employee_name ON employees;
```

Create a view.
```
CREATE VIEW department_summary AS
SELECT department_id, COUNT(*) AS num_employees
FROM employees
GROUP BY department_id;
```

Delete a view.
```
DROP VIEW department_summary;
```

Create a primary key.
```
ALTER TABLE employees ADD PRIMARY KEY (employee_id);
```

Delete a primary key.
```
ALTER TABLE employees DROP PRIMARY KEY;
```

## Data Manipulation Language (DML) {#dml}

Create a row.
```
INSERT INTO employees (id, name, age) VALUES (1, 'John Doe', 18);
```

Update a row.
```
UPDATE employees
SET name = 'Jane Doe'
WHERE id = 1;
```

Delete a row.
```
DELETE FROM employees WHERE id = 1;
```

## Data Control Language (DCL) {#dcl}

TODO

## Data Query Language (DQL) {#dql}

Get all rows.
```
SELECT * FROM employees;
```

Get all rows. Show only specific columns.
```
SELECT name, age FROM employees;
```

Get all rows. Filter by a condition.
```
SELECT * FROM employees WHERE age > 30;
```

Get all rows. Limit the returning rows.
```
SELECT * FROM employees LIMIT 10;
```

Get all rows. Order by a column.
```
SELECT * FROM employees ORDER BY age DESC;
```

Group rows.
```
SELECT department_id, COUNT(*) AS num_employees
FROM employees
GROUP BY department_id;
```

Join tables.
```
SELECT employees.name, departments.name
FROM employees JOIN departments
ON employees.department_id = departments.department_id;
```

Left join tables.
```
SELECT employees.name, departments.name
FROM employees LEFT JOIN departments
ON employees.department_id = departments.department_id;
```

Nested query.
```
SELECT name FROM employees
WHERE department_id IN (
    SELECT department_id FROM departments
    WHERE name = 'IT'
);
```

Calculate sum.
```
```

Calculate average.
```
```

Calculate max.
```
```

Calculate min.
```
```

Count.
```
```

Use alias.
```
```

Get distinct rows.
```
```

Use CASE function.
```
```

Use LIKE function.
```
```

Use BETWEEN function.
```
```

Use IS NULL function.
```
```

Use IS NOT NULL function.
```
```

## Transaction Control Language (TCL) {#tcl}

TODO

## Advanced Queries

TODO

## Optimisation and Performance

TODO

---
