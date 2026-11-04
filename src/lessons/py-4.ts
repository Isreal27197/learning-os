import type { LessonContent } from '../curriculum/lessonTypes';

export const content: LessonContent = {
        difficulty: 'beginner',
        prerequisites: ['py-1', 'py-2', 'py-3'],
        learningObjectives: [
          'Explain how relational databases organize data into tables, rows and typed columns, and distinguish primary and foreign keys.',
          'Describe a schema and choose simple column types and constraints for a small dataset.',
          'Write SQLite SELECT queries with WHERE, comparison and Boolean operators, DISTINCT, ORDER BY and LIMIT.',
          'Summarize records with COUNT, SUM, AVG, MIN, MAX, GROUP BY and HAVING, and distinguish row filtering from group filtering.',
          'Use INSERT, UPDATE and DELETE carefully, checking the target rows and using a transaction or verified condition where appropriate.',
          'Combine related tables with INNER JOIN and LEFT JOIN, and use a basic subquery.',
          'Explain SQL NULL and test it with IS NULL or IS NOT NULL rather than equality.',
          'Connect to a local SQLite database using Python sqlite3, create tables, use parameterized queries, fetch results, commit changes, close connections and handle errors.',
          'Convert database rows into useful Python structures and inspect, validate, clean and transform small datasets.',
          'Describe how pandas can optionally consume query results without being required for database or SQL work.',
        ],
        keyConcepts: [
          'relational database',
          'table, row and column',
          'schema',
          'data type',
          'primary key',
          'foreign key',
          'SQLite',
          'server-based database',
          'query',
          'filter and sort',
          'aggregate function',
          'GROUP BY',
          'WHERE and HAVING',
          'NULL',
          'INNER JOIN',
          'LEFT JOIN',
          'subquery',
          'transaction',
          'parameterized query',
          'data validation',
          'duplicate record',
          'data cleaning',
        ],
        contentSections: [
          {
            title: '1. Relational databases give data a useful structure',
            content:
              'A database is an organized collection of data that can be stored, searched and updated. A relational database organizes much of that data into tables. A table has columns, which describe fields, and rows, each of which represents one record. For example, a study_sessions table might have columns for session_id, subject, studied_on and minutes. Keeping records in a consistent structure makes it easier to ask questions such as “How many minutes were studied for each subject?”\n\nA schema describes the tables, columns, data types and rules in a database. Types communicate what kind of value a column should hold and help prevent incompatible data. SQLite uses flexible storage rules compared with some server databases, but choosing clear types and validating values in the application still matters. Typical SQLite declarations include INTEGER, REAL, TEXT and BLOB; dates are commonly stored as ISO-8601 TEXT or as numeric values rather than a dedicated SQLite date storage class.\n\nA primary key uniquely identifies each row. A foreign key stores a reference to a related row in another table. For example, a subjects table might use subject_id as its primary key, while study_sessions.subject_id refers to it. Foreign keys help express relationships and can prevent references to nonexistent subjects when enforcement is enabled. Relational design reduces repeated facts and gives records stable identities; avoid using a subject name as a key if that name may later change.\n\nSQLite is an embedded database engine: a program can use a local database file without running a separate database server. Python includes the sqlite3 module, making SQLite useful for learning, prototypes, small utilities and local datasets. A server-based database such as PostgreSQL or MySQL is a separate service designed for situations such as multiple concurrent clients, network access, centralized administration or larger production workloads. SQL syntax and features overlap but differ between SQLite and other database engines; check the target database documentation when moving a query.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/py-4/relational-tables.svg',
                alt: 'Two relational tables show primary keys in the subject and session rows, with a foreign key linking each session to a subject.',
                caption:
                  'A session’s subject_id foreign key refers to the subject table’s primary key.',
                width: 1200,
                height: 620,
              },
            ],
            codeExamples: [
              {
                title: 'A small relational schema',
                language: 'sql',
                code: 'CREATE TABLE subjects (\n    subject_id INTEGER PRIMARY KEY,\n    name TEXT NOT NULL UNIQUE\n);\n\nCREATE TABLE study_sessions (\n    session_id INTEGER PRIMARY KEY,\n    subject_id INTEGER NOT NULL,\n    studied_on TEXT NOT NULL,\n    minutes INTEGER NOT NULL CHECK (minutes > 0),\n    FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)\n);',
                explanation:
                  'subjects stores each subject name once. study_sessions refers to a subject through subject_id rather than repeating a second subject record. The primary keys identify rows, NOT NULL requires values, UNIQUE prevents duplicate subject names, and CHECK rejects non-positive session minutes. SQLite foreign-key enforcement must be enabled for each connection with PRAGMA foreign_keys = ON.',
              },
            ],
          },
          {
            title: '2. Select, filter, sort and limit records',
            content:
              'SELECT asks a database to return data. Name only the columns you need instead of using SELECT * in routine analysis; this makes the output easier to read and avoids fetching irrelevant fields. WHERE filters individual rows. Comparison operators include =, != (or <>), <, <=, > and >=. Combine conditions with AND, OR and NOT, using parentheses when they make the intended logic clearer.\n\nORDER BY sorts returned rows; specify ASC or DESC so the direction is clear. LIMIT caps the number of rows returned, which is useful when exploring a table. Without ORDER BY, row order is not guaranteed—even if repeated tests happen to show the same order. DISTINCT removes duplicate result rows for the selected expression or set of expressions. It does not change or deduplicate records in the table.\n\nSQL is commonly described using a logical processing order: FROM and joins identify source rows, WHERE filters rows, GROUP BY forms groups, HAVING filters groups, SELECT determines output expressions, DISTINCT removes duplicate result rows, ORDER BY sorts the output, and LIMIT restricts the result. This is a useful reasoning model; it is not a requirement that the database physically execute each operation in exactly that sequence. For example, a SELECT alias usually cannot be used in WHERE because WHERE is logically evaluated before the SELECT list is formed.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/py-4/sql-processing-order.svg',
                alt: 'A diagram contrasts SQL written order, starting with SELECT and FROM, with logical processing order from FROM through WHERE, GROUP BY, HAVING, SELECT, ORDER BY and LIMIT.',
                caption:
                  'SQL is written with SELECT first, but its logical processing begins with the source rows in FROM.',
                width: 1200,
                height: 700,
              },
            ],
            codeExamples: [
              {
                title: 'Filter and sort recent longer sessions',
                language: 'sql',
                code: "SELECT studied_on, subject, minutes\nFROM study_sessions\nWHERE minutes >= 30 AND subject != 'Break'\nORDER BY studied_on DESC, minutes DESC\nLIMIT 5;",
                explanation:
                  'The WHERE conditions keep rows that satisfy both rules. ORDER BY uses a deterministic tie-breaker, and LIMIT returns at most five of those rows. This assumes a study_sessions table that has subject as TEXT; the normalized two-table design in the previous section instead needs a JOIN to read a subject name.',
              },
              {
                title: 'List distinct subjects',
                language: 'sql',
                code: 'SELECT DISTINCT subject\nFROM study_sessions\nORDER BY subject ASC;',
                explanation:
                  'DISTINCT returns each different subject value once in the result. It does not remove any session records from the table.',
              },
            ],
          },
          {
            title: '3. Summarize records with aggregates',
            content:
              'Aggregate functions calculate a summary over rows. COUNT(*) counts rows. COUNT(column) counts rows where that column is not NULL. SUM adds numeric values, AVG calculates their mean, and MIN and MAX find the smallest and largest values. An aggregate without GROUP BY summarizes the whole filtered set as one result row.\n\nGROUP BY partitions rows into groups that share the same grouping values, then calculates aggregates for each group. For example, grouping study sessions by subject can produce a total and average for every subject. Each selected expression should either be aggregated or included in the grouping, especially for portable, unambiguous SQL; SQLite may accept some ambiguous grouped queries that other databases reject.\n\nWHERE filters input rows before grouping. HAVING filters the groups after aggregation. Use WHERE for a condition about an individual record, such as minutes >= 10; use HAVING for a condition about a calculated group, such as SUM(minutes) >= 60. You can use both: first exclude short individual rows with WHERE, then keep only subjects whose remaining total reaches a threshold with HAVING. Remember that filtering before aggregation changes which rows contribute to each total.',
            codeExamples: [
              {
                title: 'Summarize study time by subject',
                language: 'sql',
                code: "SELECT subject,\n       COUNT(*) AS session_count,\n       SUM(minutes) AS total_minutes,\n       AVG(minutes) AS average_minutes,\n       MIN(minutes) AS shortest_session,\n       MAX(minutes) AS longest_session\nFROM study_sessions\nWHERE studied_on >= '2026-01-01'\nGROUP BY subject\nHAVING SUM(minutes) >= 60\nORDER BY total_minutes DESC;",
                explanation:
                  'WHERE first excludes rows before the date. GROUP BY forms one group per subject; the aggregates summarize each group. HAVING then keeps groups with at least 60 minutes in the filtered period. The alias total_minutes is used for sorting the final output.',
              },
              {
                title: 'Compare row and group conditions',
                language: 'sql',
                code: 'SELECT subject, SUM(minutes) AS total_minutes\nFROM study_sessions\nWHERE minutes >= 10\nGROUP BY subject\nHAVING COUNT(*) >= 2;',
                explanation:
                  'WHERE removes sessions shorter than 10 minutes before totals are calculated. HAVING keeps subjects with at least two remaining sessions. These clauses answer different questions and are not interchangeable.',
              },
            ],
          },
          {
            title: '4. Change data deliberately and understand NULL',
            content:
              'INSERT adds rows. UPDATE changes values in existing rows. DELETE removes rows. Always inspect the target before a destructive change. A SELECT with the same WHERE condition can help preview which rows an UPDATE or DELETE would affect. Without a WHERE clause, UPDATE changes every row in the table and DELETE removes every row; use that behavior only when it is explicitly intended. Primary keys make precise updates and deletes easier. For multi-step changes, a transaction lets the application commit the complete operation or roll it back if something fails.\n\nNULL means a value is missing, unknown or not supplied. It is not zero, an empty string, or the text "NULL". Comparisons such as value = NULL do not test for missing data; use IS NULL or IS NOT NULL. Most aggregate functions ignore NULL values in the aggregated column; COUNT(*) still counts rows, while COUNT(column) does not count rows where that column is NULL. Decide whether missing data should remain unknown, receive a domain-appropriate value, or be excluded, and document that decision rather than silently treating missing numbers as zero.',
            codeExamples: [
              {
                title: 'Insert and inspect records',
                language: 'sql',
                code: "INSERT INTO study_sessions (subject, studied_on, minutes)\nVALUES ('Linear algebra', '2026-10-12', 25);\n\nSELECT subject, studied_on, minutes\nFROM study_sessions\nWHERE subject = 'Linear algebra'\nORDER BY studied_on DESC;",
                explanation:
                  'The INSERT names the destination columns so the value-to-column mapping is clear. The follow-up SELECT verifies the record. When values come from Python or a user, pass them as SQL parameters rather than putting them into the SQL text.',
              },
              {
                title: 'Update one checked row, then test for missing values',
                language: 'sql',
                code: 'SELECT session_id, minutes\nFROM study_sessions\nWHERE session_id = 7;\n\nUPDATE study_sessions\nSET minutes = 30\nWHERE session_id = 7;\n\nSELECT session_id, studied_on\nFROM study_sessions\nWHERE reflection IS NULL;',
                explanation:
                  'The first query previews the row identified by its key. The UPDATE has a narrow primary-key condition. The last query uses IS NULL to find missing reflections; equality to NULL would not work.',
              },
            ],
          },
          {
            title: '5. Relate tables with joins and subqueries',
            content:
              'A JOIN combines rows from related tables using a relationship condition. INNER JOIN returns matching pairs: if no related row exists, it is omitted. LEFT JOIN keeps every row from the left table and fills right-side columns with NULL when there is no match. Use qualified column names such as subjects.subject_id when both tables have a column with the same name.\n\nA subquery is a query nested inside another query. It can provide a value or set of values for the outer query. For example, compare each session to the average session length with a scalar subquery. Start with a clear inner query and check what shape it returns: a single value, one column, or multiple columns. Use IN for a set of values. Subqueries and joins are different tools; choose the one that best expresses the relationship and make sure the result remains understandable.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/py-4/join-comparison.svg',
                alt: 'Two small tables compare joins: INNER JOIN returns only matching subject-session rows, while LEFT JOIN retains all subjects and shows NULL for a subject without a session.',
                caption:
                  'INNER JOIN keeps matched pairs; LEFT JOIN keeps every row from the left-hand subjects table.',
                width: 1200,
                height: 650,
              },
            ],
            codeExamples: [
              {
                title: 'Join sessions to their subject names',
                language: 'sql',
                code: 'SELECT study_sessions.studied_on,\n       subjects.name AS subject,\n       study_sessions.minutes\nFROM study_sessions\nINNER JOIN subjects\n    ON study_sessions.subject_id = subjects.subject_id\nORDER BY study_sessions.studied_on DESC;',
                explanation:
                  'The join condition matches each session’s foreign key to the subject primary key. INNER JOIN includes only sessions that have a matching subject row.',
              },
              {
                title: 'Keep subjects even when they have no sessions',
                language: 'sql',
                code: 'SELECT subjects.name,\n       COUNT(study_sessions.session_id) AS session_count\nFROM subjects\nLEFT JOIN study_sessions\n    ON subjects.subject_id = study_sessions.subject_id\nGROUP BY subjects.subject_id, subjects.name\nORDER BY subjects.name;',
                explanation:
                  'LEFT JOIN retains every subject. A subject without sessions has NULL session columns; COUNT(session_id) is zero for that subject, unlike COUNT(*), which would count the retained joined row.',
              },
              {
                title: 'Compare a session with the overall average',
                language: 'sql',
                code: 'SELECT session_id, subject, minutes\nFROM study_sessions\nWHERE minutes > (\n    SELECT AVG(minutes)\n    FROM study_sessions\n)\nORDER BY minutes DESC;',
                explanation:
                  'The inner query returns one average value. The outer query returns sessions whose duration is greater than that value. If there are no non-NULL minute values, AVG returns NULL and the comparison matches no rows.',
              },
            ],
          },
          {
            title: '6. Use Python sqlite3 and parameterized queries',
            content:
              'Python’s sqlite3 module is included in the standard library, so a beginner can create and query a local SQLite database without installing a package. sqlite3.connect("study.db") opens or creates a database file; the special name ":memory:" creates a temporary database that disappears when the connection closes. A connection owns the interaction with the database, and a cursor executes SQL and fetches results.\n\nUse placeholders for values supplied by the program or a person. With sqlite3, the common qmark style uses ? placeholders and a tuple of values. Never build SQL by interpolating input with f-strings, concatenation or format: a value containing quotes can change the meaning of the query and create SQL injection. Placeholders bind values, not table or column names; if a program must choose a SQL identifier, select it from a fixed allowlist rather than accepting arbitrary input.\n\nA simple lifecycle is connect, execute, fetch if querying, commit intended changes, and close. A with connection block manages the transaction boundary: on successful exit it commits; on an exception it rolls back. The connection should still be closed, for example with contextlib.closing, or explicitly in a finally block. Use try/except sqlite3.Error around operations when you can report or recover from expected database failures. Do not swallow the exception and claim a write succeeded. SQLite foreign-key checks are connection-specific, so enable them with PRAGMA foreign_keys = ON when the schema relies on them.\n\nThe connection’s row_factory can be set to sqlite3.Row so fetched records support column-name access as well as positional indexing. fetchall returns a list; for large query results, iterate over the cursor rather than loading everything into memory. For this introduction, use small datasets and inspect what the query actually returned.',
            codeExamples: [
              {
                title: 'Create a table and insert values safely',
                language: 'python',
                code: 'import sqlite3\nfrom contextlib import closing\n\nwith closing(sqlite3.connect("study.db")) as connection, connection:\n    connection.execute(\n        """\n        CREATE TABLE IF NOT EXISTS study_sessions (\n            session_id INTEGER PRIMARY KEY,\n            subject TEXT NOT NULL,\n            studied_on TEXT NOT NULL,\n            minutes INTEGER NOT NULL CHECK (minutes > 0)\n        )\n        """\n    )\n    connection.execute(\n        "INSERT INTO study_sessions (subject, studied_on, minutes) VALUES (?, ?, ?)",\n        ("Statistics", "2026-10-12", 25),\n    )',
                explanation:
                  'The question marks are bound to values by sqlite3, rather than pasted into SQL source. The connection context commits successful changes or rolls back if the block raises. In a rerunnable real program, avoid inserting the same sample row every time; use a deliberate uniqueness rule or check for existing data.',
              },
              {
                title: 'Fetch records and handle a database error',
                language: 'python',
                code: 'import sqlite3\nfrom contextlib import closing\n\ntry:\n    with closing(sqlite3.connect("study.db")) as connection, connection:\n        connection.row_factory = sqlite3.Row\n        rows = connection.execute(\n            "SELECT subject, minutes FROM study_sessions WHERE minutes >= ?",\n            (20,),\n        ).fetchall()\n        for row in rows:\n            print(row["subject"], row["minutes"])\nexcept sqlite3.Error as error:\n    print(f"Database operation failed: {error}")',
                explanation:
                  'The parameter is passed separately from the query. sqlite3.Row allows field access by name. Errors are reported as failures instead of being mistaken for an empty successful result. A connection used as a context manager commits or rolls back, but does not itself close; sqlite3 connection cleanup occurs when the connection is closed, so a longer-lived application should explicitly close it or use contextlib.closing.',
              },
              {
                title: 'Update and delete records using key parameters',
                language: 'python',
                code: 'import sqlite3\nfrom contextlib import closing\n\nwith closing(sqlite3.connect("study.db")) as connection, connection:\n    cursor = connection.execute(\n        "UPDATE study_sessions SET minutes = ? WHERE session_id = ?",\n        (30, 1),\n    )\n    if cursor.rowcount != 1:\n        raise ValueError("Expected to update exactly one session")\n\n    # Use a separately reviewed key for a deliberate deletion.\n    connection.execute(\n        "DELETE FROM study_sessions WHERE session_id = ?",\n        (99,),\n    )',
                explanation:
                  'Both the new value and identifying key are parameters. Checking rowcount helps detect a key that matched no row or more rows than expected. A DELETE can still remove a valid record, so preview the row with SELECT and require explicit user intent before offering deletion.',
              },
            ],
          },
          {
            title: '7. Inspect and prepare data for analysis',
            content:
              'A query result is not automatically a clean dataset. First inspect its shape and a few representative values: how many rows arrived, what columns exist, which values look missing, and whether numbers and dates have the expected forms. SQLite query results arrive as Python values. Convert them into dictionaries or another structure only when it helps the next step; do not throw away column names or silently change types.\n\nValidate at system boundaries. For example, minutes should be an integer greater than zero, a subject should not be blank, and a date should follow an agreed format such as YYYY-MM-DD. A database CHECK or NOT NULL constraint can enforce some rules, while Python validation can provide a clearer message before attempting an insert. SQLite can store different kinds of values flexibly, so do not assume that every existing row is clean just because a column was declared INTEGER.\n\nMissing values need an explicit policy. SQLite NULL becomes Python None. Do not turn None into zero unless zero is what the field means; a missing study duration is not necessarily a zero-minute session. Empty strings are present text values, not SQL NULL. Duplicate records can result from rerunning an import or accepting the same event twice. Decide what defines a duplicate, such as a unique external identifier or a combination of subject, date and source. Inspect duplicates before removing them; two sessions with the same subject and date may both be legitimate.\n\nCleaning is a sequence of deliberate transformations: inspect input, validate assumptions, handle missing and duplicate values according to a documented rule, then keep the raw source available when possible. This is especially important in data science and ML. A model pipeline depends on reproducible data selection and transformations; accidental duplicate rows, inconsistent units or silently replaced missing values can distort statistics and evaluation.\n\npandas is an optional Python library for tabular data analysis. A workflow may use SQL to select and aggregate the relevant records, then pass the fetched rows into a pandas DataFrame for further exploration. It is not required for learning SQL, understanding database integrity, or using the built-in sqlite3 module. Avoid loading an entire large database into memory when a query can select only the needed rows and columns.',
            codeExamples: [
              {
                title: 'Inspect SQLite rows as named Python values',
                language: 'python',
                code: 'rows = [\n    {"subject": "Statistics", "minutes": 25},\n    {"subject": "Python", "minutes": 40},\n]\n\nprint("records:", len(rows))\nfor row in rows:\n    print(row["subject"], type(row["minutes"]).__name__, row["minutes"])',
                explanation:
                  'This small in-memory example shows basic inspection without requiring pandas. A sqlite3.Row can similarly be read by column name. Check counts, field names and types before calculating summaries.',
              },
              {
                title: 'Treat missing, blank and invalid values deliberately',
                language: 'python',
                code: 'minutes_value = None  # SQLite NULL becomes Python None\nsubject_value = "   "\n\nif minutes_value is None:\n    print("Duration is missing; choose a policy.")\nelif not isinstance(minutes_value, int) or minutes_value <= 0:\n    print("Duration must be a positive whole number.")\n\nif not subject_value.strip():\n    print("Subject cannot be blank.")',
                explanation:
                  'None represents a missing value; whitespace-only text is a present string that fails the subject validation. Do not replace missing values with zero without a domain reason.',
              },
            ],
          },
        ],
        workedExamples: [
          {
            title: 'Example 1: Choose a relational design',
            problem:
              'A study tracker records several sessions for the same subject. How can it avoid repeating the subject name as a separate entity on every row?',
            reasoning:
              'Give each subject a primary key and store that key as a foreign key in each session. Keep session-specific facts in the session table.',
            solution:
              'subjects(subject_id PRIMARY KEY, name UNIQUE)\nstudy_sessions(session_id PRIMARY KEY, subject_id REFERENCES subjects, studied_on, minutes)',
            explanation:
              'A subject can have many sessions, while each session refers to one subject. The keys express that one-to-many relationship and make subject names easier to update consistently.',
          },
          {
            title: 'Example 2: Filter then order a query',
            problem: 'Return at most three sessions of 20 minutes or more, newest date first.',
            reasoning:
              'Filter individual rows with WHERE, order the results by date descending, then limit the output. Add a tie-breaker for predictable ordering on the same date.',
            solution:
              'SELECT studied_on, subject, minutes\nFROM study_sessions\nWHERE minutes >= 20\nORDER BY studied_on DESC, session_id DESC\nLIMIT 3;',
            explanation:
              'WHERE determines which rows qualify; ORDER BY determines their result order; LIMIT caps the returned rows. Without ORDER BY, LIMIT does not guarantee which rows are returned.',
          },
          {
            title: 'Example 3: Count and total by subject',
            problem:
              'Count sessions and calculate study minutes for each subject, but show only subjects with at least two sessions.',
            reasoning:
              'Group by subject, calculate the row count and total, then use HAVING for the group-level count condition.',
            solution:
              'SELECT subject, COUNT(*) AS sessions, SUM(minutes) AS total_minutes\nFROM study_sessions\nGROUP BY subject\nHAVING COUNT(*) >= 2\nORDER BY total_minutes DESC;',
            explanation:
              'The aggregate values are calculated per subject. HAVING filters completed groups; WHERE would filter source session rows before the grouping.',
          },
          {
            title: 'Example 4: Find records with unknown values',
            problem: 'Find study sessions that do not yet have a reflection.',
            reasoning:
              'SQL NULL represents an unknown or missing value. Use the dedicated NULL predicate rather than comparing with an equals sign.',
            solution: 'SELECT session_id, subject\nFROM study_sessions\nWHERE reflection IS NULL;',
            explanation:
              'IS NULL matches missing reflection values. reflection = NULL does not evaluate as a true match. An empty string is different and would require a separate condition.',
          },
          {
            title: 'Example 5: Keep subjects with no sessions',
            problem:
              'List every subject and its number of recorded sessions, including subjects not studied yet.',
            reasoning:
              'Start from subjects and use LEFT JOIN so each subject remains in the output. Count a non-nullable session key rather than counting the joined row.',
            solution:
              'SELECT subjects.name, COUNT(study_sessions.session_id) AS sessions\nFROM subjects\nLEFT JOIN study_sessions\n    ON subjects.subject_id = study_sessions.subject_id\nGROUP BY subjects.subject_id, subjects.name\nORDER BY subjects.name;',
            explanation:
              'An unmatched session side has NULL columns, so COUNT(session_id) is zero for an unstudied subject. INNER JOIN would omit that subject.',
          },
          {
            title: 'Example 6: Insert user input safely with Python',
            problem: 'Save a subject name and a duration entered by a user into SQLite.',
            reasoning:
              'Validate input as Python values, then bind them to placeholders. Never embed supplied text directly into the SQL string.',
            solution:
              'subject = input("Subject: ").strip()\nminutes = int(input("Minutes: "))\nconnection.execute(\n    "INSERT INTO study_sessions (subject, studied_on, minutes) VALUES (?, ?, ?)",\n    (subject, studied_on, minutes),\n)',
            explanation:
              'The tuple values are bound separately from the SQL syntax, which prevents a subject containing quotation marks from changing the query. A complete program should also validate non-empty subject, valid date and positive minutes, then commit the transaction.',
          },
        ],
        commonMistakes: [
          {
            title: 'Using SELECT * and assuming a stable row order',
            explanation:
              'SELECT * returns every column and may fetch more data than needed. Database results are not guaranteed to be ordered unless ORDER BY is specified. Select the fields you need and state the desired order explicitly.',
          },
          {
            title: 'Putting an aggregate condition in WHERE',
            explanation:
              'WHERE filters individual source rows before grouping. HAVING filters groups after aggregates are calculated. Use WHERE minutes >= 10 for a row condition and HAVING SUM(minutes) >= 60 for a group total.',
            incorrectCode:
              'SELECT subject, SUM(minutes)\nFROM study_sessions\nWHERE SUM(minutes) >= 60\nGROUP BY subject;',
            correctedCode:
              'SELECT subject, SUM(minutes) AS total_minutes\nFROM study_sessions\nGROUP BY subject\nHAVING SUM(minutes) >= 60;',
          },
          {
            title: 'Treating NULL like zero or an empty string',
            explanation:
              'NULL means missing or unknown, not zero and not empty text. Use IS NULL and IS NOT NULL. Decide explicitly how missing values should affect averages, summaries and later model inputs.',
            incorrectCode: 'WHERE reflection = NULL',
            correctedCode: 'WHERE reflection IS NULL',
          },
          {
            title: 'Updating or deleting every row by accident',
            explanation:
              'An UPDATE or DELETE without WHERE applies to every row. First run a SELECT with the intended condition and inspect the rows; use a primary-key condition where possible. Back up important data and keep destructive operations inside a deliberate transaction.',
            incorrectCode: 'DELETE FROM study_sessions;',
            correctedCode:
              'SELECT session_id, subject FROM study_sessions WHERE session_id = ?;\n-- After confirming the intended key:\nDELETE FROM study_sessions WHERE session_id = ?;',
          },
          {
            title: 'Building SQL with f-strings or concatenation',
            explanation:
              'Interpolating user-supplied values into SQL can break quoting and enable SQL injection. Use sqlite3 placeholders for values. Identifiers cannot be supplied by value placeholders; choose an identifier from a fixed allowlist when needed.',
            incorrectCode: 'sql = f"SELECT * FROM study_sessions WHERE subject = \'{subject}\'"',
            correctedCode:
              'cursor = connection.execute(\n    "SELECT subject, minutes FROM study_sessions WHERE subject = ?",\n    (subject,),\n)',
          },
          {
            title: 'Assuming a SQLite connection context manager closes it',
            explanation:
              'A sqlite3 connection context manager commits on successful exit or rolls back on error, but it does not itself close the connection. For short examples, explicitly close the connection in a finally block or combine contextlib.closing with the connection transaction context.',
          },
          {
            title: 'Confusing INNER JOIN and LEFT JOIN counts',
            explanation:
              'INNER JOIN drops left-side rows with no match; LEFT JOIN keeps them with NULLs on the right. With LEFT JOIN, COUNT(*) can count the retained joined row even when no session exists. Count a non-nullable right-side key to obtain zero.',
          },
          {
            title: 'Assuming declared types guarantee clean SQLite data',
            explanation:
              'SQLite uses flexible typing. Use NOT NULL, CHECK, UNIQUE and foreign keys where appropriate, and validate data in Python at input boundaries. Inspect imported or legacy data instead of assuming every value follows the intended type.',
          },
          {
            title: 'Assuming SQL is identical across database engines',
            explanation:
              'SQLite, PostgreSQL and MySQL share many SQL ideas but differ in data types, functions, constraints and behavior. This lesson uses SQLite syntax; consult the target engine documentation before copying queries into a different system.',
          },
        ],
        resources: [
          {
            id: 'py-4-resource-sqlite-tutorial',
            title: 'SQLite: SQL Language',
            url: 'https://www.sqlite.org/lang.html',
            type: 'documentation',
            explanation:
              'Official SQLite reference for statements, expressions, SELECT queries and SQL behavior.',
          },
          {
            id: 'py-4-resource-sqlite-datatype',
            title: 'SQLite: Datatypes in SQLite',
            url: 'https://www.sqlite.org/datatype3.html',
            type: 'documentation',
            explanation:
              'Official explanation of SQLite storage classes, type affinity and flexible typing.',
          },
          {
            id: 'py-4-resource-sqlite-foreign-keys',
            title: 'SQLite: Foreign Key Support',
            url: 'https://www.sqlite.org/foreignkeys.html',
            type: 'documentation',
            explanation:
              'Describes foreign-key constraints and enabling enforcement on connections.',
          },
          {
            id: 'py-4-resource-python-sqlite',
            title: 'Python documentation: sqlite3',
            url: 'https://docs.python.org/3/library/sqlite3.html',
            type: 'documentation',
            explanation:
              'Official standard-library documentation for SQLite connections, cursors, parameters and transactions.',
          },
          {
            id: 'py-4-resource-sqlite-injection',
            title: 'Python sqlite3: How to use placeholders to bind values',
            url: 'https://docs.python.org/3/library/sqlite3.html#how-to-use-placeholders-to-bind-values-in-sql-queries',
            type: 'documentation',
            explanation:
              'Official guidance on binding values rather than interpolating them into SQL strings.',
          },
          {
            id: 'py-4-resource-pandas-sql',
            title: 'pandas: SQL queries',
            url: 'https://pandas.pydata.org/docs/user_guide/io.html#sql-queries',
            type: 'documentation',
            explanation:
              'Optional follow-up showing how pandas can read query results for tabular analysis.',
          },
        ],
        exercises: [
          {
            id: 'py-4-exercise-schema',
            title: '1. Sketch a study-record schema',
            instructions:
              'On paper or in a note, design a table for study sessions with a unique row identifier, subject, date, minutes and an optional reflection. Choose SQLite-compatible types and decide which fields are required. Add a second subjects table and explain which key would relate it to sessions. Do not write application code yet.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'A clearly identified primary key and sensible field types.',
              'An explanation of the relationship between subjects and sessions.',
            ],
            acceptanceCriteria: [
              'Distinguish a table, row, column and schema.',
              'Choose a key that identifies each session independently.',
              'Explain how the optional reflection differs from zero or empty text.',
            ],
          },
          {
            id: 'py-4-exercise-select-filter',
            title: '2. Select and filter session rows',
            instructions:
              'Using a scratch table with a few records, write a SELECT that returns only subject, studied_on and minutes for sessions of at least 20 minutes. Add a second condition to exclude one named subject. Write another query that selects sessions in a chosen date range using comparison operators.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Queries return only the requested columns and matching records.',
              'AND and comparison operators express the intended row filters.',
            ],
            acceptanceCriteria: [
              'Use explicit column names rather than SELECT *.',
              'Use WHERE for row-level conditions.',
              'Use date strings in one consistent sortable format such as YYYY-MM-DD.',
            ],
          },
          {
            id: 'py-4-exercise-sort-distinct',
            title: '3. Sort, limit and find distinct values',
            instructions:
              'Write one query that lists distinct subject names alphabetically. Write another that returns the five most recent sessions, ordered by date descending and with a stable tie-breaker such as session_id. Explain why LIMIT without ORDER BY may return an unpredictable subset.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The distinct subject list contains no repeated result values.',
              'The limited session query has an explicit, deterministic order.',
            ],
            acceptanceCriteria: [
              'Use DISTINCT for the subject result.',
              'Use ORDER BY before LIMIT.',
              'Include a tie-breaker for records sharing the same date.',
            ],
          },
          {
            id: 'py-4-exercise-aggregates',
            title: '4. Calculate study-time summaries',
            instructions:
              'For a table with subject and minutes columns, write a whole-table query using COUNT, SUM, AVG, MIN and MAX. Then group by subject and return count and total minutes per subject. Use small hand-checkable values to verify at least one result.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Aggregate values match a hand-calculated check.',
              'Grouped output has one result row per subject.',
            ],
            acceptanceCriteria: [
              'Use COUNT(*) to count rows and SUM/AVG/MIN/MAX for numeric summaries.',
              'Include subject in GROUP BY.',
              'Explain what happens to NULL values in COUNT(column) and AVG(column).',
            ],
          },
          {
            id: 'py-4-exercise-where-having',
            title: '5. Distinguish WHERE from HAVING',
            instructions:
              'Write a grouped query that first excludes sessions shorter than 10 minutes, then returns only subjects with at least two remaining sessions and at least 60 total minutes. Label which condition belongs in WHERE and which belong in HAVING, and explain why.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Row-level filtering occurs before grouping.',
              'Group-level count and total conditions filter aggregate results.',
            ],
            acceptanceCriteria: [
              'Use WHERE for minutes >= 10.',
              'Use HAVING for COUNT(*) and SUM(minutes) conditions.',
              'Group by subject and make output columns unambiguous.',
            ],
          },
          {
            id: 'py-4-exercise-null',
            title: '6. Find and reason about missing values',
            instructions:
              'Add a nullable reflection column to a scratch table or use an existing nullable field. Write queries to find rows where it is NULL and where it is not NULL. Include one row with an empty string and explain why it differs from NULL. Decide how missing reflections should appear in a report.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'NULL and empty text are distinguished correctly.',
              'Missing-value handling is stated as an intentional policy.',
            ],
            acceptanceCriteria: [
              'Use IS NULL and IS NOT NULL.',
              'Do not substitute zero for missing data without a domain reason.',
              'Explain that equality with NULL is not the correct test.',
            ],
          },
          {
            id: 'py-4-exercise-joins',
            title: '7. Join subjects and sessions',
            instructions:
              'Create a subjects table and a study_sessions table linked by a subject key. Insert two subjects, but give one no sessions. Query sessions with subject names using INNER JOIN, then list every subject with a session count using LEFT JOIN. Explain the difference in the two result sets.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'INNER JOIN returns matching sessions.',
              'LEFT JOIN includes the subject with zero sessions.',
            ],
            acceptanceCriteria: [
              'Join using the foreign-key/primary-key relationship.',
              'Qualify columns when names could be ambiguous.',
              'For the LEFT JOIN count, count a nullable right-side session key rather than COUNT(*).',
            ],
          },
          {
            id: 'py-4-exercise-subquery',
            title: '8. Compare sessions with a subquery',
            instructions:
              'Write a query that returns sessions whose minutes are above the average session length. First write and inspect the inner AVG query on its own. Then place it in a scalar subquery and order the matching sessions by minutes descending. Explain what happens if there are no non-NULL durations.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'The subquery returns one aggregate value for the outer comparison.',
              'Returned sessions are above the data-derived average.',
            ],
            acceptanceCriteria: [
              'Use a scalar subquery that returns one value.',
              'Use ORDER BY for the output order.',
              'Recognize that AVG over no non-NULL values is NULL.',
            ],
          },
          {
            id: 'py-4-exercise-python-sqlite',
            title: '9. Insert and read SQLite records from Python',
            instructions:
              'Write a small Python script using the built-in sqlite3 module. Connect to a scratch database, create a table if needed, insert two records using ? placeholders, query selected columns, fetch the rows and print them. Use a connection context manager for transaction behavior and explicitly close the connection. Do not use f-strings or concatenation to build SQL values.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'The script creates or reuses its local database and returns the inserted values.',
              'User or program values are bound separately from SQL text.',
            ],
            acceptanceCriteria: [
              'Use sqlite3.connect and execute with placeholders plus a value tuple.',
              'Fetch query rows and preserve their column meaning.',
              'Commit successful changes and close the connection.',
              'Report sqlite3.Error without pretending the operation succeeded.',
            ],
            constraints: ['Use only the Python standard library.'],
          },
          {
            id: 'py-4-exercise-safe-update-cleaning',
            title: '10. Validate and safely update a record',
            instructions:
              'Extend the script to accept a subject and positive whole-number duration, rejecting a blank subject, invalid integer and non-positive value before saving. Add a safe UPDATE by primary key using parameters, preview the selected row before updating, and check rowcount afterward. Inspect a few results for unexpected types, blanks, NULLs or duplicates and write down a cleaning rule for each issue found.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'Invalid input does not result in a misleading successful database write.',
              'The intended record changes while unrelated rows remain unchanged.',
              'Data-quality checks have explicit, explainable policies.',
            ],
            acceptanceCriteria: [
              'Validate inputs before executing writes.',
              'Use placeholders for both new values and the key.',
              'Preview by key and check the number of rows affected.',
              'Do not convert missing values to zero or delete duplicates without verifying what defines a duplicate.',
            ],
          },
        ],
        assessmentQuestions: [
          {
            id: 'py-4-check-relational',
            prompt:
              'What does a primary key do? How does a foreign key relate one table to another?',
            expectedAnswer:
              'A primary key uniquely identifies a row in its table. A foreign key stores a value that refers to a key in another table, expressing a relationship and potentially enforcing that the referenced row exists.',
            explanation:
              'Keys let data remain related without relying on repeated, potentially changing descriptive text.',
          },
          {
            id: 'py-4-check-select',
            prompt: 'Why should a query that uses LIMIT usually include ORDER BY?',
            expectedAnswer:
              'Without ORDER BY, a database does not guarantee row order, so LIMIT may select an unpredictable subset. ORDER BY states which rows should come first.',
            explanation:
              'Deterministic ordering is important for repeatable inspection and analysis.',
          },
          {
            id: 'py-4-check-where-having',
            prompt:
              'In a grouped query, where should you put “minutes >= 10” and where should you put “SUM(minutes) >= 60”? Explain.',
            expectedAnswer:
              'Put minutes >= 10 in WHERE because it filters individual rows before grouping. Put SUM(minutes) >= 60 in HAVING because it filters groups after aggregation.',
            explanation:
              'Filtering input rows changes which records contribute to the aggregate; HAVING evaluates a condition on each completed group.',
          },
          {
            id: 'py-4-check-null',
            prompt: 'Is NULL the same as 0 or an empty string? How do you find NULL values?',
            expectedAnswer:
              'No. NULL means a value is missing or unknown; zero is a numeric value and an empty string is present text. Use IS NULL or IS NOT NULL to test it.',
            explanation:
              'SQL uses three-valued logic for unknown values, so equality comparisons with NULL do not behave like ordinary value comparisons.',
          },
          {
            id: 'py-4-check-joins',
            prompt: 'What is the result difference between INNER JOIN and LEFT JOIN?',
            expectedAnswer:
              'INNER JOIN returns rows with matching records on both sides. LEFT JOIN keeps every row from the left table and supplies NULLs for right-side columns when no match exists.',
            explanation:
              'Choose the join based on whether unmatched left-side records should be retained.',
          },
          {
            id: 'py-4-check-parameters',
            prompt:
              'Why should Python pass user values through sqlite3 placeholders rather than inserting them into an SQL string with an f-string?',
            expectedAnswer:
              'Placeholders bind values separately from SQL syntax, safely handling quotes and preventing user input from changing the query structure or becoming SQL injection.',
            explanation:
              'Parameterization is the standard way to pass data values into SQL. It also avoids manual quoting and conversion mistakes.',
          },
          {
            id: 'py-4-check-transaction',
            prompt:
              'What does committing a database transaction do? What should an application do if the operation fails?',
            expectedAnswer:
              'A commit makes the transaction’s successful changes persistent. If an operation fails, roll back or let the transaction context roll back, report the error, and do not claim the write succeeded.',
            explanation:
              'Transactions help keep a multi-step change consistent instead of leaving partially applied data.',
          },
          {
            id: 'py-4-check-cleaning',
            prompt:
              'A query returns a row with minutes set to NULL. Should a cleaning step always replace it with zero? Why or why not?',
            expectedAnswer:
              'No. NULL means the duration is unknown or missing, while zero asserts that no time was studied. Choose a domain-appropriate policy such as investigate, retain as missing, exclude with documentation, or ask for correction.',
            explanation:
              'Replacing missing values without a reason changes the meaning of the data and may bias later summaries or ML features.',
          },
          {
            id: 'py-4-check-engines',
            prompt:
              'What is SQLite, and name one reason its SQL should not automatically be assumed to work unchanged in PostgreSQL or MySQL.',
            expectedAnswer:
              'SQLite is an embedded database engine commonly used through a local file and does not require a separate server. Database engines differ in type systems, functions, constraints and syntax details, so queries and schema definitions should be checked against the target engine.',
            explanation:
              'SQL has shared foundations, but each engine has dialect-specific behavior.',
          },
        ],
        miniBuild: {
          title: 'Student Study Records Database',
          goal: 'Build a small Python command-line utility backed by a persistent SQLite database. Record study sessions, query them by subject and date, calculate useful summaries and practise safe data changes.',
          requirements: [
            'Create a local database file such as study_records.db using Python’s built-in sqlite3 module.',
            'Design a study_sessions table with a primary key, subject, studied_on date text, positive integer minutes and an optional reflection.',
            'Create the table with appropriate NOT NULL and CHECK constraints; consider a subjects table and foreign key as an optional extension.',
            'Insert multiple records using parameter placeholders and Python value tuples, never string interpolation for SQL values.',
            'Query selected columns for a subject and date range, with explicit sorting.',
            'Use SQL aggregation to report session count, total minutes and average minutes by subject.',
            'Allow a user to update one selected record by primary key after previewing it and validating the new value.',
            'Handle blank subjects, invalid dates, non-integer or non-positive minutes, database errors and missing optional reflections with clear behavior.',
            'Display fetched results and summaries in a readable Python format without requiring pandas.',
            'Close database connections cleanly and demonstrate persistence by exiting and running the program again.',
          ],
          milestones: [
            'Sketch the table columns, types, key, required fields and missing-reflection policy before writing SQL.',
            'Create the database file and table; inspect the schema and confirm that a second run does not destroy existing data.',
            'Add a small helper to validate subject, date and positive integer duration before attempting an insert.',
            'Insert at least three distinct sample sessions with parameterized SQL and commit the successful transaction.',
            'Write a query for one subject within a date range and display results in a predictable order.',
            'Add a grouped SQL summary by subject using COUNT, SUM and AVG; check one group by hand.',
            'Preview and update one record by its primary key; check affected row count and preserve all other rows.',
            'Handle expected sqlite3 errors accurately, close the connection, exit and rerun to confirm records persist.',
            'Review a few records for missing, blank, invalid or duplicate data and document any cleaning rule without silently changing meaning.',
          ],
          acceptanceCriteria: [
            'The program creates and reuses a local SQLite database without resetting it on each run.',
            'The schema has a primary key and constraints for required subject, date and positive minutes.',
            'At least three records can be inserted safely through placeholders and are still present on a later program run.',
            'A subject-and-date query returns only the intended records in an explicitly defined order.',
            'The SQL summary correctly reports counts, totals and averages by subject for a small hand-checkable dataset.',
            'An update uses a primary-key condition, parameterized values and a preview or confirmation step.',
            'Invalid input and expected database errors produce clear messages and are not reported as successful saves.',
            'Missing reflection is represented as NULL/None and is not automatically treated as zero or empty text.',
            'The program displays useful results and closes its database connection.',
            'No user-supplied value is interpolated into SQL; no valuable data or credentials are used for testing.',
          ],
          testCases: [
            'Run the program on a new path and confirm it creates the database and table.',
            'Insert multiple study sessions and confirm each saved subject, date and duration.',
            'Query one subject and date range; verify excluded subjects and dates do not appear.',
            'Calculate grouped totals for two subjects and compare at least one total and average by hand.',
            'Enter a blank subject, malformed date, non-integer duration and zero or negative duration; confirm each is rejected clearly.',
            'Update one known session and confirm its new value while another session remains unchanged.',
            'Leave reflection missing and confirm the application handles it as missing rather than zero.',
            'Close the program, run it again and query prior records to demonstrate persistence.',
            'Cause a safe, expected database error in a scratch copy and verify the program reports failure instead of claiming success.',
          ],
        },
        masteryCriteria: [
          'Explain tables, rows, columns, schemas, primary keys and foreign keys using the study-record example.',
          'Write SELECT queries with explicit columns, row filters, logical operators, sorting, limits and distinct results.',
          'Use aggregate functions and GROUP BY, and correctly place row conditions in WHERE and group conditions in HAVING.',
          'Safely write and explain INSERT, UPDATE and DELETE conditions, including why a missing WHERE clause can affect an entire table.',
          'Choose INNER JOIN or LEFT JOIN based on whether unmatched records should remain, and trace a simple subquery.',
          'Represent and query missing data with NULL and IS NULL without confusing it with zero or empty text.',
          'Use Python sqlite3 to connect, create, parameterize, fetch, commit or roll back, handle errors and close the database.',
          'Inspect types, missing values and possible duplicates, and explain a documented cleaning decision.',
          'Describe where pandas can fit into a workflow while recognizing that it is optional for the tasks in this lesson.',
          'Complete the Student Study Records Database mini-build and demonstrate that its data persists between runs.',
        ],
};
