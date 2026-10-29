-- Run these deliberately invalid statements one at a time, outside a transaction.
-- Each should fail at the named constraint; the sample rows should remain unchanged.

-- 1. duplicate member pk. Expected: pk_member, SQLSTATE 23505.
INSERT INTO portfolio."member" ("member_id", "full_name", "email", "joined_on", "active")
VALUES (101, 'Casey Morgan', 'casey.morgan@example.test', '2026-04-01', TRUE);

-- 2. duplicate member email. Expected: uq_member_0, SQLSTATE 23505.
INSERT INTO portfolio."member" ("member_id", "full_name", "email", "joined_on", "active")
VALUES (901, 'Casey Morgan', 'avery.chen@example.test', '2026-04-01', TRUE);

-- 3. missing member name. Expected: full_name, SQLSTATE 23502.
INSERT INTO portfolio."member" ("member_id", "full_name", "email", "joined_on", "active")
VALUES (902, NULL, 'casey.morgan@example.test', '2026-04-01', TRUE);

-- 4. duplicate book pk. Expected: pk_book, SQLSTATE 23505.
INSERT INTO portfolio."book" ("book_id", "isbn", "title", "author", "published_on")
VALUES (201, '9780000000901', 'New Sample Book', 'Taylor Quinn', '2023-05-04');

-- 5. duplicate book isbn. Expected: uq_book_0, SQLSTATE 23505.
INSERT INTO portfolio."book" ("book_id", "isbn", "title", "author", "published_on")
VALUES (903, '9780000000201', 'New Sample Book', 'Taylor Quinn', '2023-05-04');

-- 6. duplicate loan pk. Expected: pk_loan, SQLSTATE 23505.
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "loan_date", "due_date", "returned_on")
VALUES (301, 102, 202, '2026-04-01', '2026-04-15', '2026-04-10');

-- 7. missing loan member. Expected: fk_loan_0, SQLSTATE 23503.
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "loan_date", "due_date", "returned_on")
VALUES (904, 99001, 202, '2026-04-01', '2026-04-15', '2026-04-10');

-- 8. missing loan book. Expected: fk_loan_1, SQLSTATE 23503.
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "loan_date", "due_date", "returned_on")
VALUES (905, 102, 99002, '2026-04-01', '2026-04-15', '2026-04-10');

-- 9. loan dates out of order. Expected: loan_date_order, SQLSTATE 23514.
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "loan_date", "due_date", "returned_on")
VALUES (906, 102, 202, '2026-04-15', '2026-04-14', '2026-04-10');

-- 10. duplicate open book loan. Expected: one_open_loan_per_book, SQLSTATE 23505.
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "loan_date", "due_date", "returned_on")
VALUES (907, 102, 201, '2026-04-01', '2026-04-15', NULL);
