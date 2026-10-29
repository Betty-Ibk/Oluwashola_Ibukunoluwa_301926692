-- Library Management System: tables, keys and business constraints.
-- Run once in a fresh PostgreSQL database.
BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA portfolio;
CREATE TABLE portfolio."member" (
  "member_id" bigint NOT NULL,
  "full_name" text NOT NULL,
  "email" text NOT NULL,
  "joined_on" date NOT NULL,
  "active" boolean NOT NULL,
  CONSTRAINT "pk_member" PRIMARY KEY ("member_id"),
  CONSTRAINT "uq_member_0" UNIQUE ("email")
);
CREATE TABLE portfolio."book" (
  "book_id" bigint NOT NULL,
  "isbn" text NOT NULL,
  "title" text NOT NULL,
  "author" text NOT NULL,
  "published_on" date,
  CONSTRAINT "pk_book" PRIMARY KEY ("book_id"),
  CONSTRAINT "uq_book_0" UNIQUE ("isbn")
);
CREATE TABLE portfolio."loan" (
  "loan_id" bigint NOT NULL,
  "member_id" bigint NOT NULL,
  "book_id" bigint NOT NULL,
  "loan_date" date NOT NULL,
  "due_date" date NOT NULL,
  "returned_on" date,
  CONSTRAINT "pk_loan" PRIMARY KEY ("loan_id")
);
ALTER TABLE portfolio."loan" ADD CONSTRAINT "fk_loan_0" FOREIGN KEY ("member_id") REFERENCES portfolio."member" ("member_id");
ALTER TABLE portfolio."loan" ADD CONSTRAINT "fk_loan_1" FOREIGN KEY ("book_id") REFERENCES portfolio."book" ("book_id");
ALTER TABLE portfolio."loan" ADD CONSTRAINT "loan_date_order" CHECK ("due_date" > "loan_date");
CREATE UNIQUE INDEX "one_open_loan_per_book" ON portfolio."loan" ("book_id") WHERE ("returned_on" IS NULL);
COMMIT;
