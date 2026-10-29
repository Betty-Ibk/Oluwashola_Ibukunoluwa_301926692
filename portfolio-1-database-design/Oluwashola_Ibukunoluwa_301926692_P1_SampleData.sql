-- Fictional sample records for Library Management System.
BEGIN;
SET LOCAL standard_conforming_strings = on;
INSERT INTO portfolio."member" ("member_id", "full_name", "email", "joined_on", "active") VALUES (101, 'Avery Chen', 'avery.chen@example.test', '2024-01-15', TRUE);
INSERT INTO portfolio."member" ("member_id", "full_name", "email", "joined_on", "active") VALUES (102, 'Jordan Patel', 'jordan.patel@example.test', '2024-03-02', TRUE);
INSERT INTO portfolio."book" ("book_id", "isbn", "title", "author", "published_on") VALUES (201, '9780000000201', 'The Quiet Archive', 'Morgan Lee', '2020-06-10');
INSERT INTO portfolio."book" ("book_id", "isbn", "title", "author", "published_on") VALUES (202, '9780000000202', 'Maps of Winter', 'Riley Hart', '2021-09-18');
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "loan_date", "due_date", "returned_on") VALUES (301, 101, 201, '2026-02-01', '2026-02-15', NULL);
INSERT INTO portfolio."loan" ("loan_id", "member_id", "book_id", "loan_date", "due_date", "returned_on") VALUES (302, 102, 202, '2026-02-03', '2026-02-17', '2026-02-12');
COMMIT;
