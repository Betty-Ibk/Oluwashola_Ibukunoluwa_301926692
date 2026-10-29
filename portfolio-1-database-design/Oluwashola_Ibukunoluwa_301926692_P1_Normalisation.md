# Library Management System — normalisation

The example uses the saved sample records. The full set of fields is in the design and schema.

## Starting grouped records

| member_id | loan records (list) |
| --- | --- |
| 101 | [301] |
| 102 | [302] |


The record IDs are grouped in a list. In 1NF, each record has its own row and each cell holds one value.

## 1NF: one value per cell

| loan.loan_id | loan.member_id | loan.book_id | member.member_id | member.full_name | book.book_id | book.isbn |
| --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 101 | Avery Chen | 201 | 9780000000201 |
| 302 | 102 | 202 | 102 | Jordan Patel | 202 | 9780000000202 |

Key: loan_id.

## 2NF: depend on the whole key

The declared candidate keys do not introduce a partial dependency here, so the 1NF rows stay unchanged at this step.

## loan_example

| loan.loan_id | loan.member_id | loan.book_id | member.member_id | member.full_name | book.book_id | book.isbn |
| --- | --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 101 | Avery Chen | 201 | 9780000000201 |
| 302 | 102 | 202 | 102 | Jordan Patel | 202 | 9780000000202 |

## 3NF: store each entity’s details once

The entity keys determine their own descriptions. Related records keep foreign keys rather than repeating those descriptions.

## member

| member_id | full_name | email | joined_on | active |
| --- | --- | --- | --- | --- |
| 101 | Avery Chen | avery.chen@example.test | 2024-01-15 | true |
| 102 | Jordan Patel | jordan.patel@example.test | 2024-03-02 | true |

## book

| book_id | isbn | title | author | published_on |
| --- | --- | --- | --- | --- |
| 201 | 9780000000201 | The Quiet Archive | Morgan Lee | 2020-06-10 |
| 202 | 9780000000202 | Maps of Winter | Riley Hart | 2021-09-18 |

## loan

| loan_id | member_id | book_id | loan_date | due_date | returned_on |
| --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-02-01 | 2026-02-15 | NULL |
| 302 | 102 | 202 | 2026-02-03 | 2026-02-17 | 2026-02-12 |

## Dependencies

- member: (member_id) → full_name, email, joined_on, active
- book: (book_id) → isbn, title, author, published_on
- loan: (loan_id) → member_id, book_id, loan_date, due_date, returned_on

Joining the decomposed sample tables reproduces the original 2 example rows. The design assumes the declared keys describe the relevant business dependencies.
