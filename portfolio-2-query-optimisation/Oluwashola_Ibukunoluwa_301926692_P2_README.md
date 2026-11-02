# Library Management System — SQL queries

## 1. Show related loan, member records (up to 20).

```sql
SELECT t0."loan_id" AS "loan_loan_id",
       t0."loan_date" AS "loan_loan_date",
       t1."member_id" AS "member_member_id",
       t1."full_name" AS "member_full_name"
FROM portfolio."loan" t0
JOIN portfolio."member" t1 ON t0."member_id" = t1."member_id"
ORDER BY t0."loan_id", t1."member_id"
LIMIT 20;
```

| loan_loan_id | loan_loan_date | member_member_id | member_full_name |
| --- | --- | --- | --- |
| 301 | 2026-02-01 | 101 | Avery Chen |
| 302 | 2026-02-03 | 102 | Jordan Patel |

## 2. Find loan records where loan_date matches "2026-02-01" (up to 20).

```sql
SELECT * FROM portfolio."loan"
WHERE "loan_date" IS NOT DISTINCT FROM '2026-02-01'
ORDER BY "loan_id"
LIMIT 20;
```

| loan_id | member_id | book_id | loan_date | due_date | returned_on |
| --- | --- | --- | --- | --- | --- |
| 301 | 101 | 201 | 2026-02-01 | 2026-02-15 | NULL |

## 3. Count loan records for each member_id (up to 20 groups).

```sql
SELECT "member_id", count(*) AS record_count
FROM portfolio."loan"
GROUP BY "member_id"
ORDER BY record_count DESC, "member_id" NULLS LAST
LIMIT 20;
```

| member_id | record_count |
| --- | --- |
| 101 | 1 |
| 102 | 1 |


## Index comparison

| Phase | Median (ms) | Three runs (ms) | Plan nodes | Buffer hits |
| --- | --- | --- | --- | --- |
| Before index | 2.26 | 2.219, 2.276, 2.26 | Sort → Seq Scan | 274 |
| After index | 0.276 | 0.274, 0.306, 0.276 | Sort → Bitmap Heap Scan → Bitmap Index Scan | 55 |

The median execution time changed from 2.26 ms to 0.276 ms. The measured plan used p2_filter_idx. The results matched in both phases. An index adds storage and write-maintenance costs; timings depend on the selected lookup and environment.

## Execution plans

### Before index, run 1

```text
Sort (actual time=2.184..2.187 rows=50 loops=1)
  Seq Scan on loan (actual time=0.014..2.143 rows=50 loops=1)
Planning Time: 0.35 ms
Execution Time: 2.219 ms
```

### Before index, run 2

```text
Sort (actual time=2.246..2.248 rows=50 loops=1)
  Seq Scan on loan (actual time=0.037..2.206 rows=50 loops=1)
Planning Time: 0.324 ms
Execution Time: 2.276 ms
```

### Before index, run 3

```text
Sort (actual time=2.228..2.231 rows=50 loops=1)
  Seq Scan on loan (actual time=0.014..2.187 rows=50 loops=1)
Planning Time: 0.349 ms
Execution Time: 2.26 ms
```

### After index, run 1

```text
Sort (actual time=0.225..0.228 rows=50 loops=1)
  Bitmap Heap Scan on loan (actual time=0.028..0.187 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=50 loops=1)
Planning Time: 0.529 ms
Execution Time: 0.274 ms
```

### After index, run 2

```text
Sort (actual time=0.256..0.259 rows=50 loops=1)
  Bitmap Heap Scan on loan (actual time=0.056..0.218 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.039..0.04 rows=50 loops=1)
Planning Time: 0.523 ms
Execution Time: 0.306 ms
```

### After index, run 3

```text
Sort (actual time=0.226..0.228 rows=50 loops=1)
  Bitmap Heap Scan on loan (actual time=0.028..0.189 rows=50 loops=1)
    Bitmap Index Scan using p2_filter_idx (actual time=0.013..0.013 rows=50 loops=1)
Planning Time: 0.54 ms
Execution Time: 0.276 ms
```

## Reproduce

Use a fresh database with the Portfolio 1 schema and sample data. Run Oluwashola_Ibukunoluwa_301926692_P2_Queries.sql, then Oluwashola_Ibukunoluwa_301926692_P2_Optimisation.sql. The optimisation script creates a separate performance table and runs EXPLAIN (ANALYZE, BUFFERS).

[Query screenshot](screenshots/Oluwashola_Ibukunoluwa_301926692_P2_QueryResults.png) · [Index comparison](screenshots/Oluwashola_Ibukunoluwa_301926692_P2_IndexComparison.png)

## References

- [PostgreSQL — EXPLAIN](https://www.postgresql.org/docs/17/using-explain.html)

