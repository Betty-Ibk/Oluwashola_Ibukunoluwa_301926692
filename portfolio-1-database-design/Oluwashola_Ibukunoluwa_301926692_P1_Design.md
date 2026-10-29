# Library Management System — database design

My case study records member, book, loan.

## Users

- Library staff managing checkout and return
- Library managers reviewing circulation

## Main operations

- Record a loan linking one member to one book
- Record a return by adding its return date
- Report loans by member or book
- Separately benchmark the loan-date range filter against 50000 synthetic loan rows, comparing plans with and without a B-tree index on loan_date

## Entities

| Entity | Information stored |
| --- | --- |
| member | A person permitted to borrow books. |
| book | A lendable book identified by its ISBN. |
| loan | A checkout connecting one member and one book for a dated loan period. |

## member

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| member_id | BIGINT | PK | Yes |
| full_name | TEXT |  | Yes |
| email | TEXT | Unique | Yes |
| joined_on | DATE |  | Yes |
| active | BOOLEAN |  | Yes |
- Unique key: (email).

## book

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| book_id | BIGINT | PK | Yes |
| isbn | TEXT | Unique | Yes |
| title | TEXT |  | Yes |
| author | TEXT |  | Yes |
| published_on | DATE |  | No |
- Unique key: (isbn).

## loan

| Field | Type | Key | Required |
| --- | --- | --- | --- |
| loan_id | BIGINT | PK | Yes |
| member_id | BIGINT | FK | Yes |
| book_id | BIGINT | FK | Yes |
| loan_date | DATE |  | Yes |
| due_date | DATE |  | Yes |
| returned_on | DATE |  | No |
- member_id → member.member_id
- book_id → book.book_id

## Relationships and business rules

- Each member must have a distinct email address.
- Each book row must have a distinct ISBN.
- Every loan must reference an existing member.
- Every loan must reference an existing book.
- A loan's due date must be on or after its loan date.
- A book may have at most one loan whose returned_on value is null.

## Assumptions

- Each book row represents one lendable book; this exercise does not track multiple copies of a title.
- Each loan has exactly one member and one book, and returned_on is null until the book is returned.
- For a worked normalization example, start with a checkout record containing member name and email, book title and ISBN, and loan dates. Use loan as the root and separate member and book facts into their own tables, leaving their identifiers and loan-specific facts in loan; each ancestor role appears only once.
- The benchmark uses synthetic data only, compares the same loan_date range query before and after adding the specified index, and records no assumed performance result.

