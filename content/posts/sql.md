+++
title = 'SQL'
date = 2024-06-15T11:46:16+10:00
draft = false
+++

Structured query language (SQL) is a programming language for storing and processing information in a relational database.

SQL was invented in the 1970s based on the relational data model. It was initially known as the structured English query language (SEQUEL). The term was later shortened to SQL. Oracle, formerly known as Relational Software, became the first vendor to offer a commercial SQL relational database management system.

SQL commands are mainly categorized into the following categories:
- Data Definition Language (DDL)
- Data Manipulation Language (DML)
- Data Query Language (DQL)
- Data Control Language (DCL)
- Transaction Control Language (TCL)

## Data Definition Language (DDL)

Create a database.
```
CREATE DATABASE [IF NOT EXISTS] example_db;
```

Delete a database.
```
DROP DATABASE [IF EXISTS] example_db;
```

Update database encoding.
```
ALTER DATABASE example_db CHARACTER SET utf8;
```

Create a table with common data types.
```
CREATE TABLE example_table (
    id INT PRIMARY KEY,
    column_int INT,
    column_double DOUBLE,
    column_decimal DECIMAL,
    column_char CHAR(10),
    column_varchar VARCHAR(100),
    column_text TEXT(100),
    column_blob BLOB,
    column_date DATE,
    column_time TIME,
    column_timestamp TIMESTAMP
)
```

Delete a table.
```
DROP TABLE example_table;
```

Add a column.
```
ALTER TABLE example_table ADD column_new VARCHAR(255);
```

Delete a column.
```
ALTER TABLE example_table DROP COLUMN column_new;
```

Update a column.
```
ALTER TABLE example_table MODIFY COLUMN column_varchar VARCHAR(255);
```

Rename a column.
```
ALTER TABLE example_table RENAME COLUMN column_old TO column_new;
```

Create an index.
```
CREATE INDEX example_index ON example_table(column_varchar);
```

Delete an index.
```
DROP INDEX example_index ON example_table;
```

Create a view.
```
CREATE VIEW example_view AS
SELECT group_id, COUNT(*) AS num_groups
FROM example_table
GROUP BY group_id;
```

Delete a view.
```
DROP VIEW example_view;
```

Create a primary key.
```
ALTER TABLE example_table ADD PRIMARY KEY example_id;
```

Delete a primary key.
```
ALTER TABLE example_table DROP PRIMARY KEY;
```

## Data Manipulation Language (DML)

TODO

## Data Control Language (DCL)

TODO

## Data Query Language (DQL)

TODO

## Transaction Control Language (TCL)

TODO

---
