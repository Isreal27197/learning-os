import type { LessonContent } from '../curriculum/lessonTypes';

export const content: LessonContent = {
        difficulty: 'beginner',
        prerequisites: ['py-1'],
        learningObjectives: [
          'Explain what a file path identifies and distinguish a path from an opened file object.',
          'Read and write text files using explicit UTF-8 encoding and a with statement.',
          'Choose between read, write, append and exclusive-create modes while protecting existing data.',
          'Use pathlib to build and inspect paths without hard-coding platform-specific separators.',
          'Handle expected file and conversion failures with narrow exception handlers and useful messages.',
          'Explain the purpose of modules, import standard-library modules, and split a small program into reusable files.',
          'Use the __main__ guard to keep reusable definitions from running automatically when imported.',
          'Test file behavior with temporary or deliberately chosen paths and verify both normal and failure cases.',
        ],
        keyConcepts: [
          'file path',
          'current working directory',
          'file object',
          'text mode',
          'encoding',
          'file mode',
          'context manager',
          'Path object',
          'exception',
          'try and except',
          'else and finally',
          'raise',
          'module',
          'import',
          'module search path',
          'main guard',
        ],
        contentSections: [
          {
            title: '1. Why programs use files',
            content:
              'A variable lives in the running program. When the program ends, its ordinary variables disappear. A file is a named place on a storage device where information can remain after a program closes. A program can read a file as input, transform its contents, and write a result for a later run. This is the first step from one-off calculations toward programs that can preserve settings, logs, reports, and data.\n\nA file path is the address used to find a file or directory. A path such as "data/reading.txt" is relative: Python resolves it from the current working directory, which is the directory the process is running in. A path such as "C:/Users/Ada/data/reading.txt" or "/home/ada/data/reading.txt" is absolute. The working directory is not automatically the directory containing the Python source file, so a relative path can point somewhere unexpected if the program is launched from a different place.',
            codeExamples: [
              {
                title: 'Inspect the working directory',
                language: 'python',
                code: 'from pathlib import Path\n\nprint(Path.cwd())',
                explanation:
                  'Path.cwd() reports the process working directory. When a relative filename is not found, inspect this value before assuming the file API is broken.',
              },
            ],
          },
          {
            title: '2. Paths and file objects are different',
            content:
              'A Path describes where a file should be. Opening that path gives your program a file object: a temporary connection that provides operations such as reading or writing. The path can exist even when no file exists there yet; the file object only exists after a successful open.\n\nThe pathlib module represents paths with Path objects. Path objects can be joined using /, which pathlib interprets as a path operation on every supported operating system. This avoids manually guessing whether a platform uses a forward or backward slash. Path.exists() can answer whether a path currently exists, but checking and then opening is not a guarantee that it will still exist a moment later; handle errors from the actual operation too.',
            codeExamples: [
              {
                title: 'Build a path from parts',
                language: 'python',
                code: 'from pathlib import Path\n\nfolder = Path("data")\nfile_path = folder / "reading.txt"\nprint(file_path)\nprint(file_path.exists())',
                explanation:
                  'The / operator joins path components; it does not open or create the file. The existence check is only an observation at that moment.',
              },
            ],
          },
          {
            title: '3. Open text files safely',
            content:
              'The built-in open(path, mode, encoding=...) function opens a file and returns a file object. For text files, specify encoding="utf-8". An encoding is the agreed mapping between text characters and stored bytes. Without a deliberate encoding, text can be read differently across computers or fail for some characters.\n\nUse a with statement to manage an opened file. The file is closed automatically when the indented block ends, even if an exception occurs inside the block. Closing releases the resource and ensures pending writes are completed. Do not keep a file open longer than the work that needs it.',
            codeExamples: [
              {
                title: 'Read a whole UTF-8 text file',
                language: 'python',
                code: 'from pathlib import Path\n\nfile_path = Path("notes.txt")\nwith file_path.open("r", encoding="utf-8") as file:\n    text = file.read()\n\nprint(text)',
                explanation:
                  'The file is opened for reading as text. read() returns its contents as a string. The with block closes the file before print runs.',
              },
            ],
          },
          {
            title: '4. Understand read and write modes before using them',
            content:
              'The mode tells open what kind of access you need. "r" reads an existing file and fails if it is absent. "w" creates a file or truncates an existing file to zero length before writing; that replacement is destructive. "a" creates a missing file or adds new text at the end of an existing one. "x" creates a new file but fails if a file with that name already exists, which can protect existing work from accidental replacement. Add "b" for binary data; this beginner lesson focuses on text.\n\nWriting text replaces or appends exactly as the chosen mode specifies. A newline character (\\n) separates lines in text. write() does not add a newline automatically, so include one when each record should appear on its own line. For user-provided or important data, consider whether overwriting is actually intended before choosing "w".',
            codeExamples: [
              {
                title: 'Append one line without replacing prior content',
                language: 'python',
                code: 'from pathlib import Path\n\nlog_path = Path("study-log.txt")\nwith log_path.open("a", encoding="utf-8") as file:\n    file.write("Reviewed file modes.\\n")',
                explanation:
                  'Append mode preserves earlier content and writes the new line at the end. Running this program repeatedly adds another line each time; it does not deduplicate entries.',
              },
            ],
          },
          {
            title: '5. Exceptions describe failures during operations',
            content:
              'An exception is a Python object that reports a problem while a program is running. Opening a missing file in read mode raises FileNotFoundError. Access can be denied with PermissionError. A path can also name a directory when the program expects a file, producing IsADirectoryError. These are distinct from a syntax error: Python can parse the program, but an operation fails during execution.\n\nA try block marks an operation that may fail. An except block says what to do for a particular exception type. Catch the narrowest expected exception you can handle. A broad except Exception can conceal programming mistakes and make a broken program appear successful. A useful handler tells the user what failed and what they can do next; it should not claim a read or save succeeded when it did not.',
            codeExamples: [
              {
                title: 'Handle a missing input file',
                language: 'python',
                code: 'from pathlib import Path\n\nsource = Path("reading.txt")\ntry:\n    text = source.read_text(encoding="utf-8")\nexcept FileNotFoundError:\n    print(f"Could not find {source}. Check the file path.")\nelse:\n    print(text)',
                explanation:
                  'The handler catches only the expected missing-file case. The else block runs only if the try block completed without raising an exception.',
              },
            ],
          },
          {
            title: '6. Add else, finally and deliberate failures',
            content:
              'A try statement may have an else block for work that should happen only when the protected operation succeeds. A finally block runs whether the operation succeeded or failed; it is useful for cleanup that must happen either way. When using with to manage files, manual close calls are unnecessary because the context manager already handles cleanup.\n\nUse raise when your own code needs to report that a requested operation cannot continue. For example, a function can reject an empty filename with ValueError. Raising a specific exception preserves the distinction between expected invalid input and unrelated failures. Do not use an exception merely to hide a condition that can be handled more clearly with an ordinary if statement.',
            codeExamples: [
              {
                title: 'Validate an argument with a specific exception',
                language: 'python',
                code: 'from pathlib import Path\n\n\ndef read_note(filename):\n    if not filename.strip():\n        raise ValueError("filename must not be empty")\n    return Path(filename).read_text(encoding="utf-8")',
                explanation:
                  'The function rejects a value that does not meet its own requirement. A caller can catch ValueError if it has a useful recovery path; file access failures remain their own exceptions.',
              },
            ],
          },
          {
            title: '7. Modules let programs reuse and organize code',
            content:
              'A module is a Python source file whose definitions can be used by another file. The file name without the .py suffix is normally the module name. For example, a file named text_tools.py can define a function clean_line, and another file can import it. Importing avoids copying the same function into multiple programs and gives related code a clear home.\n\nThe standard library is the collection of modules supplied with Python. pathlib is one standard-library module. Import only what you need, and prefer explicit imports that make the source of a name easy to find, such as from pathlib import Path or import math. Avoid naming your own files after standard-library modules (for example, random.py or pathlib.py), because Python may import your file instead of the intended library module.',
            codeExamples: [
              {
                title: 'Import and use standard-library modules',
                language: 'python',
                code: 'from pathlib import Path\nimport math\n\nreport = Path("report.txt")\nrounded_value = math.ceil(3.2)\nprint(report.name)\nprint(rounded_value)',
                explanation:
                  'Path is imported by name, while math is imported as a module and accessed with a qualified name. The output is report.txt followed by 4.',
              },
            ],
          },
          {
            title: '8. Separate reusable definitions from script behavior',
            content:
              'A module can be run as a script or imported by another module. When Python runs a file directly, it sets that file’s __name__ variable to "__main__". When the file is imported, __name__ is instead set to the module’s name. The common main guard, if __name__ == "__main__":, keeps command-line behavior from running automatically during import.\n\nPut reusable functions near the top of a file and keep the guarded part small: it should call a main function that coordinates the program. This structure makes a program easier to test and reuse. At first, keep related files in the same project directory. Imports from other directories depend on Python’s module search path, which is a later topic; avoid changing that path to fix a simple file-placement mistake.',
            codeExamples: [
              {
                title: 'A small reusable module with a main guard',
                language: 'python',
                code: 'def format_message(name):\n    return f"Welcome, {name}!"\n\n\ndef main():\n    print(format_message("Ravi"))\n\n\nif __name__ == "__main__":\n    main()',
                explanation:
                  'Running this file prints the greeting. Importing it makes format_message and main available without calling main automatically.',
              },
            ],
          },
          {
            title: '9. Test file behavior safely and deliberately',
            content:
              'File programs have side effects: they can create, replace or append to files. Choose a test path you control, and do not test write mode against valuable data. Use a temporary directory for experiments when you know how to create one, or use a clearly named scratch file and inspect it after each run. Test reading an existing file, reading a missing file, writing a new file, and the behavior of a second write. If the second write should not replace data, use append or exclusive-create mode according to the requirement.\n\nDebug by separating path problems from content problems. Print or inspect the resolved path, verify the file exists where expected, then inspect the text read. For import errors, check the spelling, file name, project layout and whether a conflicting file shadows the module you meant to import. Keep exceptions visible until you understand their cause; a traceback contains the exception type and the line where it arose.',
          },
          {
            title: '10. From files to reliable data programs',
            content:
              'Data and machine-learning workflows often read source files, validate their contents, transform records, and write reports or model artifacts. The same foundations apply: paths define locations, encodings define how text becomes bytes, exceptions make failure explicit, and modules give reusable transformations a stable home. Reliability comes from making those choices explicit and testing both success and failure paths before a program handles important data.',
          },
        ],
        workedExamples: [
          {
            title: 'Read and count lines in a text file',
            problem: 'Read a UTF-8 file named reading.txt and report how many lines it contains.',
            reasoning:
              'Open the file in read mode with a deliberate encoding. readlines() returns a list with one item per line, so its length gives the count. The file may not exist, so report that specific case instead of showing an unexplained crash.',
            code: 'from pathlib import Path\n\npath = Path("reading.txt")\ntry:\n    lines = path.read_text(encoding="utf-8").splitlines()\nexcept FileNotFoundError:\n    print(f"Missing file: {path}")\nelse:\n    print(f"Lines: {len(lines)}")',
            language: 'python',
            explanation:
              'For a file containing two lines, the output is Lines: 2. splitlines() removes the line separators, and an empty file produces an empty list and a count of zero. This concise read_text approach is suitable for small files; very large files are better processed incrementally.',
          },
          {
            title: 'Create a new file without overwriting an existing one',
            problem:
              'Write a short message to first-run.txt, but refuse to replace a file that already exists.',
            reasoning:
              'Write mode is unsuitable because it truncates an existing file. Exclusive-create mode x creates a new file only when the path is unused. Catch FileExistsError to provide a clear result.',
            code: 'from pathlib import Path\n\npath = Path("first-run.txt")\ntry:\n    with path.open("x", encoding="utf-8") as file:\n        file.write("First run completed.\\n")\nexcept FileExistsError:\n    print("The file already exists; it was not changed.")\nelse:\n    print("Created first-run.txt")',
            language: 'python',
            explanation:
              'The first run creates the file and reports success. A later run raises FileExistsError and reports that it left the existing file alone. This is a useful safeguard when replacement is not intended.',
          },
          {
            title: 'Append a record and preserve earlier lines',
            problem: 'Add a single study record to study-log.txt each time the program runs.',
            reasoning:
              'Append mode creates the file if needed and places each new line after previous content. write() does not add a line break for us, so include \\n deliberately.',
            code: 'from pathlib import Path\n\nlog_path = Path("study-log.txt")\nrecord = "Python practice: 30 minutes"\nwith log_path.open("a", encoding="utf-8") as file:\n    file.write(record + "\\n")',
            language: 'python',
            explanation:
              'After two runs, the file has two records on separate lines. An empty record would still create a blank line, so validate data before writing if blank entries are not allowed.',
          },
          {
            title: 'Handle a missing file and a decoding-independent text read',
            problem:
              'Read a user-named text file and show a useful message when it cannot be found.',
            reasoning:
              'Treat the entered name as a path, attempt the actual read, and handle FileNotFoundError. Using an explicit encoding makes the expected text interpretation clear. Do not catch every exception, because permission or programming errors need different investigation.',
            code: 'from pathlib import Path\n\nfilename = input("Text file name: ").strip()\npath = Path(filename)\ntry:\n    text = path.read_text(encoding="utf-8")\nexcept FileNotFoundError:\n    print(f"Could not find {path}. Check the name and working directory.")\nelse:\n    print(text)',
            language: 'python',
            explanation:
              'If the file is present, its text is printed. If it is absent, the user receives a targeted message. An empty filename resolves to the current directory and will not be handled as missing; a more complete program should validate that the input is not empty and handle directory or permission errors if they are expected.',
          },
          {
            title: 'Import a helper from a neighboring module',
            problem:
              'Move a reusable line-cleaning function into text_tools.py and use it from app.py.',
            reasoning:
              'Place both .py files in the same project directory. Define the function in the helper module, import it by the module filename, then call it. Keep the helper module free of top-level prompts or writes so importing it has no surprising side effects.',
            code: '# text_tools.py\ndef clean_line(line):\n    return line.strip()\n\n# app.py\nfrom text_tools import clean_line\n\nraw = "  hello  "\nprint(clean_line(raw))',
            language: 'python',
            explanation:
              'Running app.py prints hello without the surrounding spaces. The import searches for text_tools.py on Python’s module search path, which includes the script’s directory in this simple same-folder setup.',
          },
          {
            title: 'Use a main guard for reusable code',
            problem:
              'Make a module that can print a report when run directly but can be imported without printing.',
            reasoning:
              'Place reusable behavior in a function. Call that function only under the __main__ guard. When the module is imported, the guard condition is false and the reusable definition remains available without the script action running.',
            code: 'def make_report(items):\n    return f"Items recorded: {len(items)}"\n\n\ndef main():\n    print(make_report(["book", "pen"]))\n\n\nif __name__ == "__main__":\n    main()',
            language: 'python',
            explanation:
              'Running the file prints Items recorded: 2. Importing it defines make_report and main, but does not print the report. An empty list produces Items recorded: 0.',
          },
        ],
        commonMistakes: [
          {
            title: 'Using a relative path without checking the working directory',
            explanation:
              'A relative path is resolved from the process working directory, which may differ from the source file’s folder. Check Path.cwd() and confirm where the file actually is.',
            incorrectCode: 'with open("reading.txt", "r") as file:\n    text = file.read()',
            correctedCode:
              'from pathlib import Path\n\npath = Path("reading.txt")\nprint("Looking in:", Path.cwd())\ntext = path.read_text(encoding="utf-8")',
          },
          {
            title: 'Using write mode when the file must be preserved',
            explanation:
              'Mode "w" truncates an existing file before writing. Use "a" to add to the end or "x" to create only if absent, depending on the requirement.',
            incorrectCode:
              'with open("study-log.txt", "w", encoding="utf-8") as file:\n    file.write(record + "\\n")',
            correctedCode:
              'with open("study-log.txt", "a", encoding="utf-8") as file:\n    file.write(record + "\\n")',
          },
          {
            title: 'Forgetting to close a file',
            explanation:
              'Manually opened files can remain open if an error interrupts the program. The with statement closes the file reliably at the end of its block.',
            incorrectCode: 'file = open("reading.txt", encoding="utf-8")\ntext = file.read()',
            correctedCode:
              'with open("reading.txt", encoding="utf-8") as file:\n    text = file.read()',
          },
          {
            title: 'Catching every exception and hiding the real failure',
            explanation:
              'A broad handler can hide misspelled variables and other bugs as if they were ordinary missing-file conditions. Catch the expected exception and let unexpected problems remain visible.',
            incorrectCode:
              'try:\n    text = path.read_text(encoding="utf-8")\nexcept Exception:\n    print("No file")',
            correctedCode:
              'try:\n    text = path.read_text(encoding="utf-8")\nexcept FileNotFoundError:\n    print("The input file was not found.")',
          },
          {
            title: 'Assuming write() adds a newline',
            explanation:
              'write() writes exactly the string supplied. Without a line separator, repeated records run together and become difficult to parse.',
            incorrectCode: 'file.write("first")\nfile.write("second")',
            correctedCode: 'file.write("first\\n")\nfile.write("second\\n")',
          },
          {
            title: 'Naming a project file after a module you need',
            explanation:
              'A local file such as random.py can shadow Python’s standard-library random module. Choose a distinct filename and remove confusing generated cache files only when you understand what they are.',
            incorrectCode: '# File is named pathlib.py\nfrom pathlib import Path',
            correctedCode: '# Rename the file to path_examples.py\nfrom pathlib import Path',
          },
          {
            title: 'Putting prompts at the top level of a reusable module',
            explanation:
              'Top-level statements run as soon as the module is imported. Put command-line actions in main() and call them under the __main__ guard.',
            incorrectCode: 'name = input("Name: ")\nprint(f"Hello, {name}")',
            correctedCode:
              'def main():\n    name = input("Name: ")\n    print(f"Hello, {name}")\n\n\nif __name__ == "__main__":\n    main()',
          },
        ],
        resources: [
          {
            id: 'py-2-python-files',
            title: 'Reading and Writing Files — Python Tutorial',
            url: 'https://docs.python.org/3/tutorial/inputoutput.html#reading-and-writing-files',
            type: 'documentation',
            explanation:
              'Official Python tutorial section on opening files, modes, reading, writing and context managers.',
          },
          {
            id: 'py-2-python-errors',
            title: 'Errors and Exceptions — Python Tutorial',
            url: 'https://docs.python.org/3/tutorial/errors.html',
            type: 'documentation',
            explanation:
              'Official tutorial on syntax errors, exceptions, try/except, else, finally and raising exceptions.',
          },
          {
            id: 'py-2-python-modules',
            title: 'Modules — Python Tutorial',
            url: 'https://docs.python.org/3/tutorial/modules.html',
            type: 'documentation',
            explanation:
              'Official tutorial explaining modules, imports, module search paths and the main guard.',
          },
          {
            id: 'py-2-pathlib',
            title: 'pathlib — Object-oriented filesystem paths',
            url: 'https://docs.python.org/3/library/pathlib.html',
            type: 'documentation',
            explanation:
              'Official standard-library reference for Path objects, path joining and file operations.',
          },
        ],
        exercises: [
          {
            id: 'py-2-exercise-read-report',
            title: 'Count lines in a supplied text file',
            instructions:
              'Write a program that reads a UTF-8 text file at a path you choose and prints the number of lines. If the file is absent, show a clear message. Create a small test file yourself, but do not assume the reader’s working directory without checking it.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'An existing two-line file reports a count of two.',
              'An empty file reports a count of zero.',
              'A missing input produces a helpful message rather than an unhandled traceback.',
            ],
            acceptanceCriteria: [
              'The file is opened for reading with an explicit encoding.',
              'The file is closed reliably with a context manager or Path read method.',
              'Only the expected missing-file condition is caught.',
            ],
            constraints: ['Use text mode and UTF-8 encoding.'],
            testCases: [
              'A file containing "alpha\\nbeta\\n" reports two lines.',
              'An empty file reports zero lines.',
              'A nonexistent path reports that it could not be found.',
            ],
          },
          {
            id: 'py-2-exercise-safe-create',
            title: 'Create a file without replacing it',
            instructions:
              'Ask for a short label and write it to a new file. If the target file already exists, leave it unchanged and tell the user. Run the program twice to check both outcomes.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The first run creates the file.',
              'A later run does not overwrite its content.',
            ],
            acceptanceCriteria: [
              'The program uses an appropriate create-only mode.',
              'The existing-file case has a clear message.',
              'The file is written as UTF-8 text and includes a final newline.',
            ],
            constraints: ['Test with a scratch filename, not a valuable file.'],
            testCases: [
              'With no file present, the program creates it with the requested label.',
              'With a file already present, its original content remains unchanged.',
            ],
          },
          {
            id: 'py-2-exercise-append-journal',
            title: 'Append dated journal entries',
            instructions:
              'Ask for a short journal entry and append it to a text file so previous entries remain. Use datetime from the standard library to include a timestamp. Ensure each entry occupies one line.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Two runs preserve both entries in order.',
              'Each line includes a timestamp and the supplied text.',
            ],
            acceptanceCriteria: [
              'The file is opened in append mode with UTF-8 encoding.',
              'A newline is written after each entry.',
              'An empty entry is rejected or handled with a useful prompt.',
            ],
            constraints: ['Do not use write mode for the journal file.'],
            testCases: [
              'Append "Read chapter one" and then "Practised examples"; both lines remain.',
              'Submit whitespace only; no blank journal entry should be recorded.',
            ],
          },
          {
            id: 'py-2-exercise-error-messages',
            title: 'Read a file with actionable error messages',
            instructions:
              'Ask for a path and display its text. Handle at least a missing file and a permission error separately where your operating system allows you to test them. Do not wrap the entire program in a broad Exception handler.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'A readable file displays its contents.',
              'A missing file produces a message that suggests checking the path.',
              'An access failure is not misreported as a missing file.',
            ],
            acceptanceCriteria: [
              'The handlers name specific exception types.',
              'The success path is separate from failure handling.',
              'Unexpected programming errors are not silently hidden.',
            ],
            testCases: [
              'Read an existing UTF-8 file.',
              'Read a nonexistent path.',
              'If practical, attempt to read a file without permission and observe the distinct message.',
            ],
          },
          {
            id: 'py-2-exercise-module-helper',
            title: 'Extract a reusable text helper',
            instructions:
              'Create text_tools.py with a function that normalizes a line by removing surrounding whitespace and converting it to lowercase. In a separate app.py in the same directory, import the function and use it on several sample strings.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'The helper can be imported without prompting or printing.',
              'The app can call the helper for each sample.',
            ],
            acceptanceCriteria: [
              'The function is defined once in the helper module.',
              'The app imports from the helper module rather than copying the function.',
              'The filenames do not shadow standard-library module names.',
            ],
            testCases: [
              'Input "  Hello  " becomes "hello".',
              'Input "PYTHON" becomes "python".',
              'Importing text_tools alone causes no visible output.',
            ],
          },
          {
            id: 'py-2-exercise-main-guard',
            title: 'Separate reusable code from script execution',
            instructions:
              'Write a module that contains a function for formatting a short report and a main() function that calls it. Add a main guard. Run the module directly, then import it from another file and verify that importing does not print the report.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'Running the module executes its command-line behavior.',
              'Importing the module exposes its function without running the script action.',
            ],
            acceptanceCriteria: [
              'Reusable definitions are at module level.',
              'Script behavior is under if __name__ == "__main__":.',
              'The main guard calls a main function.',
            ],
            constraints: ['Keep both files in the same project folder.'],
            testCases: [
              'Direct execution prints one report.',
              'Importing the module and calling only its helper produces no automatic report.',
            ],
          },
        ],
        assessmentQuestions: [
          {
            id: 'py-2-check-path',
            prompt:
              'A program cannot find notes.txt even though you can see that file in your editor. What path-related fact should you check first, and how can Python help you inspect it?',
            expectedAnswer:
              'Check the process current working directory because relative paths are resolved from there, not necessarily from the source file directory. Inspect it with Path.cwd().',
            explanation:
              'A path is interpreted in the process context. Confirming the resolved location separates a path mistake from a read or permission problem.',
          },
          {
            id: 'py-2-check-modes',
            prompt:
              'Predict what happens to an existing file when it is opened in "w", "a", and "x" mode. Which mode is safest when you must not replace existing content?',
            expectedAnswer:
              '"w" truncates and replaces existing content; "a" adds at the end; "x" fails if the path already exists. Use "x" when creation must not overwrite an existing file.',
            explanation:
              'The mode is a data-safety decision, not just a syntax detail. Choose it from the required behavior and test it on a scratch file.',
          },
          {
            id: 'py-2-check-context',
            prompt:
              'Why is a with statement useful when opening a file? What might go wrong if an exception occurs before a manually opened file is closed?',
            expectedAnswer:
              'The with statement closes the file when its block ends, including when an exception interrupts the block. Without reliable cleanup, the resource can remain open and buffered data may not be completed.',
            explanation:
              'A context manager defines setup and cleanup around a block. Files are a common beginner example of a resource that should not be left open.',
          },
          {
            id: 'py-2-check-exception',
            prompt:
              'A file-read operation raises FileNotFoundError. Why is catching Exception and printing "file missing" a poor response?',
            expectedAnswer:
              'Exception catches many unrelated failures, including programming mistakes and permission errors, and reports them inaccurately. Catch FileNotFoundError for the missing-path case and handle other expected failures separately.',
            explanation:
              'An error message should match the actual failure. Narrow handlers preserve information and avoid disguising bugs as normal input problems.',
          },
          {
            id: 'py-2-check-output',
            prompt:
              'What does this program print on its first and second runs if study.txt does not exist initially?\n\nfrom pathlib import Path\npath = Path("study.txt")\nwith path.open("a", encoding="utf-8") as file:\n    file.write("reviewed\\n")\nprint(path.read_text(encoding="utf-8"))',
            expectedAnswer:
              'Each run prints the file contents after appending. The first run prints one reviewed line; the second prints two reviewed lines.',
            explanation:
              'Append mode preserves the previous contents and adds a new record each time the code runs.',
          },
          {
            id: 'py-2-check-newline',
            prompt:
              'If file.write("red") runs and then file.write("blue"), what text is stored? What should you add if each value must appear on its own line?',
            expectedAnswer:
              'The text is redblue. Include a newline after each record, for example "red\\n" and "blue\\n".',
            explanation:
              'write() does not add separators or line endings automatically; it writes the exact supplied string.',
          },
          {
            id: 'py-2-check-import',
            prompt:
              'Two files, app.py and text_tools.py, are in the same project directory. What import can app.py use for clean_line defined in text_tools.py? What should you check if the import unexpectedly finds the wrong code?',
            expectedAnswer:
              'Use from text_tools import clean_line (or import text_tools and call text_tools.clean_line). Check spelling, folder placement, and whether a local filename is shadowing the intended module.',
            explanation:
              'Module names normally come from .py filenames. Python searches specific locations; nearby files can unintentionally take precedence over a standard module.',
          },
          {
            id: 'py-2-check-main',
            prompt:
              'What does if __name__ == "__main__": distinguish? Why does it make a module easier to reuse?',
            expectedAnswer:
              'It is true when the file is run directly and false when the file is imported under its module name. It keeps script actions from running automatically during import while leaving definitions available.',
            explanation:
              'The guard gives a file two useful roles: a runnable script and an importable module.',
          },
          {
            id: 'py-2-check-design',
            prompt:
              'You need to process a large file, but your current program reads it all with read_text(). What is the limitation, and what direction could you investigate next?',
            expectedAnswer:
              'read_text loads the whole file into memory, which may be unsuitable for a very large file. Process the file incrementally, for example by iterating over lines inside a with-open block.',
            explanation:
              'A simple whole-file read is clear for small inputs. Scale changes the memory tradeoff, so choose an approach that fits the expected file size.',
          },
        ],
        miniBuild: {
          title: 'Reliable Study Log',
          goal: 'Build a small command-line program split into a reusable module and a script. It accepts a study entry, safely appends it to a UTF-8 text file, and can display saved entries. The program must explain expected file errors clearly and must not erase the log.',
          requirements: [
            'Create a reusable module named study_log.py and a separate runnable script named app.py in the same project directory.',
            'In the module, define functions to append a non-empty entry and read existing entries from a path supplied by the caller.',
            'Use pathlib.Path and explicit UTF-8 text encoding.',
            'Append new records with a newline; never use write mode for the existing log.',
            'In app.py, prompt for an entry and provide a simple way to display the saved log.',
            'Handle expected missing-file and permission failures with accurate messages.',
            'Use a main guard so importing study_log does not prompt, print, or write files.',
            'Keep the log path configurable or clearly documented, and test against a scratch file.',
          ],
          milestones: [
            'Create both files in one project folder and import a harmless helper from study_log.py.',
            'Write and test the read function against a small existing UTF-8 scratch file.',
            'Add a narrow missing-file behavior for reading a log that has not been created yet.',
            'Implement the append function with append mode and one record per line.',
            'Add the app prompts and main guard, keeping reusable functions free of top-level side effects.',
            'Run the test cases, inspect the saved file after repeated runs, and review error messages.',
          ],
          acceptanceCriteria: [
            'The first entry creates the log if needed; later entries preserve earlier records.',
            'Each non-empty entry appears on its own line and can be read back.',
            'An empty or whitespace-only entry is not appended.',
            'A missing log can be displayed as empty or reported clearly, according to the chosen behavior.',
            'The app does not claim an entry was saved if writing failed.',
            'Importing study_log does not prompt, print, or modify files.',
            'The program never overwrites the existing log during normal operation.',
          ],
          testCases: [
            'Display a log that does not yet exist; confirm the chosen empty-log behavior is clear.',
            'Append "Reviewed file modes" and display it; the entry should be present once.',
            'Append "Practised imports" and display again; both entries should remain in order on separate lines.',
            'Submit only spaces; the program should reject it without adding a blank record.',
            'Temporarily use a path that is a directory or otherwise unreadable, where safe to do so; observe a specific useful failure rather than a false success.',
            'Import study_log from a separate short script; importing alone should not create or alter the log.',
          ],
        },
        masteryCriteria: [
          'Choose a file mode based on whether the requirement is to read, replace, append or create without replacement, and explain the data-safety consequence.',
          'Read and write UTF-8 text using Path or open with a context manager and explicit encoding.',
          'Diagnose a relative-path problem by inspecting the current working directory and resolved path.',
          'Handle missing-file and other expected I/O failures with accurate, narrow exception handlers.',
          'Explain why write() needs explicit line separators and how repeated append operations affect the file.',
          'Create and import a small neighboring module without top-level side effects.',
          'Use a main guard to separate reusable definitions from direct script behavior.',
          'Complete the Reliable Study Log and test both successful and failing operations without overwriting valuable data.',
        ],
};
