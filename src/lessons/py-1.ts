import type { LessonContent } from '../curriculum/lessonTypes';

export const content: LessonContent = {
        difficulty: 'beginner',
        learningObjectives: [
          'Run a Python file and explain how statements execute in order, how indentation forms blocks, and how syntax, runtime and logic errors differ.',
          'Use descriptive variables and distinguish values of type int, float, str and bool.',
          'Read text with input, display results with print, and convert valid numeric text before arithmetic.',
          'Build arithmetic expressions and use comparison and Boolean operators to express rules.',
          'Write if, elif and else branches that choose one appropriate action.',
          'Trace a while loop, update its condition, and use break or continue only when they clarify the control flow.',
          'Use for to process each item in a sequence and explain how it differs from condition-driven repetition.',
          'Create and update lists, read items by index, append values, check length and iterate over a collection.',
          'Define and call functions with parameters and arguments; return a result when a caller needs to use it.',
          'Combine input, decisions, loops, lists and functions to solve a small problem in manageable steps.',
          'Trace code, test ordinary and boundary cases, diagnose basic errors and revise a solution based on evidence.',
        ],
        keyConcepts: [
          'source code',
          'interpreter',
          'syntax',
          'runtime',
          'variable',
          'assignment',
          'data type',
          'expression',
          'input and output',
          'boolean condition',
          'if, elif and else',
          'while loop',
          'for loop',
          'iteration',
          'loop condition',
          'break and continue',
          'list',
          'index',
          'append',
          'function',
          'parameter and argument',
          'return value',
          'pseudocode',
          'test case',
          'debugging',
        ],
        contentSections: [
          {
            title: '1. Programming is giving precise instructions',
            content:
              'A program is a set of instructions a computer can carry out. Programming is the work of turning a goal into those instructions, checking what the computer did, and improving the instructions when the result is wrong. A computer follows instructions literally: it does not fill in missing steps from common sense. For example, “calculate the average” is not yet precise. We must know which numbers to use, how many there are, and what to do if there are none.\n\nPython is a general-purpose programming language. People use it for automation, web services, scientific work, data analysis and machine learning. Its readable syntax makes it a useful first language, and the same habits of careful decomposition apply in other languages.',
          },
          {
            title: '2. Source code, interpreter and errors',
            content:
              'The text you write is source code. Python’s interpreter reads that source and carries out its instructions. When you run a saved file, the interpreter processes the file and produces output or an error. Syntax is the set of structural rules of the language, such as matching parentheses and writing a string inside quotes. A syntax error means Python cannot interpret the program’s structure. A runtime error happens while a program that started running tries to do something invalid, such as divide by zero. A program can also run without an error and still give the wrong answer; that is a logic error.',
            codeExamples: [
              {
                title: 'A complete tiny program',
                language: 'python',
                code: 'print("Hello, learner!")',
                explanation:
                  'Save this line in a file such as hello.py and run that file with Python. The interpreter evaluates the call to print and writes the text to the output.',
              },
            ],
          },
          {
            title: '3. Start with the problem, not the keyboard',
            content:
              'Before coding, restate the goal in plain language. Identify the input (what information is available) and output (what result is required). Then list the steps that transform one into the other. Pseudocode is an informal, language-independent outline; it helps expose missing decisions before syntax gets in the way. Once the steps are clear, implement one small part, run it, and compare the result with an example you can calculate yourself.',
            codeExamples: [
              {
                title: 'Pseudocode for a total',
                language: 'text',
                code: 'get the price of one item\nget the number of items\nmultiply price by number of items\nshow the total',
                explanation:
                  'This outline states the necessary information and order without depending on Python syntax. Later we can translate each step into code.',
              },
            ],
          },
          {
            title: '4. Values, types, names and assignment',
            content:
              'A value is a piece of data. Its type describes what kind of value it is and which operations make sense for it. An integer (int) is a whole number such as 7; a float is a number with a fractional part such as 2.5; a string (str) is text such as "Ada"; and a boolean (bool) is either True or False. Quotes make text a string, while True and False are boolean values without quotes.\n\nA variable is a name that refers to a value. Assignment uses one equals sign (=) to bind the name on the left to the result on the right. The right side is evaluated first. Assignment is not the same as a mathematical claim that two sides are equal. Use descriptive names in lowercase_with_underscores, such as study_hours or item_count. A good name communicates the role of a value.',
            codeExamples: [
              {
                title: 'Assign and inspect values',
                language: 'python',
                code: 'learner_name = "Mina"\nstudy_hours = 1.5\nday_count = 2\nis_weekend = False\n\nprint(learner_name)\nprint(study_hours * day_count)',
                explanation:
                  'Each assignment stores a value under a descriptive name. The final expression multiplies a float by an integer and print displays the resulting 3.0.',
              },
            ],
          },
          {
            title: '5. Input, output and type conversion',
            content:
              'Output lets a program communicate a result; print(...) writes values to the console. Input lets a person provide information; input(...) displays a prompt and waits for text. Crucially, input always returns a string, even when the person types digits. Convert numeric text before doing arithmetic: int("12") produces the integer 12, while float("2.5") produces the floating-point number 2.5. Conversion only works when the text represents a suitable number; invalid text causes a ValueError at runtime. The numeric-input examples in this lesson assume valid input; handling conversion failures is not required by the mini-build.',
            codeExamples: [
              {
                title: 'Convert text before calculating',
                language: 'python',
                code: 'name = input("Your name: ")\nhours_text = input("Hours studied: ")\nhours = float(hours_text)\nprint("Hello,", name)\nprint("Hours recorded:", hours)',
                explanation:
                  'The name remains text. The hours are converted to a float because study time may include a fraction such as 1.5 hours.',
              },
            ],
          },
          {
            title: '6. Arithmetic and expressions',
            content:
              'An expression combines values and operators to produce a value. Python supports addition (+), subtraction (-), multiplication (*), division (/), floor division (//), remainder (%) and exponentiation (**). Parentheses make intended grouping explicit. Multiplication and division are evaluated before addition and subtraction; when in doubt, use parentheses rather than relying on memory. Division with / produces a float. The remainder operator is useful for questions such as whether a whole number is divisible by another number.',
            codeExamples: [
              {
                title: 'Use expressions deliberately',
                language: 'python',
                code: 'item_price = 4.25\nitem_count = 3\ntotal_cost = item_price * item_count\n\nminutes = 135\nhours = minutes / 60\nremaining_minutes = minutes % 60\n\nprint(total_cost)\nprint(hours, remaining_minutes)',
                explanation:
                  'Multiplication calculates the cost. Division converts minutes to hours, and remainder finds the minutes left after whole hours.',
              },
            ],
          },
          {
            title: '7. Comparisons and logical operators',
            content:
              'Comparison operators compare values and produce a boolean: == means equal, != means not equal, < means less than, <= means less than or equal, > means greater than, and >= means greater than or equal. A single = assigns a value; a double == asks a question about equality.\n\nThe logical operators and, or and not combine or reverse boolean conditions. With and, both conditions must be true. With or, at least one must be true. With not, True becomes False and False becomes True. Parentheses help make multi-part conditions readable. A condition is useful only when it answers a clearly stated rule.',
            codeExamples: [
              {
                title: 'Express a rule as a boolean',
                language: 'python',
                code: 'score = 82\nsubmitted = True\n\npassed = score >= 60 and submitted\nprint(passed)',
                explanation:
                  'The learner passes only when the score is at least 60 and the work was submitted. Both comparisons produce booleans, which and combines.',
              },
            ],
          },
          {
            title: '8. Comments and readable code',
            content:
              'A comment begins with # and is for people reading the source; Python does not execute the text after it on that line. Use comments to explain a reason or a non-obvious decision, not to repeat code word-for-word. Readability also comes from descriptive names, consistent indentation, short steps and formatting that makes the order of work visible. Clear code is easier to test and debug, and it helps another person review your reasoning.',
            codeExamples: [
              {
                title: 'A comment that explains why',
                language: 'python',
                code: 'study_minutes = 95\n\n# Keep the remainder so the summary can show hours and minutes.\nstudy_hours = study_minutes // 60\nremaining_minutes = study_minutes % 60',
                explanation:
                  'The comment explains why both calculations exist. Indentation is not needed for these top-level statements, but Python uses indentation to define blocks in structures such as if statements and loops.',
              },
            ],
          },
          {
            title: '9. A repeatable problem-solving process',
            content:
              'Use this sequence for a new programming problem:\n\n1. Understand the problem: restate it and clarify ambiguous words.\n2. Identify inputs and expected outputs, including units and types.\n3. Break the transformation into small steps.\n4. Write pseudocode when it helps reveal the order or a missing case.\n5. Implement incrementally: add one step, run it, and inspect the result.\n6. Test a normal example and edge cases such as zero, a boundary value or invalid input.\n7. Debug by reading the exact error, locating the failing line, checking assumptions and changing one thing at a time; then rerun the tests.\n\nA test case is a chosen input paired with the result you expect. Tests make correctness observable. For example, when converting minutes to hours and remaining minutes, 135 should become 2 hours and 15 minutes; zero should remain zero and zero.',
          },
          {
            title: '10. From small programs to data and machine learning',
            content:
              'A small program becomes more useful when its parts work together. Input supplies values, conversion gives them the type an operation needs, a condition chooses what to do, a loop repeats a step, a list keeps related values together, and a function gives a meaningful task a reusable name. For example, a score summary can ask for scores, keep them in a list, use a function to calculate an average, and use a condition to report whether the average meets a threshold.\n\nDo not begin with all of these pieces at once. First state the expected input and output, then solve a small example by hand. Build one part, run it, and compare the actual result with the expected one. When the result is wrong, trace the values and control flow rather than changing several lines at random. These habits are the foundation for later work with larger datasets and model inputs.',
          },
          {
            title: '11. Choose an action with if, elif and else',
            content:
              'A comparison creates a True or False value. An if statement uses that result to decide which indented block should run. Use elif for another mutually exclusive possibility and else for the remaining case. Python checks the branches from top to bottom and runs only the first matching branch. Order matters: a broad condition placed first can prevent a more specific condition below it from ever running.\n\nThe colon begins a block, and consistent indentation shows which statements belong to that block. Use a branch when a program must respond differently to different input, such as selecting a message for a score range. Before coding, list the cases and test their boundaries.',
            codeExamples: [
              {
                title: 'Select one message for a score',
                language: 'python',
                code: 'score = 76\n\nif score >= 80:\n    message = "Strong result"\nelif score >= 60:\n    message = "Pass"\nelse:\n    message = "Keep practising"\n\nprint(message)',
                explanation:
                  'Python tests score >= 80 first; 76 is not, so it checks score >= 60. That is true, so message becomes "Pass" and the final else is skipped. The output is Pass. Predict what happens for 80, 60 and 59 before changing score.',
              },
            ],
          },
          {
            title: '12. Repeat while a condition remains true',
            content:
              'A while loop repeats its indented body while its condition is True. It is useful when the number of repetitions depends on a condition, such as counting until a target is reached or repeatedly asking for a menu choice. The condition must eventually become False, or the loop can run forever. Check which value changes on each pass and make sure every route toward finishing updates it.\n\nbreak exits the nearest loop immediately. continue skips the remaining statements in the current pass and starts the next condition check. Beginners should first write loops whose condition and update are visible; use break or continue only when they make a clear case easier to express.',
            codeExamples: [
              {
                title: 'Count from one through three',
                language: 'python',
                code: 'count = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1\nprint("Done")',
                explanation:
                  'The condition is checked before each pass. The loop prints 1, 2 and 3, then increments count to 4. At 4 the condition is false, so the loop ends and prints Done. If the increment were removed, count would remain 1 and the loop would not finish.',
              },
              {
                title: 'Skip one value with continue',
                language: 'python',
                code: 'number = 0\nwhile number < 4:\n    number = number + 1\n    if number == 2:\n        continue\n    print(number)',
                explanation:
                  'The values 1, 2, 3 and 4 are generated. At 2, continue skips print for that pass; the output is 1, 3, 4. The increment occurs before continue, so the loop still makes progress.',
              },
              {
                title: 'Stop a search when the target is found',
                language: 'python',
                code: 'number = 1\nwhile number <= 5:\n    if number == 3:\n        print("Found it")\n        break\n    number = number + 1',
                explanation:
                  'The loop checks 1, then 2, then 3. At 3 it prints Found it and break exits the nearest loop immediately, so 4 and 5 are never checked. If the target might not occur, decide what message or result should happen after the loop.',
              },
            ],
          },
          {
            title: '13. Use for when processing each item',
            content:
              'A for loop takes each item from a sequence in turn and runs its body once for that item. Use it when you already have a collection of values or a known sequence to process. This differs from while: for expresses “do this for each item,” while while expresses “keep going as long as this condition is true.” range(stop) supplies integers from zero up to, but not including, stop. range(start, stop) begins at start and also stops before stop. These forms are useful for a known number sequence; they do not include the stop value.\n\nThe loop variable receives the current item on each pass. Read the body in order and trace that value. If you need a total, initialize it before the loop and add one item during each pass.',
            codeExamples: [
              {
                title: 'Add a known sequence with for and range',
                language: 'python',
                code: 'total = 0\nfor number in range(1, 4):\n    total = total + number\nprint("Total:", total)',
                explanation:
                  'range(1, 4) provides 1, 2 and 3: the start is included and the stop is not. total changes from 0 to 1, then 3, then 6. The output is Total: 6. The list is introduced in the next section; first trace how for uses each item.',
              },
            ],
          },
          {
            title: '14. Keep related values in a list',
            content:
              'A list stores an ordered collection of values in one variable. Lists are useful when several values have the same role, such as daily study minutes or scores. Write items inside square brackets and separate them with commas. Python positions are called indexes and start at zero: the first item is at index 0, and the last item is at index len(list) - 1. An invalid index causes an IndexError, so check the list length and bounds before using an index you calculated yourself.\n\nappend(value) adds one item at the end. len(list) reports the number of items. A list can be empty, so decide what the program should do before trying to read its first item. A for loop pairs naturally with a list: it visits every stored value without requiring you to manage indexes yourself.',
            codeExamples: [
              {
                title: 'Add and inspect values',
                language: 'python',
                code: 'topics = ["variables", "conditions"]\ntopics.append("loops")\n\nprint(topics[0])\nprint(len(topics))\nfor topic in topics:\n    print(topic)',
                explanation:
                  'append adds "loops" after the existing values. Index 0 is "variables", and len(topics) is 3. The for loop then prints variables, conditions and loops in that order. Predict what topics[-1] would refer to before trying it as an extension.',
              },
            ],
          },
          {
            title: '15. Give a reusable task a function',
            content:
              'A function is a named group of statements that performs a task. Defining it does not run its body; calling its name followed by parentheses runs it. Parameters are names in the definition that receive values. Arguments are the actual values supplied by the caller. A function can print a message for a user, or return a value so the caller can store it, compare it or pass it to another function. return ends that function call immediately.\n\nUse a function when a task has a clear name, when the same work is needed in more than one place, or when separating a task makes a larger program easier to understand. Keep the first functions small: make inputs explicit, perform one job and return a useful result. A function that only prints does not automatically provide that text as a value to its caller.',
            codeExamples: [
              {
                title: 'Pass an argument and return a result',
                language: 'python',
                code: 'def average(values):\n    if len(values) == 0:\n        return 0\n    total = 0\n    for value in values:\n        total = total + value\n    return total / len(values)\n\nstudy_minutes = [20, 35, 15]\ndaily_average = average(study_minutes)\nprint("Average:", daily_average)',
                explanation:
                  'average is defined with the parameter values. The call passes the list as an argument. The empty-list branch prevents division by zero; otherwise the loop totals the items and return sends 70 / 3 (about 23.33) back to the caller. print displays Average: 23.333333333333332. Returning 0 here is one chosen empty-input rule; a different problem may require a different explicit rule.',
              },
            ],
          },
          {
            title: '16. Combine the building blocks and test the result',
            content:
              'A useful small program often follows a simple flow: read input, store related values, use conditions to decide what is valid, repeat for each item or until the user is done, and move calculations into a function when that makes the work clearer. The order follows the problem rather than a fixed recipe. Write down what the program receives, what it should produce, and what should happen for empty or boundary cases.\n\nTest with a small example whose answer you can work out by hand. Trace each assignment, branch and loop pass. If the output is wrong, compare the actual values at intermediate steps with your expected values. Syntax errors point to invalid structure; runtime errors identify a failed operation; logic errors require checking the program’s assumptions and steps. Keep lesson completion, saved exercise drafts and your own evidence of mastery separate: reading or saving a draft is not proof that you can independently build the solution.',
          },
        ],
        workedExamples: [
          {
            title: 'Calculate the total cost of items',
            problem:
              'A notebook costs 3.40 units of currency. Calculate the cost of four notebooks.',
            reasoning:
              'The inputs are a unit price and a count. The requested output is their product. Keep the price as a float and the count as an integer; multiplying them gives the total before any optional tax or discount.',
            solution: 'total = price * quantity',
            code: 'price = 3.40\nquantity = 4\ntotal = price * quantity\nprint(total)',
            language: 'python',
            explanation:
              'The expression on the right is evaluated first. Python stores the resulting 13.6 under total, and print displays it. If the requirements later include tax, treat that as a separate, stated step and test it independently.',
          },
          {
            title: 'Convert minutes into hours and remaining minutes',
            problem: 'Convert 135 minutes into whole hours and leftover minutes.',
            reasoning:
              'There are 60 minutes in one hour. Floor division (//) finds the number of complete hours, while remainder (%) finds the minutes left after those hours.',
            code: 'total_minutes = 135\nhours = total_minutes // 60\nminutes = total_minutes % 60\nprint(hours, "hours and", minutes, "minutes")',
            language: 'python',
            explanation:
              '135 divided into groups of 60 gives 2 complete hours, with 15 remaining. This representation avoids reporting a fractional hour when the desired output is hours plus minutes.',
          },
          {
            title: 'Calculate a student’s average score',
            problem: 'Find the average of three scores: 78, 91 and 86.',
            reasoning:
              'Average means total divided by count. First add all three scores, then divide by three. We know the count is three, so the denominator is explicit. If the number of scores could be zero, the program would need a separate rule before dividing.',
            code: 'score_one = 78\nscore_two = 91\nscore_three = 86\ntotal = score_one + score_two + score_three\naverage = total / 3\nprint("Average:", average)',
            language: 'python',
            explanation:
              'The total is 255 and dividing by 3 produces 85.0. Python’s / operator returns a float, which is appropriate for an average that may include a fractional part.',
          },
          {
            title: 'Determine whether a value satisfies a condition',
            problem: 'Decide whether a learner is at least 18 years old.',
            reasoning:
              'Translate “at least 18” into a boundary comparison: age must be greater than or equal to 18. Check the boundary itself as well as a value on each side so the equality case is not missed.',
            code: 'age = 18\nis_adult = age >= 18\nprint(is_adult)',
            language: 'python',
            explanation:
              'The comparison produces True for 18 and larger values, and False for smaller values. The name is_adult records the meaning of the boolean instead of making a reader infer it from a bare comparison.',
          },
          {
            title: 'Read and convert user input',
            problem: 'Ask for a distance in kilometres and display the equivalent in metres.',
            reasoning:
              'The prompt returns text, so convert the response to a number before multiplying. One kilometre is 1,000 metres. This simple version assumes the user types a valid number; robust programs also handle invalid input.',
            code: 'distance_text = input("Distance in kilometres: ")\ndistance_km = float(distance_text)\ndistance_m = distance_km * 1000\nprint("Distance in metres:", distance_m)',
            language: 'python',
            explanation:
              'float converts numeric text such as "1.25" to a number. Multiplication then gives 1250.0 metres. This example assumes valid numeric input; handling conversion errors is a separate topic and is not required by this lesson’s mini-build.',
          },
        ],
        commonMistakes: [
          {
            title: 'Confusing assignment with comparison',
            explanation:
              'Use one equals sign to assign a value, and two to test whether values are equal. In a condition, assignment is not a substitute for a comparison.',
            incorrectCode: 'if score = 100:\n    print("Perfect")',
            correctedCode: 'if score == 100:\n    print("Perfect")',
          },
          {
            title: 'Forgetting that input returns text',
            explanation:
              'Adding two input strings can join their text rather than add their numeric values. Convert the input to int or float first.',
            incorrectCode: 'hours = input("Hours: ")\nprint(hours + 1)',
            correctedCode: 'hours = float(input("Hours: "))\nprint(hours + 1)',
          },
          {
            title: 'Incorrect indentation',
            explanation:
              'Python uses indentation to show which statements belong to a block. Indent the body consistently; do not align it with the block header.',
            incorrectCode: 'if score >= 60:\nprint("Passed")',
            correctedCode: 'if score >= 60:\n    print("Passed")',
          },
          {
            title: 'Mixing incompatible data types',
            explanation:
              'Python will not automatically interpret arbitrary text as a number. Convert deliberately, and remember that conversion can fail for invalid input.',
            incorrectCode: 'study_hours = "2.5"\ntotal = study_hours + 1',
            correctedCode: 'study_hours = float("2.5")\ntotal = study_hours + 1',
          },
          {
            title: 'Using names that hide meaning',
            explanation:
              'Names such as x or n may be fine in a tiny mathematical expression, but they make application code harder to review. Choose names that describe what the value represents.',
            incorrectCode: 'x = 3.4\ny = 4\nz = x * y',
            correctedCode: 'item_price = 3.4\nitem_count = 4\ntotal_cost = item_price * item_count',
          },
          {
            title: 'Coding before understanding the problem',
            explanation:
              'Starting with code can hide unanswered questions about inputs, units and edge cases. Write down the expected input, output and transformation first, then implement the smallest step.',
          },
          {
            title: 'Writing a loop that never makes progress',
            explanation:
              'A while loop may run forever if its condition remains true. Trace the condition and the values it reads on every pass; confirm that the body updates a value that can eventually make the condition false.',
            incorrectCode: 'count = 1\nwhile count <= 3:\n    print(count)',
            correctedCode: 'count = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1',
          },
          {
            title: 'Using the wrong range stop',
            explanation:
              'range stops before its stop value. If you want to include 5, range(1, 5) only visits 1 through 4; use the next integer as the stop.',
            incorrectCode: 'for number in range(1, 5):\n    print(number)  # prints 1, 2, 3, 4',
            correctedCode: 'for number in range(1, 6):\n    print(number)  # prints 1, 2, 3, 4, 5',
          },
          {
            title: 'Confusing list values and indexes',
            explanation:
              'A list index is a position, not the value stored there, and indexes start at zero. Before accessing an item, check the list length and remember that the last valid index is one less than that length.',
            incorrectCode: 'topics = ["loops", "lists"]\nprint(topics[2])',
            correctedCode: 'topics = ["loops", "lists"]\nprint(topics[1])',
          },
          {
            title: 'Printing a function result instead of returning it',
            explanation:
              'print displays text for a person but does not send the value back to the caller. Use return when the caller must store or calculate with a result.',
            incorrectCode: 'def double(number):\n    print(number * 2)\n\nresult = double(4)',
            correctedCode:
              'def double(number):\n    return number * 2\n\nresult = double(4)\nprint(result)',
          },
        ],
        resources: [
          {
            id: 'python-tutorial',
            title: 'The Python Tutorial',
            url: 'https://docs.python.org/3/tutorial/',
            type: 'documentation',
            explanation:
              'Official Python language tutorial. It is written for people new to Python who already have some programming familiarity, so use it as a reference alongside this beginner-first lesson.',
          },
          {
            id: 'python-interpreter',
            title: 'Using the Python Interpreter',
            url: 'https://docs.python.org/3/tutorial/interpreter.html',
            type: 'documentation',
            explanation:
              'Official documentation explaining how to start and use the Python interpreter.',
          },
        ],
        exercises: [
          {
            id: 'py-1-exercise-total',
            title: 'Plan a small purchase',
            instructions:
              'Write a program that stores a unit price and item count, calculates the total, and prints a readable summary. Do not copy the worked example; choose your own values and names. Hint: identify the two inputs and their types before writing the multiplication.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The displayed total equals price multiplied by count.',
              'The summary identifies the quantity and total clearly.',
            ],
            acceptanceCriteria: [
              'Price and quantity have descriptive variable names.',
              'The calculation uses an arithmetic expression.',
              'The output can be understood without inspecting the source.',
            ],
            constraints: ['Use one price and one whole-number quantity.'],
            testCases: [
              'Price 2.5 and quantity 4 should total 10.0.',
              'Quantity 1 should return the unit price.',
            ],
          },
          {
            id: 'py-1-exercise-units',
            title: 'Convert a temperature',
            instructions:
              'Convert a temperature from Celsius to Fahrenheit. The formula is Fahrenheit = Celsius × 9 / 5 + 32. Store the input in a variable and print both the original and converted values. Hint: use parentheses to make the formula grouping clear, then check the freezing-point case.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The program displays the converted temperature.',
              'The calculation follows the given formula and grouping.',
            ],
            acceptanceCriteria: [
              'The variables identify the units.',
              'The conversion uses numeric values and arithmetic.',
              'The result for 0 Celsius is 32 Fahrenheit.',
            ],
            constraints: ['Do not ask for user input in this exercise.'],
            testCases: [
              '0 Celsius should convert to 32 Fahrenheit.',
              '100 Celsius should convert to 212 Fahrenheit.',
            ],
          },
          {
            id: 'py-1-exercise-average',
            title: 'Summarize three scores',
            instructions:
              'Store three numeric scores, calculate their total and average, and print both. Then change one score and confirm that the result changes as expected. Hint: calculate the total once and use that value in the average.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The total is the sum of all three scores.',
              'The average is the total divided by three.',
            ],
            acceptanceCriteria: [
              'All three scores contribute exactly once.',
              'The divisor matches the number of scores.',
              'The average is not rounded before calculation.',
            ],
            constraints: ['Use exactly three scores; do not use a list yet.'],
            testCases: [
              'Scores 70, 80 and 90 should have average 80.',
              'Scores 1, 2 and 2 should have average 5 / 3 (approximately 1.6667).',
            ],
          },
          {
            id: 'py-1-exercise-condition',
            title: 'Check a threshold',
            instructions:
              'Store a numeric value and create a boolean that says whether it is within an allowed range from 10 through 20, including both boundaries. Print a clear result. Hint: the value must satisfy both the lower-bound and upper-bound comparisons.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The program accepts values at both boundaries.',
              'Values below 10 or above 20 do not satisfy the rule.',
            ],
            acceptanceCriteria: [
              'The condition uses comparisons and and.',
              'The boolean variable has a descriptive name.',
            ],
            testCases: [
              '10 and 20 should be inside the range.',
              '9 and 21 should be outside the range.',
            ],
          },
          {
            id: 'py-1-exercise-input',
            title: 'Ask for a study duration',
            instructions:
              'Ask the user for a study duration in hours, convert the response to a number and display the duration in minutes. This exercise assumes valid numeric input. Hint: input returns text; convert it before multiplying by 60.',
            difficulty: 'beginner',
            expectedOutcomes: ['The program converts hours to minutes.'],
            acceptanceCriteria: [
              'The input is converted before arithmetic.',
              'The prompt and output state the units.',
            ],
            constraints: ['Use float conversion so fractional hours are accepted.'],
            testCases: [
              '1 hour should display 60 minutes.',
              '1.5 hours should display 90 minutes.',
            ],
          },
          {
            id: 'py-1-exercise-branches',
            title: 'Classify a score',
            instructions:
              'Given a numeric score from 0 through 100, print "high" for 80 or above, "pass" for 60 through 79, and "keep practising" below 60. Use if, elif and else. Hint: check the highest threshold first so a high score is not caught by a broader lower threshold.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Each score produces exactly one appropriate message.',
              'Boundary scores are assigned to the intended range.',
            ],
            acceptanceCriteria: [
              'The program uses an ordered if/elif/else chain.',
              'The branches cover all valid scores.',
              'The message is printed once after the matching branch.',
            ],
            constraints: ['Assume the stored score is an integer from 0 through 100.'],
            testCases: [
              '80 and 100 should print "high".',
              '60 and 79 should print "pass".',
              '0 and 59 should print "keep practising".',
            ],
          },
          {
            id: 'py-1-exercise-while',
            title: 'Trace and complete a counter',
            instructions:
              'Write a while loop that prints 3, 2, 1 and then "Go!". Initialize the counter, test it in the loop condition and update it on each pass. Hint: decrease the counter by one, and decide whether the loop should include zero.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The three numbers print in descending order.',
              'The loop stops without printing 0 or repeating forever.',
            ],
            acceptanceCriteria: [
              'The loop condition becomes false after three passes.',
              'The counter changes during every pass.',
              '"Go!" prints after the loop.',
            ],
            testCases: [
              'The output lines are 3, 2, 1, Go!.',
              'The loop body runs exactly three times.',
            ],
          },
          {
            id: 'py-1-exercise-for-total',
            title: 'Total a known sequence',
            instructions:
              'Use a for loop and range to calculate the sum of the integers 1 through 5, then print the total. Hint: range stops before its stop value; work out which stop value includes 5.',
            difficulty: 'beginner',
            expectedOutcomes: ['The program prints 15.'],
            acceptanceCriteria: [
              'The total starts at zero before the loop.',
              'Each number from 1 through 5 is added exactly once.',
              'The loop uses range with the correct exclusive stop.',
            ],
            testCases: ['The final total is 15.', 'The loop adds five values.'],
          },
          {
            id: 'py-1-exercise-list',
            title: 'Collect and summarize topics',
            instructions:
              'Create a list of three topics you have practised. Append one more topic, print the first and last topics, and print how many topics are in the list. Hint: the first index is 0; use the list length to find the last valid index.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The updated list contains four topics.',
              'The displayed first and last values match the list.',
            ],
            acceptanceCriteria: [
              'append adds one value at the end.',
              'The program uses valid zero-based indexes.',
              'len reports the updated number of items.',
            ],
            testCases: [
              'The list length is 4 after the append.',
              'Index 0 displays the first topic.',
              'The last valid index displays the appended topic.',
            ],
          },
          {
            id: 'py-1-exercise-function',
            title: 'Write a reusable total function',
            instructions:
              'Define a function that accepts a list of numbers and returns their total. Call it with at least two different lists and print each returned value. Hint: initialize the running total inside the function and return it after the loop finishes.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Each function call returns the sum for its own list.',
              'The caller can store and print the returned result.',
            ],
            acceptanceCriteria: [
              'The function has a parameter for the list.',
              'A for loop adds every value once.',
              'The function uses return, not only print, to provide its result.',
            ],
            testCases: ['A call with [2, 3] returns 5.', 'A call with [1, 2, 3, 4] returns 10.'],
          },
          {
            id: 'py-1-exercise-debug',
            title: 'Debug a loop and trace its output',
            instructions:
              'A learner wants to print each value in [2, 4, 6] and then show the sum, but their code prints a wrong total. Identify the mistake, correct it, and write down the value of total after each loop pass.\n\nnumbers = [2, 4, 6]\ntotal = 0\nfor number in numbers:\n    total = number\n    print(number)\nprint("Total:", total)\n\nHint: compare assignment with accumulation. Ask what the total should remember from earlier passes.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The corrected total is 12.',
              'The traced running totals are 2, 6 and 12.',
            ],
            acceptanceCriteria: [
              'The learner explains why the original code loses earlier values.',
              'The correction accumulates rather than replaces the running total.',
              'The number output remains 2, 4 and 6.',
            ],
            testCases: [
              'The original final total is 6 because each pass replaces total.',
              'The corrected final total is 12.',
            ],
          },
          {
            id: 'py-1-exercise-design',
            title: 'Design a small menu program',
            instructions:
              'Independently design a command-line menu that repeatedly offers two choices and quit. At least one choice must use a list, and repeated interaction must be handled by a loop. Write the menu flow in plain language first, then implement it with functions. Decide and document what happens when the user chooses an unknown option or asks to view an empty list. Hint: separate displaying the menu, handling one choice and repeating until quit.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The menu repeats until the quit choice is selected.',
              'A list is used to store and show user-entered values.',
              'The learner explains the behavior for empty and unknown choices.',
            ],
            acceptanceCriteria: [
              'The program is decomposed into at least two useful functions.',
              'The loop has a clear exit condition.',
              'An if/elif/else chain handles menu choices.',
              'The program is tested with each choice and an unknown choice.',
            ],
            constraints: [
              'Use only input, print, variables, conditions, loops, lists and functions from this lesson.',
              'Do not use files, imports, classes or third-party packages.',
            ],
            testCases: [
              'Choose the list-view option before adding anything.',
              'Add at least two values and view them in order.',
              'Enter an unknown choice and observe the documented response.',
              'Choose quit and confirm the loop ends.',
            ],
          },
        ],
        assessmentQuestions: [
          {
            id: 'py-1-check-interpreter',
            prompt:
              'In your own words, what does the Python interpreter do when you run a source file? How is a syntax error different from a runtime error?',
            expectedAnswer:
              'The interpreter reads Python source and carries out its instructions. A syntax error means the source structure cannot be interpreted; a runtime error occurs while validly structured code is executing an operation that fails.',
            explanation:
              'A useful distinction is when the failure occurs: before the program can proceed because its form is invalid, or during execution because an operation or value is invalid.',
          },
          {
            id: 'py-1-check-assignment',
            prompt:
              'What is the difference between = and == in Python? Predict what value this comparison produces: 5 == 5.',
            expectedAnswer:
              '= assigns a value to a name; == compares two values. The expression 5 == 5 produces True.',
            explanation:
              'A comparison is an expression whose result is a boolean. Assignment changes which value a variable refers to.',
          },
          {
            id: 'py-1-check-input',
            prompt:
              'A user types 12 at an input prompt. What type does input return, and what must you do before using the response as a number?',
            expectedAnswer:
              'input returns a string, even when the typed characters look numeric. Convert it with int(...) for a whole number or float(...) when a fractional value is possible.',
            explanation:
              'The characters are received as text. Conversion explicitly requests a numeric value and may fail if the text is not a valid number.',
          },
          {
            id: 'py-1-check-output',
            prompt:
              'Predict the output and explain the order of operations:\n\nprice = 2.5\ncount = 3\nprint(price * count + 1)',
            expectedAnswer: '8.5',
            explanation:
              'Multiplication is evaluated before addition: 2.5 × 3 is 7.5, then 1 is added.',
          },
          {
            id: 'py-1-check-condition',
            prompt:
              'A pass requires a score of at least 60 and a submitted assignment. Write the condition in words, and explain why either part alone is not enough.',
            expectedAnswer: 'score >= 60 and submitted',
            explanation:
              'The rule requires both facts to be true. and expresses that requirement; or would allow either one alone to pass.',
          },
          {
            id: 'py-1-check-edge-case',
            prompt:
              'You calculate an average as total / number_of_scores. What edge case could make this fail, and what should you decide before coding?',
            expectedAnswer:
              'If there are zero scores, division by zero fails. Decide whether an empty set is prohibited, should produce a message, or has another domain-specific result.',
            explanation:
              'An edge case is an input at or near a boundary of the problem. The correct behavior depends on the requirements, so it should be decided rather than guessed.',
          },
          {
            id: 'py-1-check-debug',
            prompt:
              'A program runs without an error but prints a total that is too large. Describe two steps you could take to find the cause.',
            expectedAnswer:
              'Check the expected result with a small hand-calculated test, inspect the inputs and intermediate values, and verify that each quantity is included exactly once. Change one suspected cause at a time and rerun the test.',
            explanation:
              'Debugging is evidence-driven: reproduce the result, inspect assumptions and narrow the cause. A program can have a logic error even when Python reports no runtime error.',
          },
          {
            id: 'py-1-check-explain',
            prompt:
              'Explain why writing down inputs, outputs and steps before coding can make a solution easier to build and test. Give a small example from this lesson.',
            expectedAnswer:
              'It clarifies what information is needed and what result should be produced, and exposes missing decisions. For a cost calculator, identify price and quantity as inputs, multiply them, and display the total.',
            explanation:
              'A precise outline reduces guesswork, gives you small implementation steps and supplies expected outcomes that can become test cases.',
          },
          {
            id: 'py-1-check-branch-trace',
            prompt:
              'Trace this code for score = 72. Which condition is checked first, what message is printed, and why is the final else skipped?\n\nif score >= 80:\n    print("high")\nelif score >= 60:\n    print("pass")\nelse:\n    print("keep practising")',
            expectedAnswer:
              'The first condition (score >= 80) is false. The elif condition (score >= 60) is true, so the program prints pass. The branch chain stops after the first true condition, so the else is skipped.',
            explanation:
              'Branch order and the first true condition determine the single selected block.',
          },
          {
            id: 'py-1-check-loop-trace',
            prompt:
              'What does this code print, and how many times does the loop body run?\n\ncount = 1\nwhile count <= 3:\n    print(count)\n    count = count + 1',
            expectedAnswer: 'It prints 1, 2 and 3 on separate lines. The body runs three times.',
            explanation:
              'After printing 3, count becomes 4. The next condition check is false, so the loop finishes.',
          },
          {
            id: 'py-1-check-for-range',
            prompt:
              'List the values supplied by range(2, 6). Does the sequence include 6? Explain how you would make a sequence that includes 6.',
            expectedAnswer:
              'It supplies 2, 3, 4 and 5; it does not include 6 because range stops before its stop value. Use range(2, 7) to include 6.',
            explanation: 'The start is included and the stop is excluded.',
          },
          {
            id: 'py-1-check-list',
            prompt:
              'After this code runs, what are the values of topics[0], topics[2] and len(topics)?\n\ntopics = ["variables", "conditions"]\ntopics.append("loops")',
            expectedAnswer: 'topics[0] is "variables", topics[2] is "loops", and len(topics) is 3.',
            explanation:
              'List indexes begin at zero, append adds at the end, and len counts items.',
          },
          {
            id: 'py-1-check-function',
            prompt:
              'In def multiply(value, factor), which names are parameters? In multiply(4, 3), what are the arguments? What does return let the caller do?',
            expectedAnswer:
              'value and factor are parameters; 4 and 3 are arguments. return sends the result back to the caller so it can be stored, printed or used in another expression.',
            explanation:
              'Parameters are names in the function definition. Arguments are the values supplied in a call.',
          },
          {
            id: 'py-1-check-accumulate',
            prompt:
              'A loop starts total = 0 and visits [2, 4, 6]. Why does total = number produce 6 at the end, while total = total + number produces 12?',
            expectedAnswer:
              'Assignment total = number replaces the previous total on every pass, so the final value is the last item, 6. total = total + number carries forward the previous sum and adds each item, producing 12.',
            explanation:
              'Tracing the running value after every pass reveals whether code replaces or accumulates.',
          },
          {
            id: 'py-1-check-print-return',
            prompt:
              'A function prints a calculated value but does not return it. What does the caller receive if it assigns the function call to a variable? Why might that differ from what appears on screen?',
            expectedAnswer:
              'The caller receives None unless the function explicitly returns a value. print only displays the value; return passes a value back to the caller.',
            explanation:
              'Output to a person and a return value for a program are separate behaviors.',
          },
          {
            id: 'py-1-check-plan',
            prompt:
              'You need to collect several topic names until a user chooses to stop, then display them and the count. Which concepts would you combine, and what should happen if the user stops before entering a topic?',
            expectedAnswer:
              'Use a while loop and condition for repeated input and the stop choice, a list and append to store names, a for loop to display each name, len to report the count, and functions to separate tasks if useful. For an empty list, display an explicit empty-state message or otherwise avoid claiming an item exists.',
            explanation:
              'A short plan identifies each concept by its responsibility and makes the empty case part of the requirements.',
          },
        ],
        miniBuild: {
          title: 'Practice Topic Tracker',
          goal: 'Build a small command-line program that lets a learner add practice topics, view the saved-in-memory list and quit. This gives a beginner a real reason to combine input/output, conditions, a while loop, a list, a for loop and small functions. The list lasts only while the program runs; file persistence is intentionally left for a later lesson.',
          requirements: [
            'Show a menu with an option to add a topic, view topics, and quit.',
            'Repeat the menu until the learner selects quit.',
            'Store entered topic names in a list and keep their entry order.',
            'Use a function to display the menu or handle a clearly defined task, and a function that returns a useful value.',
            'When viewing, use a for loop to display each topic and report the total with len.',
            'Handle a blank topic without adding it to the list.',
            'Handle an empty list without trying to access an item that is not there.',
            'Show a clear message when the menu choice is not recognized.',
          ],
          milestones: [
            'Write the menu choices, expected behavior and stop condition in plain language.',
            'Print the menu once and verify that the choices are understandable.',
            'Add a while loop that repeats until quit is selected.',
            'Create an empty list and implement the add option with input, a blank check and append.',
            'Implement the view option with a for loop, len and a clear empty-list message.',
            'Move one coherent task into a function; use parameters and return where the caller needs a result.',
            'Test every menu option, a blank topic, an unknown choice, an empty list and quitting.',
            'Trace one interaction by hand and review the program for clear names and unnecessary repetition.',
          ],
          acceptanceCriteria: [
            'The program continues to show choices until the learner selects quit.',
            'Valid non-empty topics are appended and displayed in the order entered.',
            'A blank topic is not added.',
            'Viewing an empty list gives a useful message and does not raise an index error.',
            'The displayed count matches the number of topics stored.',
            'An unknown menu choice produces a clear response and returns to the menu.',
            'At least two small functions make responsibilities clearer; at least one function returns a value used by its caller.',
            'The implementation uses only concepts taught in this lesson and does not claim to save data after exit.',
          ],
          testCases: [
            'Choose view before adding topics; see the documented empty-list message and count 0.',
            'Add "loops" and "lists", then view; both appear in that order and the count is 2.',
            'Submit only spaces as a topic; the list count does not increase.',
            'Enter an unknown menu choice; see a clear message and the menu appears again.',
            'Choose quit; the program stops without another prompt.',
          ],
        },
        masteryCriteria: [
          'Explain and trace the execution of a short program, including assignments, types, expressions, conditions and the difference between syntax, runtime and logic errors.',
          'Independently write an if/elif/else decision and test the boundary values it is meant to handle.',
          'Independently write a while loop with a clear stop condition and a for loop that processes a sequence; explain how each terminates.',
          'Create and update a list, use valid indexes, append values, check its length and process its items with a loop.',
          'Define and call a function with parameters and arguments, and use a returned value in the caller.',
          'Break an unfamiliar small task into inputs, outputs, steps and edge cases before implementing it.',
          'Debug a basic syntax, runtime or logic problem by reproducing it, tracing values and checking a focused correction.',
          'Complete the Practice Topic Tracker and personally test its normal, empty, invalid-choice and exit behavior.',
          'Treat mastery as demonstrated independent work and explanation; reading the lesson, answering self-checks, saving a draft or marking the lesson complete is not by itself evidence of coding mastery.',
        ],
};
