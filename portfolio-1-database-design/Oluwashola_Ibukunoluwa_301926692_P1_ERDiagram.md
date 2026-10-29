# Library Management System — ER diagram

```mermaid
erDiagram
    direction LR
    member {
        bigint member_id PK
        text full_name
        text email UK
        date joined_on
        boolean active
    }
    book {
        bigint book_id PK
        text isbn UK
        text title
        text author
        date published_on "Optional"
    }
    loan {
        bigint loan_id PK
        bigint member_id FK
        bigint book_id FK
        date loan_date
        date due_date
        date returned_on "Optional"
    }
    member ||--o{ loan : "member_id"
    book ||--o{ loan : "book_id"
```

PK identifies a record; FK links to another table; UK marks a single-field unique value. The relationship ends show exactly one, zero or one, or zero or many records. Composite unique keys and conditional rules are listed in the schema and design.

[Diagram image](../images/Oluwashola_Ibukunoluwa_301926692_ERDiagram.png)
