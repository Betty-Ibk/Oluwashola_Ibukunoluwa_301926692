-- Show related loan, member records (up to 20).
SELECT t0."loan_id" AS "loan_loan_id",
       t0."loan_date" AS "loan_loan_date",
       t1."member_id" AS "member_member_id",
       t1."full_name" AS "member_full_name"
FROM portfolio."loan" t0
JOIN portfolio."member" t1 ON t0."member_id" = t1."member_id"
ORDER BY t0."loan_id", t1."member_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT t0."loan_id" AS "loan_loan_id",
       t0."loan_date" AS "loan_loan_date",
       t1."member_id" AS "member_member_id",
       t1."full_name" AS "member_full_name"
FROM portfolio."loan" t0
JOIN portfolio."member" t1 ON t0."member_id" = t1."member_id"
ORDER BY t0."loan_id", t1."member_id"
LIMIT 20;

-- Find loan records where loan_date matches "2026-02-01" (up to 20).
SELECT * FROM portfolio."loan"
WHERE "loan_date" IS NOT DISTINCT FROM '2026-02-01'
ORDER BY "loan_id"
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT * FROM portfolio."loan"
WHERE "loan_date" IS NOT DISTINCT FROM '2026-02-01'
ORDER BY "loan_id"
LIMIT 20;

-- Count loan records for each member_id (up to 20 groups).
SELECT "member_id", count(*) AS record_count
FROM portfolio."loan"
GROUP BY "member_id"
ORDER BY record_count DESC, "member_id" NULLS LAST
LIMIT 20;

EXPLAIN (ANALYZE, BUFFERS, FORMAT JSON)
SELECT "member_id", count(*) AS record_count
FROM portfolio."loan"
GROUP BY "member_id"
ORDER BY record_count DESC, "member_id" NULLS LAST
LIMIT 20;
