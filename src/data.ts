export type LessonDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type ResourceType = 'article' | 'documentation' | 'video' | 'paper' | 'book' | 'course';

export type CurriculumResource = {
  id: string;
  title: string;
  url: string;
  type: ResourceType;
  explanation: string;
};

export type ImageMedia = {
  type: 'image';
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  width?: number;
  height?: number;
};

export type VideoMedia = {
  type: 'video';
  provider: 'youtube';
  videoId: string;
  title: string;
  watchUrl: string;
  caption?: string;
  startSeconds?: number;
  credit?: string;
};

export type LessonMedia = ImageMedia | VideoMedia;

// Video placeholder example only; do not add until the video ID is verified:
// { type: 'video', provider: 'youtube', videoId: '<verified-id>', title: 'Video title', watchUrl: 'https://www.youtube.com/watch?v=<verified-id>' }

export type ContentSection = {
  title: string;
  content: string;
  codeExamples?: CodeExample[];
  media?: LessonMedia[];
};

export type CodeExample = {
  title: string;
  code: string;
  language?: string;
  explanation: string;
};

export type WorkedExample = {
  title: string;
  explanation: string;
  problem?: string;
  reasoning?: string;
  solution?: string;
  code?: string;
  language?: string;
  media?: LessonMedia[];
};

export type CurriculumExercise = {
  id: string;
  title: string;
  instructions: string;
  difficulty: LessonDifficulty;
  expectedOutcomes: string[];
  acceptanceCriteria: string[];
  constraints?: string[];
  testCases?: string[];
};

export type AssessmentQuestion = {
  id: string;
  prompt: string;
  expectedAnswer?: string;
  explanation?: string;
};

export type CommonMistake = {
  title: string;
  explanation: string;
  incorrectCode?: string;
  correctedCode?: string;
};

export type LessonMiniBuild = {
  title: string;
  goal: string;
  requirements: string[];
  milestones: string[];
  acceptanceCriteria: string[];
  testCases: string[];
};

export type Lesson = {
  id: string;
  title: string;
  detail: string;
  status: 'current' | 'next' | 'later';
  category: string;
  difficulty?: LessonDifficulty;
  learningObjectives?: string[];
  prerequisites?: string[];
  keyConcepts?: string[];
  contentSections?: ContentSection[];
  workedExamples?: WorkedExample[];
  commonMistakes?: (string | CommonMistake)[];
  interviewRelevance?: string;
  resources?: CurriculumResource[];
  exercises?: CurriculumExercise[];
  assessmentQuestions?: AssessmentQuestion[];
  masteryCriteria?: string[];
  miniBuild?: LessonMiniBuild;
  relatedProjectIds?: string[];
  relatedLabActivityIds?: string[];
  relatedTools?: string[];
  featuredMedia?: LessonMedia[];
};

export type CurriculumStage = {
  id: string;
  name: string;
  tag: string;
  description: string;
  lessons: Lesson[];
};

export const stages: CurriculumStage[] = [
  {
    id: 'python-computing-foundations',
    name: 'Python & Computing Foundations',
    tag: 'START HERE',
    description: 'Become comfortable writing, debugging and structuring small programs.',
    lessons: [
      {
        id: 'py-1',
        title: 'Python fundamentals and problem solving',
        detail:
          'Run small Python programs, use values and input, make decisions, repeat work with loops, collect values in lists, define functions and debug beginner problems.',
        status: 'current' as const,
        category: 'Python',
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
      },
      {
        id: 'py-2',
        title: 'Files, exceptions and modules',
        detail: 'Read and write files, handle errors, import modules and organize small programs.',
        status: 'next' as const,
        category: 'Python',
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
      },
      {
        id: 'py-3',
        title: 'Git, Terminal and Linux Basics',
        detail:
          'Use a terminal to navigate files, run Python programs, and build a safe beginner Git workflow across Linux, macOS and Windows.',
        status: 'later' as const,
        category: 'Systems',
        difficulty: 'beginner',
        prerequisites: ['py-1', 'py-2'],
        learningObjectives: [
          'Explain the difference between a terminal application, a shell and a command prompt, and identify the shell in use.',
          'Use pwd, ls and cd to inspect and navigate directories, with the corresponding PowerShell commands.',
          'Create, inspect, copy, move and safely remove files and directories using paths appropriate to the current shell.',
          'Distinguish relative and absolute paths, recognize common hidden files, and describe a few parts of the Linux filesystem.',
          'Run a Python script from the terminal and inspect a process exit status at a beginner level.',
          'Explain how Git records project history and distinguish Git from GitHub.',
          'Initialize a repository, inspect its status, stage chosen files, create commits and read the commit history.',
          'Use a .gitignore file for generated files and local secrets, and explain why ignored files already tracked by Git need separate handling.',
          'Create and switch branches, merge a simple branch, and recognize a basic merge conflict.',
          'Explain what a remote is and use GitHub-hosted repositories with git push and git pull.',
          'Diagnose common command-not-found, wrong-directory, staging, branch, remote and authentication errors without risking project data or credentials.',
        ],
        keyConcepts: [
          'terminal',
          'shell',
          'command prompt',
          'working directory',
          'relative path',
          'absolute path',
          'hidden file',
          'filesystem root',
          'process',
          'exit status',
          'version control',
          'repository',
          'working tree',
          'staging area',
          'commit',
          '.gitignore',
          'branch',
          'merge',
          'remote',
          'GitHub',
          'push and pull',
        ],
        contentSections: [
          {
            title: '1. Terminal, shell and command prompt',
            content:
              'A terminal is the application window where you type commands and read text output. A shell is the program running inside that window: it interprets the commands, finds programs and passes along their results. “Command prompt” can mean the visible prompt where a shell waits for input, and it is also the name commonly used for the Windows Command Prompt (cmd.exe), which is one particular shell. These terms are related but are not interchangeable.\n\nExamples: Windows Terminal is a terminal application and can host PowerShell or Command Prompt. On macOS, Terminal commonly runs zsh. On Linux, a terminal emulator commonly runs bash or another shell. Commands can differ between shells even when they have similar names. This lesson labels Linux/macOS shell examples and PowerShell alternatives; Git commands are generally the same in either shell.\n\nA terminal does not guarantee that Git or Python is installed. Check before relying on them. If a command is unavailable, install the software using its official instructions or ask an administrator; do not download an untrusted executable. In PowerShell, Python may be available as python or through the Windows launcher py; Linux and macOS commonly use python3.',
            codeExamples: [
              {
                title: 'Check which tools are available',
                language: 'shell',
                code: 'git --version\npython --version\npython3 --version',
                explanation:
                  'Each command asks the shell to run a program that prints its version. Some systems have python but not python3, or the reverse. A “command not found” or “not recognized” message means the command is unavailable by that name, not that the project is broken.',
              },
            ],
          },
          {
            title: '2. Find your location and move between directories',
            content:
              'A directory is a folder. The shell keeps a current working directory: the location from which relative paths are interpreted and where commands usually operate. Check it before creating, moving or removing files. pwd prints the current directory in common Linux/macOS shells; PowerShell provides Get-Location (and the familiar pwd alias). ls lists directory contents; PowerShell uses Get-ChildItem (with ls as an alias). cd changes the current directory; PowerShell uses Set-Location.\n\nA relative path is interpreted from the current working directory, such as projects/cli-practice. An absolute path names a location from the filesystem root, such as /home/ada/projects on Linux or macOS, or C:/Users/Ada/projects in PowerShell. A path containing spaces should be quoted, for example cd "Course Notes".\n\nLinux and macOS commonly treat names that start with a dot, such as .git and .venv, as hidden in ordinary listings; use ls -a to include them. In Windows, hidden status is generally a file attribute, so use Get-ChildItem -Force in PowerShell. The Linux filesystem begins at /. Common locations include /home for user directories, /tmp for temporary files, /etc for system configuration, and /usr for installed system software. Do not edit system locations for this lesson. macOS and Windows have different filesystem layouts; do not assume Linux paths exist there.',
            codeExamples: [
              {
                title: 'Inspect and navigate in Linux or macOS shells',
                language: 'bash',
                code: 'pwd\nls -la\ncd projects\npwd',
                explanation:
                  'The first command reports the current location, ls -la includes hidden entries, and cd projects enters a child directory named projects if it exists. The final pwd confirms where you landed.',
              },
              {
                title: 'The PowerShell equivalents',
                language: 'powershell',
                code: 'Get-Location\nGet-ChildItem -Force\nSet-Location projects\nGet-Location',
                explanation:
                  'These PowerShell commands perform the same basic tasks. PowerShell has aliases such as pwd, ls and cd, but using the full command names makes the shell-specific behavior clearer to a beginner.',
              },
            ],
          },
          {
            title: '3. Create and manage files carefully',
            content:
              'Use mkdir to create a directory, then move into it with cd before working on its contents. touch creates an empty file or updates its timestamp on Linux/macOS. In PowerShell, New-Item -ItemType File creates a file; first check that the path does not already exist so you do not replace existing work. cat displays a file in common shells; PowerShell’s full command name is Get-Content. cp copies, mv moves or renames, and rm removes files on Linux/macOS. In PowerShell, use Copy-Item, Move-Item and Remove-Item.\n\nCommands act on the paths you provide, often relative to the current directory. Before a destructive operation, inspect the current directory with pwd or Get-Location and confirm the exact target with ls or Get-ChildItem. rm is not a recycle-bin command: it can permanently remove the named file. Recursive removal can erase an entire directory tree. PowerShell’s Remove-Item -Recurse is similarly consequential. Do not experiment with deletion on real project data, broad paths, wildcards or system directories. Practice only on a disposable directory whose contents you have checked.',
            codeExamples: [
              {
                title: 'Create and inspect a scratch file on Linux/macOS',
                language: 'bash',
                code: 'mkdir cli-practice\ncd cli-practice\ntouch notes.txt\ncat notes.txt\ncp notes.txt notes-copy.txt\nmv notes-copy.txt archived-notes.txt\nls -la',
                explanation:
                  'This creates a practice folder and an empty file, displays it, copies the file, renames the copy, and lists the results. cat prints nothing for an empty file. No files are removed.',
              },
              {
                title: 'Create and inspect a scratch file in PowerShell',
                language: 'powershell',
                code: 'New-Item -ItemType Directory -Path cli-practice\nSet-Location cli-practice\nif (-not (Test-Path notes.txt)) { New-Item -ItemType File -Path notes.txt }\nGet-Content notes.txt\nCopy-Item notes.txt notes-copy.txt\nMove-Item notes-copy.txt archived-notes.txt\nGet-ChildItem -Force',
                explanation:
                  'Test-Path avoids creating or replacing notes.txt when it already exists. The remaining commands create, inspect, copy, rename and list practice files. Check paths before applying these operations to important data.',
              },
            ],
          },
          {
            title: '4. Run Python programs and understand processes',
            content:
              "A process is a running instance of a program. When you enter a command such as python hello.py, the shell starts Python as a process and normally waits for it to finish before accepting the next command. A long-running program may keep using the terminal until it exits. Ctrl+C requests an interrupt in many terminals; the program may stop, so use it only when you intend to interrupt that run.\n\nMove to the directory containing the script, verify the filename with a directory listing, and run it with the Python command available on your system. For example, use python hello.py on Windows when python is configured, or py hello.py with the Windows launcher; use python3 hello.py on many Linux/macOS systems. The Python version check from the first section helps you choose. A process finishes with an exit status: zero conventionally means success, while a nonzero value signals that the command reported a problem. The exact value is chosen by the program.\n\nOn Linux/macOS, echo $? prints the immediately preceding command's status. In PowerShell, $LASTEXITCODE reports the last native program's exit code; $? is only a success/failure boolean for the preceding command. In Command Prompt, %ERRORLEVEL% reports the previous program's status. Check it before running another command that might change it.",
            codeExamples: [
              {
                title: 'Run a tiny script and check its result',
                language: 'python',
                code: 'print("Hello from the terminal")',
                explanation:
                  'Save this as hello.py, then run python hello.py (or py hello.py in PowerShell, or python3 hello.py on many Linux/macOS systems). It prints one line and normally exits with status zero. If Python cannot be found, check its installation and command name rather than changing the script.',
              },
              {
                title: 'Read an exit status immediately',
                language: 'bash',
                code: 'python3 hello.py\necho $?',
                explanation:
                  'The first command runs the program. The second prints its exit status: zero conventionally indicates success. In PowerShell, inspect $LASTEXITCODE after the Python command; in Command Prompt, inspect %ERRORLEVEL%.',
              },
            ],
          },
          {
            title: '5. Git records project history',
            content:
              'Git is a version-control system. It records snapshots of selected project files so you can understand what changed, when it changed, and return to an earlier committed state. A Git repository is a project directory with Git history and settings stored in a hidden .git directory. Git is useful even for a solo project: small, named commits make experiments and debugging easier.\n\nGitHub is a hosting and collaboration platform for Git repositories; it is not Git itself. You can use Git locally without a GitHub account or network connection. To check for Git, run git --version. If Git is not installed, follow the official installation instructions for your operating system before continuing.\n\nBefore the first commit, Git may ask for an author name and email. Configure these deliberately with git config; this is commit attribution, not an authentication password. Do not put an access token or password in Git configuration, a file in the project, a command that might be saved in shell history, or a commit.',
            codeExamples: [
              {
                title: 'Set commit attribution and create a local repository',
                language: 'shell',
                code: 'git config --global user.name "Ada Lovelace"\ngit config --global user.email "ada@example.com"\nmkdir study-tools\ncd study-tools\ngit init',
                explanation:
                  'Replace the sample name and email with the attribution you want on your commits. These values identify authorship; they are not passwords. git init creates local repository metadata in .git. It does not upload files or create a GitHub repository.',
              },
            ],
          },
          {
            title: '6. Check, stage and commit a change',
            content:
              'Git separates your working tree (the files you are editing) from the staging area (the exact changes selected for the next snapshot). git status summarizes both. git add README.md stages that file; git add . stages all eligible changes under the current directory, so inspect status before using it. git commit -m "Add project overview" records the staged snapshot with a short message. A commit includes only staged changes, not every unsaved or unstaged idea.\n\nA useful beginner cycle is: edit a small coherent change, run git status, stage the intended files, run git status again to review the staged list, then commit with a message describing the change. Use git log --oneline to inspect recent commits. If Git reports that there is nothing to commit, check whether you changed and saved a file, whether it is ignored, and whether you staged it.',
            codeExamples: [
              {
                title: 'Make and inspect a first commit',
                language: 'shell',
                code: 'git status\nprintf "# Study tools\\n" > README.md\ngit status\ngit add README.md\ngit status\ngit commit -m "Add project overview"\ngit log --oneline',
                explanation:
                  'This uses printf to create a short README in Linux/macOS shells. In PowerShell, create it with Set-Content README.md "# Study tools". The status checks make the change visible before and after staging; the commit records the staged file, and log displays the new history.',
              },
            ],
          },
          {
            title: '7. Ignore generated files and keep secrets out of Git',
            content:
              "A .gitignore file lists paths Git should normally leave untracked. Python projects commonly ignore virtual environments, bytecode caches and local environment-variable files. For example, .venv/ is a local environment directory, __pycache__/ and *.py[cod] are generated Python bytecode, and .env often contains local configuration. Track the .gitignore itself so collaborators receive the same ignore rules. A safe .env.example may document required variable names with clearly fake placeholder values; never commit real passwords, API keys, access tokens, private keys or other credentials.\n\nExample patterns are relative to the repository and can match in subdirectories. Ignoring is not the same as deleting. If a file was already committed, adding it to .gitignore does not remove it from repository history or stop tracking it. If a real credential was committed or pushed, treat it as exposed: revoke or rotate it using the provider's instructions, then follow an appropriate history-removal process if necessary. Simply deleting the visible file is not enough to make a leaked secret safe.",
            codeExamples: [
              {
                title: 'A beginner Python .gitignore',
                language: 'gitignore',
                code: '.venv/\n__pycache__/\n*.py[cod]\n.env',
                explanation:
                  'These rules omit a project-local virtual environment, Python cache directories and bytecode files, and a local .env file. Add the rules before staging generated or private files, then check git status. Never test secret handling with a real credential.',
              },
            ],
          },
          {
            title: '8. Branches let you work on an isolated change',
            content:
              'A branch is a named line of development. It lets you make a change separately from the branch you use as the main project line. git branch lists local branches. git switch branch-name moves to an existing branch; git switch -c branch-name creates and switches to a new one. Commits made on that branch belong to its history until you merge them into another branch.\n\nTo merge a simple finished change, switch to the branch that should receive it (often main), then run git merge feature-name. Git combines the histories. If both branches changed the same lines in incompatible ways, Git pauses with a merge conflict. Read the marked file, decide what the final content should be, remove conflict markers, test the result, stage the resolved file and complete the merge commit if Git requests it. Do not blindly choose a side without understanding which work would be discarded.',
            codeExamples: [
              {
                title: 'Make and merge a small branch',
                language: 'shell',
                code: 'git switch -c add-notes\nprintf "Practice one small change at a time.\\n" > NOTES.txt\ngit add NOTES.txt\ngit commit -m "Add practice note"\ngit switch main\ngit merge add-notes\ngit log --oneline',
                explanation:
                  'The example creates a branch, commits a new file, switches back to main and merges the branch. Run it in a scratch repository with a main branch. If the branch is named master instead, use that existing name or rename it intentionally; do not assume every repository uses main.',
              },
            ],
          },
          {
            title: '9. Remotes connect Git to GitHub',
            content:
              'A remote is a named address for another copy of a Git repository, usually hosted on a service such as GitHub. Create an empty repository on GitHub (without initializing another README if you already have local commits), copy its repository URL from GitHub, and add it as origin with git remote add origin URL. git remote -v displays configured addresses. The URL is not a password; do not embed credentials in it.\n\nAfter a local commit, git push -u origin main sends commits from your local main branch to the remote and records an upstream relationship for later pushes. Use the actual branch name if it is not main. git pull origin main retrieves and integrates changes from the remote main branch into the current branch; review the target branch and working tree before pulling. Authentication is handled through the approved Git credential flow for your setup. Never paste passwords or tokens into lesson notes, source files, command history, or a repository.',
            codeExamples: [
              {
                title: 'Connect an existing local repository',
                language: 'shell',
                code: 'git remote add origin https://github.com/USERNAME/REPOSITORY.git\ngit remote -v\ngit push -u origin main\ngit pull origin main',
                explanation:
                  'Replace the URL with the repository URL copied from your own GitHub repository and confirm the branch name. The first push publishes the local commits; a later pull integrates remote commits. The remote should be the intended repository, and the URL must not contain a token or password.',
              },
            ],
          },
          {
            title: '10. Troubleshoot with evidence',
            content:
              'When a command fails, pause and read the complete message rather than repeating it with more flags. Check the current directory, exact spelling, capitalization, quoting and whether the required tool is installed. “No such file or directory” often means the path is wrong or you are in a different directory. “Permission denied” means the current account cannot perform that operation; do not reach for administrator privileges without understanding why.\n\nFor Git, use git status first. “Not a git repository” usually means you are outside the repository or have not initialized one. “Nothing to commit” can mean the edit was not saved, no change exists, or the file is ignored. A push that says there is no upstream needs the correct remote and branch association; a rejected push may mean the remote contains changes you do not have. Inspect the repository and ask for help before force-pushing or deleting files. A conflict is a request to reconcile edits, not a reason to erase the repository.',
          },
        ],
        workedExamples: [
          {
            title: 'Example 1: Identify the shell and current directory',
            problem:
              'You open Windows Terminal and see a PowerShell prompt. You need to know where a relative file path will point.',
            reasoning:
              'The terminal is the window; PowerShell is the shell. Ask the shell for its current location before using relative paths, and list files including hidden entries.',
            solution: 'Get-Location\nGet-ChildItem -Force',
            explanation:
              'Get-Location reports the working directory. Get-ChildItem -Force displays entries that ordinary listings may hide. On Linux/macOS, the corresponding commands are pwd and ls -la.',
          },
          {
            title: 'Example 2: Safely copy and rename a practice file',
            problem:
              'Create a copy of a notes file and rename the copy without altering the original.',
            reasoning:
              'First verify the directory and source file. Copy before renaming so the original remains in place. Inspect the result.',
            solution:
              'pwd\nls -l notes.txt\ncp notes.txt notes-copy.txt\nmv notes-copy.txt notes-archive.txt\nls -l notes.txt notes-archive.txt',
            explanation:
              'The original notes.txt remains; the copy ends up named notes-archive.txt. In PowerShell, use Get-Location, Get-Item, Copy-Item and Move-Item. This example intentionally avoids rm.',
          },
          {
            title: 'Example 3: Run a Python script from its folder',
            problem:
              'A script named report.py is in a project directory, and the shell says it cannot find the file.',
            reasoning:
              'A relative filename is resolved from the current working directory, not automatically from the script editor. Check location and contents, then move to the project folder or provide the correct path.',
            solution: 'pwd\nls\ncd projects/reporting\nls\npython3 report.py',
            explanation:
              'The listing verifies whether report.py is in the current folder. After changing to the folder containing it, run the program. On Windows, try python report.py or py report.py as appropriate. Do not assume the script is broken until its path and Python command are checked.',
          },
          {
            title: 'Example 4: Make a small, reviewable commit',
            problem: 'You edited README.md and want to save that change in local Git history.',
            reasoning:
              'Use status to inspect the working tree, stage only the intended file, check status again, and commit with a message that explains the change.',
            solution:
              'git status\ngit add README.md\ngit status\ngit commit -m "Explain project setup"\ngit log --oneline',
            explanation:
              'The staging area defines what enters the commit. The final log line helps confirm that the commit is now part of the local history.',
          },
          {
            title: 'Example 5: Keep local environment files out of commits',
            problem:
              'A Python project creates a .venv directory and uses a local .env configuration file.',
            reasoning:
              'Ignore generated environments and local configuration before staging. Check Git status to see whether Git still lists anything that should remain private.',
            solution: '.venv/\n__pycache__/\n*.py[cod]\n.env',
            explanation:
              'Save these lines in the repository’s .gitignore file and commit that file. Do not put real secrets in .env.example. If .env was already tracked or a credential was committed, ignore rules alone do not repair the exposure.',
          },
          {
            title: 'Example 6: Commit a branch and merge it into main',
            problem:
              'Add a small independent documentation file without making the change directly on main.',
            reasoning:
              'Create a branch, make and commit the isolated change, return to main, then merge the branch and inspect history.',
            solution:
              'git switch -c add-setup-note\ngit add SETUP.md\ngit commit -m "Add setup note"\ngit switch main\ngit merge add-setup-note\ngit log --oneline',
            explanation:
              'The branch provides a separate name for the work until it is merged. This simple case adds a new file, so it should not conflict with unchanged files. Repositories can use a different main-branch name.',
          },
        ],
        commonMistakes: [
          {
            title: 'Confusing the terminal with the shell',
            explanation:
              'The terminal is the application window; a shell such as PowerShell, bash or zsh interprets commands inside it. If a command example fails, first check which shell is running and use that shell’s equivalent.',
          },
          {
            title: 'Using a relative path from the wrong directory',
            explanation:
              'Relative paths start from the current working directory. Use pwd or Get-Location, list files, then cd to the expected directory or enter a correctly quoted path.',
            incorrectCode: 'python report.py',
            correctedCode: 'pwd\nls\ncd projects/reporting\npython3 report.py',
          },
          {
            title: 'Treating rm as a safe undo command',
            explanation:
              'rm can permanently remove files, and recursive deletion can remove many files at once. There is no universal undo. Check your location and the exact target first, practice only on disposable data, and do not use broad wildcards or elevated privileges to “make it work.”',
            incorrectCode: 'rm -rf *',
          },
          {
            title: 'Expecting git add to create a commit',
            explanation:
              'git add stages selected changes; git commit records the staged snapshot. Check status between the two so you know exactly what will be committed.',
            incorrectCode: 'git add README.md',
            correctedCode:
              'git status\ngit add README.md\ngit status\ngit commit -m "Describe the change"',
          },
          {
            title: 'Expecting .gitignore to untrack an existing file',
            explanation:
              'Ignore rules apply to untracked files. A file already committed remains tracked even after its name is added to .gitignore. Do not assume a committed credential is safe; revoke or rotate it promptly and follow an appropriate cleanup process.',
          },
          {
            title: 'Committing secrets or authentication tokens',
            explanation:
              'Never commit passwords, API keys, access tokens, private keys or real credential files. Use the provider’s secure credential mechanism, keep local secrets outside version control, and review staged files with git status before each commit. If a secret is exposed, rotate or revoke it even if the file is later removed.',
          },
          {
            title: 'Assuming every system uses the same commands and paths',
            explanation:
              'Linux/macOS shells and PowerShell have overlapping command names but different behavior and path conventions. In particular, Unix dotfiles and Windows hidden attributes differ. Use the lesson’s labeled alternatives and inspect help for the shell you are using.',
          },
          {
            title: 'Pushing to the wrong branch or remote',
            explanation:
              'Before pushing, inspect git status, git branch --show-current and git remote -v. Confirm the remote address and branch. Never force-push or paste a token into a remote URL just to get past an error.',
          },
        ],
        resources: [
          {
            id: 'py-3-resource-git-book',
            title: 'Pro Git: About Version Control',
            url: 'https://git-scm.com/book/en/v2/Getting-Started-About-Version-Control',
            type: 'book',
            explanation:
              'An official, freely available book introducing version control and the role Git plays.',
          },
          {
            id: 'py-3-resource-git-reference',
            title: 'Git command reference',
            url: 'https://git-scm.com/docs',
            type: 'documentation',
            explanation:
              'Official reference pages for commands such as status, add, commit, branch, switch, merge, push and pull.',
          },
          {
            id: 'py-3-resource-github-git',
            title: 'GitHub Docs: About Git and GitHub',
            url: 'https://docs.github.com/en/get-started/start-your-journey/about-github-and-git',
            type: 'documentation',
            explanation:
              'Explains the difference between Git version control and GitHub as a collaboration and hosting platform.',
          },
          {
            id: 'py-3-resource-github-ignore',
            title: 'GitHub Docs: Ignoring files',
            url: 'https://docs.github.com/en/get-started/git-basics/ignoring-files',
            type: 'documentation',
            explanation:
              'Official guidance on .gitignore patterns and files that should not be tracked.',
          },
          {
            id: 'py-3-resource-powershell',
            title: 'Microsoft Learn: Get started with PowerShell',
            url: 'https://learn.microsoft.com/en-us/powershell/scripting/learn/ps101/01-getting-started?view=powershell-7.5',
            type: 'documentation',
            explanation:
              'An introductory, official guide to PowerShell commands and shell concepts.',
          },
          {
            id: 'py-3-resource-python-cli',
            title: 'Python documentation: Using Python on the command line',
            url: 'https://docs.python.org/3/using/cmdline.html',
            type: 'documentation',
            explanation:
              'Official reference for invoking the Python interpreter and running scripts.',
          },
          {
            id: 'py-3-resource-ubuntu-cli',
            title: 'Ubuntu: The Linux command line for beginners',
            url: 'https://ubuntu.com/tutorials/command-line-for-beginners',
            type: 'course',
            explanation: 'A beginner-oriented introduction to using a Linux command line.',
          },
        ],
        exercises: [
          {
            id: 'py-3-exercise-shell-orientation',
            title: '1. Identify your terminal and shell',
            instructions:
              'Open the terminal you intend to use for Python work. Identify the terminal application and shell shown in the prompt or application settings. Run the version checks for Git and Python from this lesson. If one command is unavailable, record the exact message and consult the official installation instructions before installing anything.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'You can name the terminal application and the shell it is running.',
              'You know whether Git and a Python command are available.',
            ],
            acceptanceCriteria: [
              'Distinguish the terminal window from the shell interpreting commands.',
              'Record the exact Python command that works, if installed.',
              'Do not install software from an unofficial download source.',
            ],
            constraints: [
              'Do not paste personal system details or credentials into a public repository.',
            ],
          },
          {
            id: 'py-3-exercise-navigate',
            title: '2. Navigate a practice directory',
            instructions:
              'In a safe location such as your user directory, create a directory named cli-practice, enter it, and confirm your new working directory. List ordinary and hidden entries using the appropriate command for your shell. Return to the parent directory and enter the practice folder again using a relative path. Hint: compare pwd/Get-Location before and after cd/Set-Location.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The working directory ends at cli-practice.',
              'You can explain how the relative path was resolved.',
            ],
            acceptanceCriteria: [
              'Create the practice directory without changing existing files.',
              'Show the current location and list hidden entries.',
              'Navigate into and out of the directory successfully.',
            ],
          },
          {
            id: 'py-3-exercise-files',
            title: '3. Create, view, copy and rename files',
            instructions:
              'Inside cli-practice, create a small text file with a few non-sensitive lines using a text editor. Display it with cat or Get-Content, copy it, rename the copy, and list both files. Then, only if you are certain you are still inside this disposable practice folder and have checked the exact filename, remove the renamed copy with rm or Remove-Item. Do not use a wildcard or recursive deletion.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The original text file remains unchanged.',
              'The renamed copy is removed only after its location and exact name are verified.',
            ],
            acceptanceCriteria: [
              'Use a shell-appropriate create/copy/rename/display command.',
              'Confirm the original remains before removing the practice copy.',
              'Explain why rm and Remove-Item should be used cautiously.',
            ],
            constraints: ['Use only disposable test files; do not use real or valuable data.'],
          },
          {
            id: 'py-3-exercise-paths',
            title: '4. Compare relative and absolute paths',
            instructions:
              'From cli-practice, write down the relative path to your text file and inspect the absolute current directory. Change to a different directory and try to display the file using the old relative path; explain why that attempt behaves differently. Then use an absolute path or return to the correct directory and display the file. Quote any path that contains spaces.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The file can be located from both the practice directory and another location.',
              'You can explain which part of the path changes with the working directory.',
            ],
            acceptanceCriteria: [
              'Identify one relative path and one absolute path.',
              'Use pwd/Get-Location to establish the base of a relative path.',
              'Do not move or delete the file during the test.',
            ],
          },
          {
            id: 'py-3-exercise-run-python',
            title: '5. Run a Python script from the terminal',
            instructions:
              'Create hello.py in cli-practice with a short print statement. Use the Python command that worked on your system to run it from the terminal. Check the output and, immediately afterward, inspect the exit status using the syntax for your shell. Try running a deliberately misspelled filename and diagnose the message without renaming or deleting files blindly.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The script prints the expected line and finishes successfully.',
              'The missing-file attempt produces a useful path-based diagnosis.',
            ],
            acceptanceCriteria: [
              'Run the saved script from its containing directory.',
              'Check the exit status before another command changes it.',
              'Explain the difference between a missing script path and a Python syntax error.',
            ],
          },
          {
            id: 'py-3-exercise-first-commit',
            title: '6. Initialize Git and make a first commit',
            instructions:
              'Create a separate directory named git-practice and initialize a repository in it. Create a README.md with a short project description. Inspect status, stage only README.md, inspect status again, commit with a meaningful message, and inspect the one-line history. If Git asks for author attribution, configure a name and email you intend to use; never enter a password or access token.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The local repository contains a commit for README.md.',
              'The working tree is clean after the commit.',
            ],
            acceptanceCriteria: [
              'Run git init in the intended practice directory.',
              'Use git status before and after staging.',
              'Create one commit and verify it with git log --oneline.',
            ],
            constraints: [
              'Keep this repository local; no GitHub account is required for this exercise.',
            ],
          },
          {
            id: 'py-3-exercise-ignore',
            title: '7. Add and verify a .gitignore',
            instructions:
              'In git-practice, create a .gitignore containing .venv/, __pycache__/, *.py[cod] and .env. Create only empty, disposable test paths such as __pycache__/sample.pyc and a fake .env containing no credentials. Check git status and confirm these test paths are not offered as ordinary untracked files, while .gitignore itself can be staged. Remove only the fake test files using carefully checked exact paths, or leave them inside the disposable repository.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Git ignores the generated and local configuration test paths.',
              '.gitignore remains a file that can be committed.',
            ],
            acceptanceCriteria: [
              'Explain what each ignore pattern is intended to exclude.',
              'Verify results with git status.',
              'Do not create or use a real secret, even temporarily.',
            ],
            constraints: [
              'Do not use a real .env file or any credential.',
              'Ignore rules do not untrack files that were already committed.',
            ],
          },
          {
            id: 'py-3-exercise-branch',
            title: '8. Create, switch and merge a branch',
            instructions:
              'In the clean git-practice repository, check the current branch name. Create a branch named add-notes, add a new small NOTES.md file, and commit it on that branch. Switch back to the repository’s original main branch (it may be called master) and merge add-notes. Inspect the history and status. Because the change adds a new file, it should merge without conflicting edits.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The NOTES.md change appears in the main branch after merging.',
              'The repository history contains the branch commit.',
            ],
            acceptanceCriteria: [
              'Create and switch to a branch with git switch -c.',
              'Commit a change on the branch.',
              'Switch to the receiving branch, merge, and verify status and log.',
            ],
          },
          {
            id: 'py-3-exercise-remote',
            title: '9. Connect a repository to GitHub (optional account)',
            instructions:
              'If you have a GitHub account and are permitted to publish this practice project, create an empty GitHub repository without a generated README, copy its HTTPS or SSH URL, and connect it as origin. Verify it with git remote -v, then push the correct branch. If you do not have an account or do not want to publish, explain in your own words what git remote add, git push and git pull would do without running them. Never put a password or token in the URL or repository.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'You understand the role of a remote and the direction of push and pull.',
              'If performed, the intended local branch is published to the intended GitHub repository.',
            ],
            acceptanceCriteria: [
              'Confirm the remote address and branch before publishing.',
              'Use an approved credential flow if authentication is required.',
              'Never include credentials in a remote URL, note, source file or commit.',
            ],
          },
          {
            id: 'py-3-exercise-troubleshooting',
            title: '10. Diagnose common command and Git errors',
            instructions:
              'For each scenario, write down the first safe check you would make and the likely cause: (a) python reports that it cannot find a file, (b) git says “not a git repository”, (c) git commit says there is nothing to commit, and (d) git push is rejected because the remote has changes. Do not run destructive fixes or force-push. Use the lesson examples and official references to explain each diagnosis.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Each failure is paired with an evidence-based check rather than a guessed destructive command.',
              'You can distinguish a local path problem from Git state or remote synchronization.',
            ],
            acceptanceCriteria: [
              'Check location and filenames for the Python path issue.',
              'Check location and repository status for Git issues.',
              'Check the staging area and saved edits for nothing-to-commit.',
              'Inspect branch and remote state before resolving a rejected push.',
            ],
            constraints: ['Do not force-push, delete repository metadata, or expose credentials.'],
          },
        ],
        assessmentQuestions: [
          {
            id: 'py-3-check-shell',
            prompt:
              'Explain the difference between a terminal application and a shell. Give one example of a terminal application and one shell.',
            expectedAnswer:
              'The terminal is the application window for text input/output; the shell interprets commands inside it. For example, Windows Terminal can host PowerShell, or macOS Terminal can host zsh.',
            explanation:
              'Knowing which shell is active helps select commands and syntax that actually apply.',
          },
          {
            id: 'py-3-check-path',
            prompt:
              'If the current directory is /home/ada and you run cat notes/today.txt, what does the path identify? How could changing the current directory affect the command?',
            expectedAnswer:
              'It identifies notes/today.txt relative to /home/ada, so the resulting path is /home/ada/notes/today.txt. From a different current directory, the same relative path may identify another file or no file at all.',
            explanation:
              'A relative path is based on the process current working directory; an absolute path starts at the filesystem root.',
          },
          {
            id: 'py-3-check-delete',
            prompt:
              'Why should you check your current location and the exact target before using rm? Name one safer practice for a beginner.',
            expectedAnswer:
              'rm can permanently remove the named file and recursive forms can erase many files. Check pwd and list the exact disposable target first; practice only in a scratch directory and avoid wildcards or recursive deletion.',
            explanation:
              'Destructive commands should be intentional and limited to a verified target. They are not a substitute for backups.',
          },
          {
            id: 'py-3-check-process',
            prompt:
              'What does an exit status of zero conventionally mean? How do you inspect the last native program exit code in PowerShell?',
            expectedAnswer:
              'Zero conventionally indicates success. In PowerShell, inspect $LASTEXITCODE after the native program; $? is a boolean success indicator, not the numeric exit code.',
            explanation:
              'Exit statuses allow programs and scripts to report success or failure to the shell.',
          },
          {
            id: 'py-3-check-git',
            prompt:
              'Describe the difference between the working tree, staging area and a commit. Which command records the staged snapshot?',
            expectedAnswer:
              'The working tree contains current files, the staging area selects changes for the next snapshot, and a commit records that staged snapshot in repository history. git commit records it.',
            explanation:
              'The staging step lets you choose which changes belong together in a commit.',
          },
          {
            id: 'py-3-check-ignore',
            prompt:
              'Does adding a file to .gitignore remove it from Git if it was already committed? What should you do if a real API key was pushed?',
            expectedAnswer:
              'No. Ignore rules do not stop tracking an already committed file. If a real key was pushed, revoke or rotate it immediately using the provider’s process; then follow an appropriate repository-history cleanup process.',
            explanation:
              'Deleting a secret from the latest version does not make an exposed credential safe, because it may remain in history or copies.',
          },
          {
            id: 'py-3-check-branch',
            prompt:
              'What does git switch -c experiment do? Which branch should be checked out before merging experiment into main?',
            expectedAnswer:
              'It creates a branch named experiment and switches to it. To merge that work into main, switch to main first and run git merge experiment.',
            explanation:
              'A merge integrates the named branch into the currently checked-out branch.',
          },
          {
            id: 'py-3-check-github',
            prompt:
              'What is the difference between Git and GitHub? At a high level, what do push and pull do?',
            expectedAnswer:
              'Git is a version-control tool that records repository history. GitHub hosts Git repositories and adds collaboration features. Push sends local commits to a remote; pull retrieves and integrates remote changes into the current branch.',
            explanation:
              'A local Git repository works without GitHub; GitHub is one service that can host a remote copy.',
          },
          {
            id: 'py-3-check-troubleshoot',
            prompt:
              'Git says “not a git repository.” Name two safe checks to make before running another command.',
            expectedAnswer:
              'Check the current directory with pwd/Get-Location and list its contents. Confirm you are in the intended repository and that it contains the .git metadata; do not initialize a new repository or delete files until you know where you are.',
            explanation:
              'The message often indicates a location problem, so inspect the shell’s location before changing repository state.',
          },
        ],
        miniBuild: {
          title: 'Build a Tracked Python Study Utility',
          goal: 'Create a small, local Python project directory, run a simple script, and use Git to record a clean, reviewable history. The goal is to practise the command-line and version-control workflow, not to build a large application or publish secrets.',
          requirements: [
            'Create a project directory named study-utility and confirm its location before working in it.',
            'Add a small Python script that prints a useful study reminder or lists a few hard-coded study tasks; use only Python concepts already introduced.',
            'Add a README.md that explains the project purpose and how to run the script from the project directory.',
            'Add a .gitignore that excludes .venv/, __pycache__/, *.py[cod] and .env.',
            'Initialize a local Git repository and make separate, meaningful commits for the initial project, ignore rules, and one later improvement.',
            'Use git status and git log --oneline to inspect the final working tree and history.',
            'Optionally connect the repository to a new empty GitHub repository and push the intended branch only after checking the remote and staged files.',
            'Do not add real credentials, generated environment files, or unrelated personal data.',
          ],
          milestones: [
            'Choose a safe parent location, create study-utility, enter it, and verify the working directory.',
            'Create the Python script and README; run the script from the terminal and check its output.',
            'Initialize Git, inspect status, stage the intended source and documentation, and make the first meaningful commit.',
            'Create .gitignore before adding generated or local configuration files; inspect status and commit the ignore rules.',
            'Make one small improvement, review the staged changes, and create a third descriptive commit.',
            'Inspect the final commit list and clean status. Optionally add a branch and merge or publish to a verified GitHub remote.',
          ],
          acceptanceCriteria: [
            'The project is stored in the intended directory and the Python script runs from the terminal.',
            'README instructions accurately describe how to run the script.',
            'The repository contains at least three meaningful commits with messages that describe their changes.',
            'git status shows no unintended generated files, environment directories, credentials, or unstaged work.',
            'The ignore rules are themselves committed and the script, README and .gitignore are tracked.',
            'The learner can explain which changes were staged for each commit and read the history using git log --oneline.',
            'If publishing, the remote URL and branch are verified before push, and no credentials are embedded in repository data.',
          ],
          testCases: [
            'Run the script from the project directory and compare its output with the intended reminder or task list.',
            'Run git status before staging and identify every changed file.',
            'Stage the intended files, inspect git status again, and confirm generated or local-only files are not staged.',
            'After each commit, inspect git log --oneline and explain what that snapshot records.',
            'Create an empty __pycache__ directory or fake .env only if useful for checking ignore behavior; ensure no real secret is used and confirm ignored paths do not appear as ordinary untracked files.',
            'Finish with git status and verify there are no unintended changes left behind.',
          ],
        },
        masteryCriteria: [
          'Explain terminal, shell and command prompt using an example from the operating system used.',
          'Navigate between directories and locate files using relative and absolute paths.',
          'Create, inspect, copy, move and remove only verified disposable files, explaining the risk of destructive operations.',
          'Run a Python script from the terminal and inspect its output and exit status.',
          'Initialize a repository, check status, stage selected files, make descriptive commits and inspect history.',
          'Explain what .gitignore excludes and why it does not erase already tracked files.',
          'Create and switch branches, merge a simple change, and describe a safe first response to a conflict.',
          'Explain the distinction between Git and GitHub and the direction of push and pull.',
          'Keep passwords, API keys, tokens and private credentials out of Git history and explain how to respond if one is exposed.',
          'Complete the Tracked Python Study Utility mini-build with a clean, understandable local Git history.',
        ],
      },
      {
        id: 'py-4',
        title: 'SQL and Data Handling',
        detail:
          'Model related data in relational tables, query and update it safely with SQL, and use Python with SQLite to inspect and prepare small datasets.',
        status: 'later' as const,
        category: 'Data',
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
      },
    ],
  },
  {
    id: 'mathematics-for-ml',
    name: 'Mathematics for ML',
    tag: 'FOUNDATIONS',
    description: 'Build mathematical intuition alongside implementation.',
    lessons: [
      {
        id: 'math-1',
        title: 'Functions, sets and notation',
        detail: 'Domains, ranges, mappings, set operations and mathematical language.',
        status: 'next' as const,
        category: 'Math',
        difficulty: 'beginner',
        prerequisites: ['py-1', 'py-2', 'py-3', 'py-4'],
        learningObjectives: [
          'Read common mathematical symbols and translate simple statements into precise words and Python conditions.',
          'Describe a function as a rule that maps each allowed input in a domain to exactly one output.',
          'Identify the domain, codomain and range of a function and explain why they are not interchangeable.',
          'Evaluate a function for given inputs and determine whether a proposed mapping is a function.',
          'Represent finite sets, membership, subsets, equality, union, intersection and set difference.',
          'Use Cartesian products and ordered pairs to describe possible input combinations and feature/label records.',
          'Read and write interval notation and connect intervals to inequalities and Python range limitations.',
          'Interpret summation notation and calculate a small sum by expanding its terms.',
          'Use function and set ideas to describe simple data transformations and ML inputs without confusing mathematical notation with Python syntax.',
        ],
        keyConcepts: [
          'mathematical statement',
          'variable and constant',
          'function',
          'input and output',
          'mapping',
          'domain',
          'codomain',
          'range',
          'function notation',
          'piecewise function',
          'set',
          'element and membership',
          'subset',
          'empty set',
          'union',
          'intersection',
          'set difference',
          'Cartesian product',
          'ordered pair',
          'interval notation',
          'summation notation',
          'feature and label',
        ],
        contentSections: [
          {
            title: '1. Mathematical notation is a compact language',
            content:
              'Mathematics uses symbols to state relationships precisely. A variable such as x stands for a value that may change; a constant such as 3 is fixed in a particular expression. The statement x + 3 = 8 says that adding 3 to x gives 8. Solving the statement means finding the value or values that make it true: here x = 5. The equals sign asserts that two expressions have the same value; it is not an instruction to assign a value as Python’s = operator does.\n\nThe symbol ∈ means “is an element of,” and ∉ means “is not an element of.” The symbol ⊆ means “is a subset of”: every element in the set on the left is also in the set on the right. A set is a collection of distinct elements, so repeated values do not create extra members. Mathematical notation can make a rule shorter, but always read each symbol in context and state what its variables represent.\n\nIn ML engineering, notation helps specify what data a program accepts and what a transformation returns. For example, a feature vector x may stand for several measured input values, while f(x) names a prediction rule. These symbols describe a mathematical relationship; they do not imply that a real model is just one line of Python. We will begin with small, explicit examples that can be checked by hand.',
            codeExamples: [
              {
                title: 'Test a mathematical condition in Python',
                language: 'python',
                code: 'x = 5\nprint(x + 3 == 8)\nprint(x in {3, 5, 8})',
                explanation:
                  'The first expression checks the mathematical equality and prints True. The second uses Python’s in keyword to test membership in a set. Python uses == for equality tests; a single = assigns a value to a name.',
              },
            ],
          },
          {
            title: '2. A function maps allowed inputs to outputs',
            content:
              'A function is a rule that assigns exactly one output to each input in its domain. We write f: A → B to say that f maps inputs from set A into set B. A is the domain: inputs allowed by the rule. B is the codomain: the stated set of possible output values. The range is the set of outputs the function actually produces for inputs in its domain, so the range is a subset of the codomain.\n\nFor example, let f(x) = 2x + 1 with domain {0, 1, 2} and codomain {1, 3, 5, 7}. Evaluating gives f(0)=1, f(1)=3, and f(2)=5. The range is {1, 3, 5}; 7 is in the codomain but is not produced by these allowed inputs. Function notation f(2) means “the output of function f for input 2,” not multiplication of f by 2.\n\nTo decide whether a proposed relation is a function, check every allowed input: it must have one and only one output. Different inputs may share an output; that is still a function. If one input is assigned two different outputs, it is not a function. The domain is part of the definition: division by x, for example, requires x ≠ 0 over the real numbers. A rule without its allowed input set may be incomplete.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/math-1/function-mapping.svg',
                alt: 'A mapping diagram shows domain inputs 0, 1 and 2 sent by f(x) = 2x + 1 to outputs 1, 3 and 5 in a larger codomain that also contains 7.',
                caption:
                  'Each domain input has exactly one arrow; the range contains only outputs actually reached.',
                width: 1200,
                height: 620,
              },
            ],
            codeExamples: [
              {
                title: 'Evaluate a function rule in Python',
                language: 'python',
                code: 'def f(x):\n    return 2 * x + 1\n\ndomain = {0, 1, 2}\noutputs = {f(value) for value in domain}\nprint(outputs)',
                explanation:
                  'The Python function implements the rule 2x + 1. Applying it to every element of the finite domain produces the range {1, 3, 5}. Python function definitions and mathematical function notation are related ideas, but their syntax and definitions are not identical.',
              },
            ],
          },
          {
            title: '3. Evaluate functions and understand domains',
            content:
              'Evaluating a function means substitute an allowed input into its rule and simplify. If g(x) = x² − 4, then g(3) = 3² − 4 = 5. Keep parentheses around a substituted value when its sign or expression could affect the result: g(−3) = (−3)² − 4 = 5, not −3² − 4. In common arithmetic notation, exponentiation happens before a leading negative sign unless parentheses group the negative value.\n\nThe domain may be stated directly or inferred from a context. For real-valued arithmetic, h(x) = 1/x is undefined at x = 0, so its real domain excludes zero. A square-root rule √x over the real numbers requires x ≥ 0. In an applied dataset, the domain may instead be a set of valid categories, dates, or positive measurements. A model or data transformation should define how invalid and missing inputs are handled; silently inventing an output can hide data-quality problems.\n\nA piecewise function uses different rules on different parts of its domain. For a simple shipping fee, a rule might charge 0 for an order total at least 50 and 5 otherwise. The conditions must cover the intended inputs and should not contradict one another. When translating to code, test boundary values around each condition, such as 49.99 and 50.',
            codeExamples: [
              {
                title: 'Implement a piecewise shipping fee',
                language: 'python',
                code: 'def shipping_fee(order_total):\n    if order_total < 0:\n        raise ValueError("order_total cannot be negative")\n    if order_total >= 50:\n        return 0\n    return 5\n\nprint(shipping_fee(49.99))\nprint(shipping_fee(50))',
                explanation:
                  'The rule has two cases and explicitly rejects values outside the chosen domain. The outputs are 5 and 0. A threshold boundary deserves a test because a condition such as > 50 would behave differently at exactly 50.',
              },
            ],
          },
          {
            title: '4. Sets describe collections and membership',
            content:
              'A set is an unordered collection of distinct elements. We can write S = {1, 2, 3}; then 2 ∈ S and 4 ∉ S. Order and repetition do not affect set equality: {1, 2, 2} and {2, 1} represent the same set. The empty set, written ∅, contains no elements. In Python, set() creates the empty set; {} creates an empty dictionary instead.\n\nA is a subset of B, written A ⊆ B, when every element of A is also in B. A proper subset has at least one fewer element than the larger set. Two sets are equal if they contain exactly the same members, regardless of listing order. In data work, a set can represent unique labels, valid categories, or the distinct identifiers seen in a dataset. It intentionally discards duplicate counts, so it is not a replacement for a list or table when frequencies and order matter.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/math-1/set-operations.svg',
                alt: 'Two overlapping circles show set A and set B: the union includes both circles, the intersection is their overlap, and A minus B is only the non-overlapping part of A.',
                caption:
                  'Union combines members, intersection keeps shared members, and set difference keeps members on one chosen side only.',
                width: 1200,
                height: 620,
              },
            ],
            codeExamples: [
              {
                title: 'Check membership and subset relationships',
                language: 'python',
                code: 'valid_labels = {"cat", "dog", "bird"}\nobserved_labels = {"cat", "bird"}\n\nprint("cat" in valid_labels)\nprint(observed_labels <= valid_labels)\nprint(len(valid_labels))',
                explanation:
                  'The in operator checks membership; <= checks whether the left set is a subset of the right set; len counts distinct members. If counts or order matter, preserve the original sequence separately.',
              },
            ],
          },
          {
            title: '5. Combine sets and describe input combinations',
            content:
              'The union A ∪ B contains every element in A or B, including shared members once. The intersection A ∩ B contains only elements shared by both sets. The difference A \\ B contains elements in A that are not in B; it is directional, so A \\ B is not generally the same as B \\ A. The complement of a set depends on a larger universal set, which must be stated to make the result clear.\n\nThe Cartesian product A × B is the set of ordered pairs (a, b) with a from A and b from B. Ordered means (a, b) and (b, a) are generally different. If A = {red, blue} and B = {small, large}, then A × B has four pairs. This represents all combinations of a color and size; it is useful for describing possible combinations of categorical features, though a real dataset may contain only some combinations.\n\nA dataset row can also be viewed as an ordered tuple of feature values and a label, such as ((temperature, humidity), outcome). This notation helps distinguish the input features from a target the model is asked to predict. It does not mean every pair combination exists or that the label is itself an input. A careful task definition separates features available at prediction time from the outcome being learned.',
            codeExamples: [
              {
                title: 'Compute set operations and a Cartesian product',
                language: 'python',
                code: 'train_ids = {1, 2, 3}\nreviewed_ids = {3, 4}\ncolors = {"red", "blue"}\nsizes = {"small", "large"}\n\nprint(train_ids | reviewed_ids)\nprint(train_ids & reviewed_ids)\nprint(train_ids - reviewed_ids)\nprint({(color, size) for color in colors for size in sizes})',
                explanation:
                  'Python uses | for union, & for intersection, and - for difference. The nested comprehension builds the Cartesian product. Set output display order is not guaranteed; compare membership rather than relying on printed order.',
              },
            ],
          },
          {
            title: '6. Read intervals, inequalities and summations',
            content:
              'An interval describes a continuous range of real numbers. The interval [2, 5] includes both endpoints and means 2 ≤ x ≤ 5. The interval (2, 5) excludes both endpoints and means 2 < x < 5. A mixed interval such as [2, 5) includes 2 but not 5. Parentheses are used for an excluded endpoint; a square bracket means included. Infinity is always written with a parenthesis because infinity is not a real endpoint that can be included.\n\nAn interval is different from Python’s range object. Python range(2, 5) produces the integers 2, 3, 4; it excludes 5 and does not include fractions such as 2.5. It is not the same thing as the real interval [2, 5]. When a program handles measurements, boundary checks should reflect the stated mathematical interval rather than copying assumptions from range.\n\nThe summation symbol Σ means add a sequence of terms. For example, Σ from i=1 to 3 of i means 1 + 2 + 3 = 6. If each term is xᵢ, then Σ xᵢ adds the values represented by x₁, x₂, and so on over the specified index range. The bounds are part of the meaning; changing a starting or ending index changes the result. In data analysis, a total such as Σ xᵢ is often used to describe a sum over observations. A mean is that sum divided by the number of included observations, and the inclusion rule must be clear when values are missing.',
            codeExamples: [
              {
                title: 'Expand a finite sum',
                language: 'python',
                code: 'values = [4, 7, 2]\ntotal = sum(values)\nmean = total / len(values)\nprint(total)\nprint(mean)',
                explanation:
                  'The list values correspond to x₁, x₂ and x₃. Their sum is 13 and their mean is 13/3. This example assumes the collection is non-empty; a production calculation should define what to do when there are no observations.',
              },
            ],
          },
          {
            title: '7. Connect functions and sets to ML data',
            content:
              'A feature transformation can be described as a function. For example, converting a duration measured in seconds to minutes is f(t) = t / 60, with a domain determined by the valid duration values. A category-cleaning function may map several raw spellings into one canonical label. Naming its input domain, output type, and treatment of unknown values makes the transformation testable and reproducible.\n\nA set can describe the allowed labels or identifiers in a dataset. Membership checks can find unexpected categories, while set intersections can identify shared IDs between a training split and a validation split. Overlap is not always wrong, but it can indicate leakage when the split is meant to keep examples or entities separate. Set operations can help inspect the condition; the project rules determine whether the overlap is acceptable.\n\nMathematical notation is a communication tool, not a substitute for checking data. A function may be well-defined on paper but receive missing or malformed values in a real pipeline. Validate inputs, document assumptions, and test boundary cases. These habits support ML systems work: a model is only useful when its features and labels have a clear meaning and transformations can be reproduced.',
            codeExamples: [
              {
                title: 'Check for identifier overlap between data splits',
                language: 'python',
                code: 'train_ids = {"record-1", "record-2", "record-3"}\nvalidation_ids = {"record-3", "record-4"}\n\noverlap = train_ids & validation_ids\nprint(overlap)\n\nif overlap:\n    print("Review whether this overlap is allowed.")',
                explanation:
                  'The intersection finds identifiers present in both sets. It flags a condition to investigate; it does not by itself prove leakage, because the correct split policy depends on the task and data.',
              },
            ],
          },
        ],
        workedExamples: [
          {
            title: 'Example 1: Find a function output and range',
            problem:
              'For f(x) = 2x + 1 with domain {0, 1, 2} and codomain {1, 3, 5, 7}, find the range.',
            reasoning:
              'Substitute each allowed input into the rule. Collect the outputs that actually occur; do not include codomain values that no allowed input produces.',
            solution: 'f(0) = 1\nf(1) = 3\nf(2) = 5\nRange = {1, 3, 5}',
            explanation:
              'The range is the set of actual outputs. It is contained in the codomain, but the codomain can include additional allowed target values.',
          },
          {
            title: 'Example 2: Decide whether a relation is a function',
            problem:
              'Consider the relation {(1, "low"), (2, "high"), (1, "medium")}. Is it a function from inputs to labels?',
            reasoning:
              'Group outputs by input. Input 1 is paired with two different labels, so it does not have exactly one output.',
            solution: 'Not a function: input 1 maps to both "low" and "medium".',
            explanation:
              'Multiple inputs may share the same output, but a single input cannot have two distinct outputs in a function.',
          },
          {
            title: 'Example 3: Evaluate a rule with a negative input',
            problem: 'Evaluate g(x) = x² − 4 at x = −3.',
            reasoning:
              'Substitute the entire input in parentheses, then evaluate the square before subtracting 4.',
            solution: 'g(−3) = (−3)² − 4 = 9 − 4 = 5',
            explanation:
              'Parentheses show that the negative value is the input. Without grouping, −3² is commonly interpreted as −(3²), which is −9.',
          },
          {
            title: 'Example 4: Compute union, intersection and difference',
            problem: 'Let A = {1, 2, 4} and B = {2, 3}. Find A ∪ B, A ∩ B and A \\ B.',
            reasoning:
              'Union collects members from either set once. Intersection collects shared members. Difference keeps members from the first set not present in the second.',
            solution: 'A ∪ B = {1, 2, 3, 4}\nA ∩ B = {2}\nA \\ B = {1, 4}',
            explanation:
              'Set difference depends on order: B \\ A would be {3}. Set notation describes membership, not frequency.',
          },
          {
            title: 'Example 5: Translate an interval to an inequality',
            problem:
              'Write the condition represented by [0, 1) and test whether 0, 0.5 and 1 belong.',
            reasoning:
              'The left square bracket includes 0; the right parenthesis excludes 1. Values between them are included.',
            solution: '0 ≤ x < 1\n0: included; 0.5: included; 1: excluded',
            explanation:
              'Endpoint symbols specify boundary behavior. In Python, the expression is 0 <= x < 1, which uses chained comparisons.',
            code: 'for x in (0, 0.5, 1):\n    print(x, 0 <= x < 1)',
          },
          {
            title: 'Example 6: Expand and calculate a sum and mean',
            problem:
              'For observations x₁ = 3, x₂ = 6 and x₃ = 9, evaluate Σ from i=1 to 3 of xᵢ and find their mean.',
            reasoning:
              'Expand the notation into the three values, add them, and divide by the count of included observations.',
            solution: 'Sum = 3 + 6 + 9 = 18\nMean = 18 / 3 = 6',
            explanation:
              'Writing the terms out is a useful check on index bounds and whether every observation is included exactly once.',
            code: 'values = [3, 6, 9]\nprint(sum(values))\nprint(sum(values) / len(values))',
          },
        ],
        commonMistakes: [
          {
            title: 'Confusing mathematical equality and assignment',
            explanation:
              'In mathematics, x = 5 asserts equality. In Python, x = 5 assigns a value, while x == 5 tests equality. Use the operator that matches whether you are defining a name or asking a true/false question.',
            incorrectCode: 'if x = 5:',
            correctedCode: 'if x == 5:',
          },
          {
            title: 'Assuming domain, codomain and range mean the same thing',
            explanation:
              'The domain is the allowed input set, the codomain is the stated target set, and the range is the set of outputs actually reached. State these sets when describing a function, especially when some codomain values are not produced.',
          },
          {
            title: 'Allowing one input to map to multiple outputs',
            explanation:
              'A function must assign exactly one output to each input in its domain. If one input has two different outputs, the relation is not a function. Several different inputs can still share one output.',
          },
          {
            title: 'Losing parentheses when substituting a negative value',
            explanation:
              'Substitute a negative input as a grouped value. This distinguishes (−3)² from −3², which most arithmetic conventions interpret as −(3²).',
            incorrectCode: '-3 ** 2',
            correctedCode: '(-3) ** 2',
          },
          {
            title: 'Thinking a set keeps duplicates or order',
            explanation:
              'A set stores distinct membership, not sequence order or frequency. Use a list when order matters and a count or mapping when frequencies matter. Python’s printed set order should not be used as a correctness guarantee.',
          },
          {
            title: 'Treating set difference as symmetric',
            explanation:
              'A \\ B means members in A that are not in B. Reversing the operands changes the question. Check which collection is the starting set and which members should be removed.',
          },
          {
            title: 'Confusing a real interval with Python range',
            explanation:
              'An interval such as [2, 5] contains real values including fractions. Python range(2, 5) contains only integers 2, 3 and 4. Use inequalities for continuous numeric boundaries and range for integer iteration.',
          },
          {
            title: 'Dropping or adding an endpoint in an interval',
            explanation:
              'A square bracket includes an endpoint and a parenthesis excludes it. Translate [a, b) to a <= x < b and test values exactly at both boundaries.',
          },
          {
            title: 'Using set membership when counts matter',
            explanation:
              'Converting a list to a set removes repeated elements. That is useful for unique categories or overlap checks, but it destroys frequency information. Keep or count the original records before deduplicating.',
          },
        ],
        resources: [
          {
            id: 'math-1-resource-openstax',
            title: 'OpenStax: College Algebra 2e — Real Numbers and Algebra Essentials',
            url: 'https://openstax.org/books/college-algebra-2e/pages/1-1-real-numbers-algebra-essentials',
            type: 'book',
            explanation:
              'A free, reviewed textbook introduction to number sets, expressions and mathematical language.',
          },
          {
            id: 'math-1-resource-openstax-set-operations',
            title: 'OpenStax: College Algebra 2e — Functions and Function Notation',
            url: 'https://openstax.org/books/college-algebra-2e/pages/3-1-functions-and-function-notation',
            type: 'book',
            explanation:
              'Covers function notation, relations, inputs and outputs with worked examples.',
          },
          {
            id: 'math-1-resource-python-set-types',
            title: 'Python documentation: Set Types',
            url: 'https://docs.python.org/3/library/stdtypes.html#set-types-set-frozenset',
            type: 'documentation',
            explanation:
              'Official reference for Python set membership, comparisons and operations.',
          },
          {
            id: 'math-1-resource-python-functions',
            title: 'Python tutorial: Defining Functions',
            url: 'https://docs.python.org/3/tutorial/controlflow.html#defining-functions',
            type: 'documentation',
            explanation:
              'Official Python tutorial section on defining and calling Python functions.',
          },
        ],
        exercises: [
          {
            id: 'math-1-exercise-notation',
            title: '1. Translate notation into words',
            instructions:
              'For each statement, write a plain-language reading and identify the variable: x + 4 = 10, x ∈ {1, 2, 3}, and A ⊆ B. Then write the Python expression that would test the equality and membership for x = 2. Do not solve every statement by guessing; explain what each symbol says.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Each symbol is read in context.',
              'Python assignment and equality testing are distinguished.',
            ],
            acceptanceCriteria: [
              'Explain =, ∈ and ⊆ in plain language.',
              'Use == for a Python equality test.',
              'Use in for Python set membership.',
            ],
          },
          {
            id: 'math-1-exercise-domain-range',
            title: '2. Evaluate a finite function and find its range',
            instructions:
              'For f(x) = 3x − 2 with domain {0, 1, 2, 4} and codomain {−2, 1, 4, 7, 10, 13}, calculate every output and state the range. Show the substitution for at least two inputs and check that every output belongs to the codomain.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'A complete input-output table.',
              'A range containing exactly the produced values.',
            ],
            acceptanceCriteria: [
              'Evaluate the rule at all four domain elements.',
              'Do not include unused codomain values in the range.',
              'Check that each produced output is in the codomain.',
            ],
          },
          {
            id: 'math-1-exercise-function-relation',
            title: '3. Test whether a relation is a function',
            instructions:
              'Decide whether each relation is a function from the first coordinate to the second: {(1, a), (2, a), (3, b)} and {(1, a), (1, b), (2, b)}. Explain your decision by checking how many outputs each input has. Then create one example where two inputs share an output but the relation is still a function.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Each relation is judged using the one-output-per-input rule.',
              'A valid example allows different inputs to share an output.',
            ],
            acceptanceCriteria: [
              'Identify the input that has multiple outputs in the non-function relation.',
              'Explain why repeated outputs are allowed.',
              'Use ordered pairs consistently.',
            ],
          },
          {
            id: 'math-1-exercise-evaluate',
            title: '4. Evaluate expressions with negative inputs',
            instructions:
              'For h(x) = x² + 2x, calculate h(−3), h(0) and h(2) by hand. Show the substituted expression with parentheses. Write a short Python function for h and verify the same values. If a result differs, inspect operator precedence before changing the rule.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Hand calculations and Python outputs agree.',
              'Negative substitution is shown unambiguously.',
            ],
            acceptanceCriteria: [
              'Group the negative input when substituting.',
              'Return the computed value from the Python function.',
              'Test at least one positive, one zero and one negative input.',
            ],
          },
          {
            id: 'math-1-exercise-domain-restrictions',
            title: '5. State a domain restriction',
            instructions:
              'For p(x) = 1 / (x − 2) over the real numbers, identify the input that is not allowed and describe the domain in words or set notation. For q(x) = √(x + 1) over real outputs, determine the condition on x. Explain why a program should validate these conditions instead of silently substituting another value.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The division-by-zero and real-square-root restrictions are identified.',
              'The role of input validation is described.',
            ],
            acceptanceCriteria: [
              'Exclude x = 2 for p.',
              'Require x + 1 >= 0 for real q outputs.',
              'Do not invent a result for an invalid input.',
            ],
          },
          {
            id: 'math-1-exercise-piecewise',
            title: '6. Design a piecewise rule',
            instructions:
              'A beginner course gives a badge for scores of at least 80 and a practice message otherwise; scores must be between 0 and 100 inclusive. Write the cases as a piecewise rule in words, then implement a Python function that returns a clear result and rejects scores outside the domain. Test exactly 79, 80, 100 and one invalid score.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The threshold and valid domain are both represented.',
              'Boundary tests show the intended branch behavior.',
            ],
            acceptanceCriteria: [
              'Treat 80 as qualifying and 79 as not qualifying.',
              'Accept the upper boundary 100.',
              'Reject rather than misclassify an out-of-domain score.',
            ],
          },
          {
            id: 'math-1-exercise-sets',
            title: '7. Calculate set relationships',
            instructions:
              'Let A = {1, 2, 4, 6} and B = {2, 3, 6}. Find A ∪ B, A ∩ B, A \\ B and B \\ A. State whether {2, 6} is a subset of A and whether A is a subset of B. Verify your results with Python sets without depending on their printed order.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'All four set results are correct.',
              'Subset checks use membership rather than order.',
            ],
            acceptanceCriteria: [
              'Keep union members unique.',
              'Preserve the order of operands for each difference.',
              'Explain each subset decision.',
            ],
          },
          {
            id: 'math-1-exercise-product',
            title: '8. Build and interpret a Cartesian product',
            instructions:
              'Let color = {red, blue} and size = {small, large, extra-large}. List every ordered pair in color × size and count them. Write Python code to construct the pairs. Explain why swapping a pair’s positions changes the interpretation and how the product represents possible combinations rather than records that necessarily exist.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'All color-size combinations are represented once.',
              'The learner explains ordered pair meaning.',
            ],
            acceptanceCriteria: [
              'Produce six pairs.',
              'Keep color in the first position and size in the second.',
              'Distinguish possible combinations from observed data.',
            ],
          },
          {
            id: 'math-1-exercise-intervals',
            title: '9. Convert intervals and test endpoints',
            instructions:
              'Translate (−2, 4] into inequalities and test whether −2, −1.5, 0 and 4 belong. Write a Python predicate for membership. Then explain why range(-2, 5) is not a representation of all real numbers in the interval.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'Endpoint inclusion matches the bracket notation.',
              'Continuous intervals are distinguished from integer iteration.',
            ],
            acceptanceCriteria: [
              'Exclude −2 and include 4.',
              'Use the corresponding chained comparison in Python.',
              'Explain that range contains discrete integers only.',
            ],
          },
          {
            id: 'math-1-exercise-summation',
            title: '10. Expand a summation and calculate a mean',
            instructions:
              'For x₁ = 2, x₂ = 5, x₃ = 8 and x₄ = 1, expand Σ from i=1 to 4 of xᵢ, calculate the total and mean by hand, then verify using Python. Finally, describe how the calculation should change if x₃ is missing; do not silently treat it as zero.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'The sum and mean use exactly the four stated observations.',
              'The missing-value policy is made explicit.',
            ],
            acceptanceCriteria: [
              'Expand all four terms and compute the total.',
              'Divide by the number of included values for the mean.',
              'Explain that missing and zero have different meanings.',
            ],
          },
          {
            id: 'math-1-exercise-data-overlap',
            title: '11. Investigate overlap between data splits',
            instructions:
              'Given training IDs {a, b, c, d} and validation IDs {d, e}, calculate the intersection and explain why the result may deserve investigation in an ML workflow. Write a Python check that reports overlapping IDs. State why overlap alone is not enough to conclude that an experiment is invalid; the split policy and unit of independence matter.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'The shared identifiers are found.',
              'The result is interpreted as a diagnostic requiring context.',
            ],
            acceptanceCriteria: [
              'Use set intersection.',
              'Do not claim every overlap is automatically leakage.',
              'Name a split-policy question that should be checked.',
            ],
          },
          {
            id: 'math-1-exercise-reasoning',
            title: '12. Design a function and its contract',
            instructions:
              'Choose a simple data transformation relevant to learning or ML, such as converting seconds to minutes or mapping raw category names to canonical labels. State its input domain, output meaning, and at least two invalid or boundary cases. Implement a small Python function, test ordinary and boundary inputs, and explain what the function should do with missing or unknown values. Make and justify the policy yourself.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'A function contract connects mathematical inputs and outputs to code.',
              'Tests cover normal and edge cases.',
            ],
            acceptanceCriteria: [
              'Define the input domain and output meaning before coding.',
              'Use a return value for a result that should be reused.',
              'Handle invalid or missing data according to a stated policy.',
              'Include at least three meaningful tests.',
            ],
          },
        ],
        assessmentQuestions: [
          {
            id: 'math-1-check-notation',
            prompt: 'What does x ∈ A mean? How is that different from A ⊆ B?',
            expectedAnswer:
              'x ∈ A says that x is one element of set A. A ⊆ B says every element of set A is also an element of set B.',
            explanation: 'Membership compares an element with a set; subset compares two sets.',
          },
          {
            id: 'math-1-check-function',
            prompt:
              'What condition must a relation satisfy to be a function from its input set to its output set?',
            expectedAnswer:
              'Every input in the stated domain must have exactly one output. Different inputs may share an output.',
            explanation:
              'The domain is part of the function definition, and each allowed input must be assigned one unambiguous result.',
          },
          {
            id: 'math-1-check-range',
            prompt:
              'For f(x) = x + 1 with domain {0, 2} and codomain {1, 2, 3, 4}, what are the range and the unused codomain values?',
            expectedAnswer:
              'The outputs are 1 and 3, so the range is {1, 3}. The unused codomain values are 2 and 4.',
            explanation:
              'Evaluate the rule only at allowed domain inputs; the range contains the outputs actually reached.',
          },
          {
            id: 'math-1-check-substitution',
            prompt: 'Evaluate h(x) = x² at x = −4. Why should the substituted input be grouped?',
            expectedAnswer:
              'h(−4) = (−4)² = 16. Parentheses show that the negative number is the full input; −4² is commonly parsed as −(4²), which is −16.',
            explanation:
              'Grouping preserves the intended meaning when substituting signed values into powers.',
          },
          {
            id: 'math-1-check-sets',
            prompt: 'If A = {1, 2, 3} and B = {2, 3, 4}, find A ∩ B and A \\ B.',
            expectedAnswer: 'A ∩ B = {2, 3}; A \\ B = {1}.',
            explanation:
              'The intersection contains shared members. The difference keeps members from the first set that are absent from the second.',
          },
          {
            id: 'math-1-check-cartesian',
            prompt:
              'If A contains 2 elements and B contains 3 elements, how many ordered pairs are in A × B? What do the positions represent?',
            expectedAnswer:
              'There are 2 × 3 = 6 ordered pairs. The first position is an element from A and the second is an element from B.',
            explanation: 'Each element from A pairs once with every element from B.',
          },
          {
            id: 'math-1-check-interval',
            prompt: 'Translate [1, 3) into an inequality. Are 1 and 3 included?',
            expectedAnswer: '1 ≤ x < 3. The value 1 is included; 3 is excluded.',
            explanation: 'A square bracket includes its endpoint; a parenthesis excludes it.',
          },
          {
            id: 'math-1-check-sum',
            prompt: 'Expand Σ from i=1 to 3 of (2i) and calculate the result.',
            expectedAnswer: '2(1) + 2(2) + 2(3) = 2 + 4 + 6 = 12.',
            explanation:
              'Substitute each integer index from the inclusive lower bound through the inclusive upper bound.',
          },
          {
            id: 'math-1-check-ml',
            prompt:
              'What can an intersection between training and validation ID sets tell you, and why is it a diagnostic rather than an automatic conclusion?',
            expectedAnswer:
              'The intersection identifies IDs present in both sets and can reveal possible leakage or an unintended split. Whether that is a problem depends on the evaluation design, grouping unit and split policy.',
            explanation:
              'Set operations expose overlap; domain and experiment requirements determine whether the overlap is invalid.',
          },
        ],
        miniBuild: {
          title: 'Feature Space Explorer',
          goal: 'Build a small Python program that makes a data transformation and its valid inputs explicit, inspects category sets and identifier overlap, and reports a few hand-checkable summaries. The project practises mathematical function contracts and set reasoning without external libraries.',
          requirements: [
            'Create a small hard-coded list of sample records containing an identifier, a category and a numeric measurement.',
            'Define a conversion function with a documented input domain, such as converting a non-negative measurement from seconds to minutes.',
            'Define an explicit policy for invalid, missing or unknown inputs; do not silently replace missing measurements with zero.',
            'Use sets to find unique categories and to compare two explicitly labeled identifier groups.',
            'Report any identifiers present in both groups as a condition to investigate, not as automatic proof of leakage.',
            'Calculate a total and mean for a clearly specified set of valid observations.',
            'Keep the program readable and use only Python concepts already introduced in py-1 to py-4.',
            'Include printed output that explains the meaning of each reported set and summary.',
          ],
          milestones: [
            'Write down the record fields, valid measurement domain and missing-value policy before coding.',
            'Create a tiny dataset with ordinary values plus at least one boundary or invalid case for testing.',
            'Implement the conversion function and test it on normal, boundary and invalid input.',
            'Build the unique category and ID sets; verify membership and overlap by hand.',
            'Calculate a sum and mean over explicitly selected valid observations and state which records were included.',
            'Review outputs and revise labels so a reader can distinguish possible overlap from a confirmed data problem.',
          ],
          acceptanceCriteria: [
            'The transformation’s input domain and output meaning are documented and reflected in the code.',
            'At least three tests cover ordinary and boundary behavior, and invalid input follows the stated policy.',
            'Unique categories and ID intersections match a hand-checked result.',
            'The program does not rely on set iteration order for correctness or presentation.',
            'The total and mean use only the observations defined by the cleaning rule.',
            'Missing measurements are not silently treated as zero.',
            'Output describes overlap as something to investigate under the project’s split policy.',
            'The program runs using the Python standard library only.',
          ],
          testCases: [
            'Check a normal input to the conversion function and compare the result with a hand calculation.',
            'Check the boundary value zero and one invalid negative value according to the chosen domain.',
            'Include a blank or missing measurement and verify the documented missing-data policy.',
            'Compare unique categories and the two ID sets with their expected members.',
            'Include one shared identifier and confirm it is reported for review.',
            'Recalculate the displayed total and mean by hand from the included values.',
          ],
        },
        masteryCriteria: [
          'Translate equality, membership, subset, interval and summation notation into words or equivalent expressions.',
          'Define a function by stating its rule, domain and codomain, then distinguish its actual range.',
          'Evaluate function rules accurately, including negative inputs and domain restrictions.',
          'Determine whether a relation is a function and justify the decision by checking outputs per input.',
          'Calculate union, intersection, directional difference and Cartesian products for finite sets.',
          'Translate interval notation into inequalities and test endpoint inclusion correctly.',
          'Expand a finite summation, calculate a total and mean, and state which observations are included.',
          'Use Python functions and sets to check a small data transformation without confusing their syntax with mathematical notation.',
          'Explain how set overlap can help inspect an ML data split without claiming overlap alone proves leakage.',
          'Complete the Feature Space Explorer mini-build with validated assumptions and hand-checkable results.',
        ],
      },
      {
        id: 'math-2',
        title: 'Linear algebra for data',
        detail: 'Vectors, matrices, dot products, norms, projections, rank and eigenvectors.',
        status: 'later' as const,
        category: 'Math',
        difficulty: 'beginner',
        prerequisites: ['math-1', 'py-1', 'py-4'],
        learningObjectives: [
          'Represent scalars, vectors and matrices, and state their dimensions and shapes.',
          'Add and scale equal-length vectors and explain the geometric meaning of vector addition.',
          'Calculate a dot product, vector norm and Euclidean distance by hand and with simple Python.',
          'Read matrix indices, transpose a matrix, and determine whether matrix products are dimensionally compatible.',
          'Multiply a matrix by a vector and multiply small matrices using row-by-column products.',
          'Interpret a matrix as a linear transformation and identify examples that do or do not preserve linear combinations.',
          'Describe a system of linear equations as a matrix equation and solve a small system by substitution or elimination.',
          'Explain linear independence, span and rank using small concrete examples.',
          'Recognize an eigenvector and eigenvalue for a simple matrix without treating the topic as a full eigenvalue-solving course.',
          'Connect vectors and matrices to feature data, model parameters, embeddings and tensor computation in ML systems.',
        ],
        keyConcepts: [
          'scalar',
          'vector',
          'matrix',
          'dimension and shape',
          'component',
          'vector addition',
          'scalar multiplication',
          'dot product',
          'Euclidean norm',
          'distance',
          'projection',
          'transpose',
          'matrix-vector product',
          'matrix multiplication',
          'identity matrix',
          'linear transformation',
          'system of linear equations',
          'linear combination',
          'span',
          'linear independence',
          'rank',
          'eigenvector',
          'eigenvalue',
          'feature vector',
          'batch and tensor shape',
        ],
        contentSections: [
          {
            title: '1. Scalars, vectors and matrices describe different-shaped data',
            content:
              'A scalar is one number, such as 0.7. A vector is an ordered list of numbers, such as x = (2, 1, 4). The order and position of components matter: (2, 1) is not the same vector as (1, 2). A vector with n components has dimension n. A matrix is a rectangular arrangement of numbers with rows and columns; a matrix with m rows and n columns has shape m × n. For example, [[1, 2, 3], [4, 5, 6]] has shape 2 × 3.\n\nThese objects can represent practical quantities. A feature vector might hold [temperature, humidity, pressure] for one observation. A matrix can stack several same-length feature vectors as rows, producing a table of observations and features. A model parameter matrix can transform one feature representation into another. Shape is a contract: it tells you how many values are available and whether an operation is defined. In libraries such as NumPy and PyTorch, a batch of examples is often represented by a two-dimensional array or tensor, and additional axes may represent channels, time steps or spatial dimensions.\n\nA vector is sometimes written as a row or column on paper. In this lesson we write vector components as an ordered tuple, but for matrix multiplication we treat x as a column vector. Say this convention when shape matters. Confusing rows, columns and component order is a common source of ML shape bugs.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/math-2/vector-addition.svg',
                alt: 'On a coordinate grid, vector u equals (2, 1) and vector v equals (1, 2); placing v at the end of u gives the resultant vector u plus v equals (3, 3).',
                caption:
                  'Vector addition combines corresponding components; geometrically, the arrows can be placed head to tail.',
                width: 1200,
                height: 620,
              },
            ],
            codeExamples: [
              {
                title: 'Inspect the shape of a small matrix',
                language: 'python',
                code: 'matrix = [[1, 2, 3], [4, 5, 6]]\nrows = len(matrix)\ncolumns = len(matrix[0])\nprint(rows, columns)',
                explanation:
                  'The matrix has 2 rows and 3 columns, so its shape is 2 × 3. This small Python example assumes the rows are non-empty and all have the same length; numerical array libraries provide explicit shape metadata and validate rectangular structure.',
              },
            ],
          },
          {
            title: '2. Add vectors and scale them',
            content:
              'Two vectors can be added component by component only when they have the same number of components. If u = (2, 1) and v = (1, 2), then u + v = (2 + 1, 1 + 2) = (3, 3). Geometrically, place the start of v at the end of u; the resultant goes from the start of u to the end of the shifted v. The same result is given by the parallelogram rule.\n\nScalar multiplication multiplies every component by the same number. If c = 2 and u = (2, 1), then cu = (4, 2). A negative scalar reverses the vector direction as well as changing its length. These operations are useful for combining measurements, changing units, and describing weighted sums in models. In ordinary Python, adding two lists concatenates them rather than adding components: [2, 1] + [1, 2] produces [2, 1, 1, 2]. Use an explicit component-wise operation or a numerical library when working with actual vectors.',
            codeExamples: [
              {
                title: 'Add and scale vectors with Python lists',
                language: 'python',
                code: 'u = [2, 1]\nv = [1, 2]\nif len(u) != len(v):\n    raise ValueError("vectors must have equal length")\n\nu_plus_v = [a + b for a, b in zip(u, v)]\ntwo_u = [2 * value for value in u]\nprint(u_plus_v)\nprint(two_u)',
                explanation:
                  'The results are [3, 3] and [4, 2]. The explicit loop applies an operation to corresponding components; list concatenation would not perform vector addition.',
              },
            ],
          },
          {
            title: '3. Dot products, lengths and distances',
            content:
              'The dot product of equal-length vectors multiplies matching components and adds the products. For u = (2, 1) and v = (1, 3), u · v = 2×1 + 1×3 = 5. The dot product is a scalar. It appears in weighted sums, similarity calculations and the first step of a neuron’s calculation: multiply input features by weights, add them, then often add a bias and apply another function.\n\nThe Euclidean norm (length) of x = (x₁, …, xₙ) is ||x||₂ = sqrt(x₁² + … + xₙ²). For u = (2, 1), its length is sqrt(5), approximately 2.236. The Euclidean distance between u and v is the norm of their difference. For u = (2, 1) and v = (1, 3), their difference is (1, −2), so their distance is sqrt(1² + (−2)²) = sqrt(5). A distance or similarity value depends on how features are scaled; a feature measured in thousands can dominate one measured between zero and one unless preprocessing is considered.\n\nThe projection of a vector u onto a nonzero vector v is the component of u in v’s direction. In coordinates, proj_v(u) = ((u·v)/(v·v))v. For u=(3,2) and v=(1,0), u·v=3 and v·v=1, so proj_v(u)=(3,0): the horizontal component remains and the perpendicular vertical component is removed. The denominator is zero for v=0, so projection onto the zero vector is undefined.\n\nA zero vector contains only zeros. The dot product with a zero vector is zero, and its norm is zero. Cosine similarity divides the dot product by both vector lengths, so it is undefined if either vector has zero length. This is a useful example of checking an operation’s domain before computing it.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/math-2/dot-product-projection.svg',
                alt: 'Vector u has a component along vector v and a perpendicular component; the dot product measures signed alignment, and projecting u onto v gives the along-v component.',
                caption:
                  'The dot product relates component-wise multiplication to alignment; projection is the component of one vector in another vector’s direction.',
                width: 1200,
                height: 620,
              },
            ],
            codeExamples: [
              {
                title: 'Calculate dot product, norm and distance',
                language: 'python',
                code: 'from math import sqrt\n\nu = [2, 1]\nv = [1, 3]\ndot = sum(a * b for a, b in zip(u, v))\nnorm_u = sqrt(sum(value * value for value in u))\ndistance = sqrt(sum((a - b) ** 2 for a, b in zip(u, v)))\nprint(dot)\nprint(round(norm_u, 3))\nprint(round(distance, 3))',
                explanation:
                  'The results are 5, approximately 2.236, and approximately 2.236. For a general function, validate equal vector lengths before using zip, because zip silently stops at the shorter input.',
              },
            ],
          },
          {
            title: '4. Matrices and matrix-vector multiplication',
            content:
              'A matrix stores numbers in rows and columns. The entry Aᵢⱼ means row i, column j; indexing conventions in mathematics usually start at 1, while Python list indices start at 0. The transpose Aᵀ swaps rows and columns. If A has shape m × n, then Aᵀ has shape n × m.\n\nTo multiply a matrix A by a column vector x, the number of columns in A must equal the number of components in x. If A has shape m × n and x has n components, the result has m components. Each output is a row of A dotted with x. For A = [[1, 2], [3, 4]] and x = (2, 1), Ax = (1×2 + 2×1, 3×2 + 4×1) = (4, 10). Shape checking before arithmetic prevents many confusing errors.\n\nThe identity matrix I leaves a compatible vector unchanged: Ix = x. It has ones on its main diagonal and zeros elsewhere. Identity matrices make a useful check on matrix multiplication and appear in algebraic descriptions of transformations, but dimensions still have to match.',
            codeExamples: [
              {
                title: 'Multiply a 2 × 2 matrix by a vector',
                language: 'python',
                code: 'matrix = [[1, 2], [3, 4]]\nvector = [2, 1]\nif any(len(row) != len(vector) for row in matrix):\n    raise ValueError("matrix columns must match vector length")\n\nresult = [sum(a * b for a, b in zip(row, vector)) for row in matrix]\nprint(result)',
                explanation:
                  'The first row gives 1×2 + 2×1 = 4; the second gives 3×2 + 4×1 = 10. The output vector has one value for each matrix row.',
              },
            ],
          },
          {
            title: '5. Matrix multiplication combines linear transformations',
            content:
              'For A with shape m × n and B with shape n × p, the product AB is defined and has shape m × p. The inner dimensions must agree; the outer dimensions give the result shape. Each entry in the product is the dot product of a row of A and a column of B. Matrix multiplication is generally not commutative: AB and BA may have different shapes or different values, and one product may not be defined at all.\n\nFor A = [[1, 2], [0, 1]] and B = [[3, 1], [2, 1]], AB = [[7, 3], [2, 1]]. For example, the top-left entry is (1×3) + (2×2) = 7. The top-right entry is (1×1) + (2×1) = 3. Work one row-column pair at a time and write the shapes before multiplying.\n\nA matrix can represent a linear transformation: a rule that preserves vector addition and scalar multiplication, so T(u+v)=T(u)+T(v) and T(cu)=cT(u). Multiplication by a fixed matrix is linear. Translating every point by a fixed nonzero offset is not a linear transformation because it does not send the zero vector to zero. A general neural-network layer often adds a bias and then applies a nonlinear activation, so the complete layer is not necessarily a linear transformation even though its matrix multiplication step is.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/math-2/matrix-shapes.svg',
                alt: 'A matrix with shape m by n multiplies a matrix with shape n by p; the matching inner n dimensions are highlighted and the result has shape m by p.',
                caption:
                  'For matrix multiplication, the inner dimensions must match; the outer dimensions form the result shape.',
                width: 1200,
                height: 560,
              },
            ],
            codeExamples: [
              {
                title: 'Multiply two small matrices',
                language: 'python',
                code: 'a = [[1, 2], [0, 1]]\nb = [[3, 1], [2, 1]]\nif len(a[0]) != len(b):\n    raise ValueError("inner matrix dimensions must match")\n\nproduct = [\n    [sum(a[i][k] * b[k][j] for k in range(len(b))) for j in range(len(b[0]))]\n    for i in range(len(a))\n]\nprint(product)',
                explanation:
                  'The result is [[7, 3], [2, 1]] and has shape 2 × 2. Real numerical libraries provide optimized matrix multiplication; this short implementation makes the row-by-column rule visible.',
              },
            ],
          },
          {
            title: '6. Systems, span, independence and rank',
            content:
              'A system of linear equations can be written as Ax=b. The matrix A contains the coefficients, x contains the unknowns, and b contains the target values. For example, 2x+y=5 and x−y=1 can be added to eliminate y: 3x=6, so x=2 and y=1. Substitution checks both original equations. A system can have one solution, no solution, or infinitely many solutions; the outcome depends on whether the equations are consistent and independent.\n\nA linear combination of vectors is a sum of scalar multiples, such as 2u−3v. The span of a set of vectors is all the vectors that can be formed by their linear combinations. In two dimensions, (1,0) and (0,1) span the plane: any (a,b) can be written a(1,0)+b(0,1). A set is linearly independent if the only way to combine its vectors to get zero is to use zero for every coefficient. If one vector is a scalar multiple or combination of the others, the set is dependent.\n\nThe rank of a matrix is the number of independent rows or, equivalently, independent columns. It describes how many independent directions its transformation can represent. For [[1,2],[2,4]], the second row is twice the first, so the rank is 1, not 2. Rank helps diagnose redundant features and whether a linear system has enough independent information to determine a unique solution. Full rank alone does not guarantee a numerically stable computation; that requires further study.',
            codeExamples: [
              {
                title: 'Solve a small system and verify the result',
                language: 'python',
                code: 'x = 2\ny = 1\nprint(2 * x + y)\nprint(x - y)',
                explanation:
                  'The outputs are 5 and 1, satisfying 2x+y=5 and x−y=1. Checking the solution in the original equations helps catch arithmetic or elimination errors.',
              },
              {
                title: 'Check whether two 2D vectors are dependent',
                language: 'python',
                code: 'u = [2, 1]\nv = [4, 2]\nprint(v == [2 * value for value in u])',
                explanation:
                  'The output is True: v=2u, so these two vectors are linearly dependent and span only the line in their shared direction.',
              },
            ],
          },
          {
            title: '7. Eigenvectors preserve a direction under a matrix',
            content:
              'A nonzero vector v is an eigenvector of a square matrix A when Av=λv for some scalar λ, called its eigenvalue. The matrix may stretch, shrink or reverse that vector, but it does not change its line of direction. The zero vector is excluded because A0=λ0 for every λ, which would make the definition uninformative.\n\nFor A=[[2,0],[0,1]] and v=(1,0), Av=(2,0)=2v, so v is an eigenvector with eigenvalue 2. The vector (0,1) is also an eigenvector with eigenvalue 1. But (1,1) is not an eigenvector here: A(1,1)=(2,1), which is not a single scalar multiple of (1,1). This check is often easier than trying to solve for all eigenvectors.\n\nEigenvectors and eigenvalues appear in dimensionality reduction, stability analysis and understanding repeated transformations. In ML, they help explain principal component analysis and some spectral methods. This lesson focuses on recognizing the relationship; finding eigenvalues for large matrices, numerical conditioning, and practical PCA are later topics.',
            codeExamples: [
              {
                title: 'Test an eigenvector relation',
                language: 'python',
                code: 'matrix = [[2, 0], [0, 1]]\nvector = [1, 0]\neigenvalue = 2\ntransformed = [sum(a * b for a, b in zip(row, vector)) for row in matrix]\nprint(transformed)\nprint([eigenvalue * value for value in vector])',
                explanation:
                  'Both lists are [2, 0], so Av=2v and this nonzero vector is an eigenvector with eigenvalue 2.',
              },
            ],
          },
          {
            title: '8. Connect shapes and transformations to ML systems',
            content:
              'A batch of N observations with D features can be represented as a matrix X with shape N × D, with one observation per row. A weight matrix W may map those D input features to K outputs and therefore have shape D × K. The product XW has shape N × K: each row receives K transformed values, and all N observations are processed together. A bias vector can then be added to each output row according to the numerical library’s broadcasting rules.\n\nAn embedding table is another matrix: an integer token or category ID selects a row vector. A neural-network tensor may add axes for batch, sequence position, channel or image height and width. Shape names and axes should be written down before debugging a mismatch; a shape error may reveal that the wrong feature dimension, batch order, or transpose was used. Never reshape merely to silence an error without checking what each axis means.\n\nPython lists are useful for small, hand-checkable demonstrations but do not automatically provide element-wise arithmetic or efficient large matrix operations. NumPy arrays and PyTorch tensors provide numerical operations and shape metadata; PyTorch tensors also participate in automatic differentiation and may be placed on accelerators. Learn the mathematical operation and expected shape first, then use a library and verify its documented conventions. This supports reliable data pipelines and inference services where incorrect tensor shapes can silently mix examples or prevent a model from serving requests.',
            codeExamples: [
              {
                title: 'Track a batch transformation by shape',
                language: 'text',
                code: 'X: (N, D)\nW: (D, K)\nX @ W: (N, K)',
                explanation:
                  'The inner dimensions D match, so the matrix product is defined. The result retains the batch count N and produces K outputs per observation.',
              },
            ],
          },
        ],
        workedExamples: [
          {
            title: 'Example 1: Add and scale vectors',
            problem: 'Let u=(2,1) and v=(1,3). Find u+v and 2u−v.',
            reasoning:
              'Add and subtract corresponding components. Apply a scalar to every component before combining.',
            solution: 'u+v=(3,4)\n2u=(4,2)\n2u−v=(4−1, 2−3)=(3,−1)',
            explanation:
              'The vectors have matching dimensions, so component-wise operations are defined.',
            code: 'u = [2, 1]\nv = [1, 3]\nprint([a + b for a, b in zip(u, v)])\nprint([2 * a - b for a, b in zip(u, v)])',
          },
          {
            title: 'Example 2: Calculate a dot product, norm and distance',
            problem:
              'For u=(2,1) and v=(1,3), calculate u·v, ||u||₂ and the Euclidean distance between u and v.',
            reasoning:
              'Multiply matching components and sum for the dot product. Square and sum components for the squared norm or squared difference, then take the square root.',
            solution:
              'u·v = 2×1 + 1×3 = 5\n||u||₂ = sqrt(2² + 1²) = sqrt(5) ≈ 2.236\nd(u,v) = sqrt((2−1)² + (1−3)²) = sqrt(5) ≈ 2.236',
            explanation:
              'The norm is the distance from u to the origin; the distance between vectors is the norm of their difference.',
            code: 'from math import sqrt\nu = [2, 1]\nv = [1, 3]\nprint(sum(a * b for a, b in zip(u, v)))\nprint(round(sqrt(sum(a * a for a in u)), 3))\nprint(round(sqrt(sum((a - b) ** 2 for a, b in zip(u, v))), 3))',
          },
          {
            title: 'Example 3: Multiply a matrix by a vector',
            problem: 'Calculate Ax for A=[[1,2],[3,4]] and x=(2,1).',
            reasoning:
              'Take the dot product of each matrix row with the vector. A has two rows and two columns, so the result has two components.',
            solution: 'Ax=(1×2+2×1, 3×2+4×1)=(4,10)',
            explanation:
              'The matrix has shape 2 × 2 and the column vector has shape 2 × 1; the inner dimensions match and the result shape is 2 × 1.',
            code: 'matrix = [[1, 2], [3, 4]]\nvector = [2, 1]\nprint([sum(a * b for a, b in zip(row, vector)) for row in matrix])',
          },
          {
            title: 'Example 4: Check matrix product dimensions and values',
            problem: 'Let A=[[1,2],[0,1]] and B=[[3,1],[2,1]]. Find AB and state its shape.',
            reasoning:
              'Both matrices are 2 × 2, so the product is defined and has shape 2 × 2. Calculate each result entry from one row of A and one column of B.',
            solution: 'AB=[[1×3+2×2, 1×1+2×1], [0×3+1×2, 0×1+1×1]]=[[7,3],[2,1]]',
            explanation:
              'The inner dimensions are both 2; the output uses the first matrix’s row count and the second matrix’s column count.',
            code: 'a = [[1, 2], [0, 1]]\nb = [[3, 1], [2, 1]]\nproduct = [[sum(a[i][k] * b[k][j] for k in range(2)) for j in range(2)] for i in range(2)]\nprint(product)',
          },
          {
            title: 'Example 5: Solve and verify a linear system',
            problem: 'Solve 2x+y=5 and x−y=1.',
            reasoning:
              'Add the equations to eliminate y: 3x=6, so x=2. Substitute into x−y=1 to get y=1, then verify both original equations.',
            solution: 'x=2, y=1\n2(2)+1=5\n2−1=1',
            explanation:
              'The same system can be represented as [[2,1],[1,−1]] [x,y]ᵀ = [5,1]ᵀ. Verification checks the result against the original constraints.',
            code: 'x, y = 2, 1\nprint(2 * x + y)\nprint(x - y)',
          },
          {
            title: 'Example 6: Identify dependence and rank',
            problem:
              'For rows (1,2) and (2,4), determine whether they are independent and state the rank of the 2 × 2 matrix they form.',
            reasoning:
              'The second row is exactly twice the first. There is only one independent row direction.',
            solution: 'Dependent rows; rank = 1.',
            explanation:
              'Although the matrix has two rows and two columns, its rows do not provide two independent directions.',
            code: 'row_1 = [1, 2]\nrow_2 = [2, 4]\nprint(row_2 == [2 * value for value in row_1])',
          },
          {
            title: 'Example 7: Recognize an eigenvector',
            problem:
              'For A=[[2,0],[0,1]], test whether v=(1,0) is an eigenvector and identify its eigenvalue.',
            reasoning:
              'Multiply A by v and check whether the result is a scalar multiple of the same nonzero vector.',
            solution: 'Av=(2,0)=2(1,0); v is an eigenvector and λ=2.',
            explanation:
              'The vector keeps its direction and doubles in length. The nonzero condition excludes the trivial zero vector.',
            code: 'matrix = [[2, 0], [0, 1]]\nvector = [1, 0]\nprint([sum(a * b for a, b in zip(row, vector)) for row in matrix])',
          },
        ],
        commonMistakes: [
          {
            title: 'Treating a Python list as a numerical vector',
            explanation:
              'Python list addition concatenates lists; it does not add matching components. Use a component-wise loop for small examples or a numerical array library after checking its shape and operation semantics.',
            incorrectCode: '[2, 1] + [1, 2]',
            correctedCode: '[a + b for a, b in zip([2, 1], [1, 2])]',
          },
          {
            title: 'Combining vectors with different dimensions',
            explanation:
              'Vector addition and dot products require matching component counts. zip silently ignores extra elements, so validate lengths rather than assuming it detects a mismatch.',
          },
          {
            title: 'Checking only matrix row counts for multiplication',
            explanation:
              'For A of shape m × n and B of shape p × q, AB is defined when n=p. The result shape is m × q. Write both shapes and compare inner dimensions before multiplying.',
          },
          {
            title: 'Assuming matrix multiplication is commutative',
            explanation:
              'In general AB ≠ BA, and one of the products may not be defined. Preserve operation order when composing transformations or applying model weights.',
          },
          {
            title: 'Confusing element-wise multiplication with a dot or matrix product',
            explanation:
              'Element-wise multiplication multiplies matching positions and usually keeps the same shape. A dot product sums matching products to one scalar; a matrix product forms row-by-column dot products. Check which operation the model or equation specifies.',
          },
          {
            title: 'Mixing mathematical and Python index conventions',
            explanation:
              'Mathematical matrix labels commonly start at 1, while Python lists start at index 0. State whether a component label is mathematical notation or a Python index.',
          },
          {
            title: 'Calling every neural-network layer linear',
            explanation:
              'A matrix multiplication is linear, but adding a nonzero bias makes an affine map, and nonlinear activations such as ReLU make the full layer nonlinear. Separate each operation when reasoning about the transformation.',
          },
          {
            title: 'Calling the zero vector an eigenvector',
            explanation:
              'The definition requires a nonzero vector v such that Av=λv. The zero vector satisfies that equation for every λ and therefore does not identify a meaningful preserved direction.',
          },
          {
            title: 'Reshaping a tensor just to silence an error',
            explanation:
              'A shape error may reveal reversed axes, a wrong feature count or a missing batch dimension. Confirm what each axis represents before transposing or reshaping; a shape-compatible result can still pair the wrong values.',
          },
        ],
        resources: [
          {
            id: 'math-2-resource-mit-ocw',
            title: 'MIT OpenCourseWare: Linear Algebra (18.06SC)',
            url: 'https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/',
            type: 'course',
            explanation:
              'A complete independent-study course with lectures, notes, problem sets and worked solutions.',
          },
          {
            id: 'math-2-resource-strang',
            title: 'Gilbert Strang: Introduction to Linear Algebra',
            url: 'https://math.mit.edu/~gs/linearalgebra/',
            type: 'book',
            explanation:
              'The author’s official companion page for the linear algebra textbook and editions.',
          },
          {
            id: 'math-2-resource-numpy',
            title: 'NumPy documentation: Linear algebra',
            url: 'https://numpy.org/doc/stable/reference/routines.linalg.html',
            type: 'documentation',
            explanation:
              'Reference for numerical linear algebra operations available through NumPy.',
          },
          {
            id: 'math-2-resource-numpy-quickstart',
            title: 'NumPy documentation: Quickstart tutorial',
            url: 'https://numpy.org/doc/stable/user/quickstart.html',
            type: 'documentation',
            explanation:
              'Introduces array dimensions, axes, shape and array operations, including linear algebra context.',
          },
          {
            id: 'math-2-resource-pytorch-tensor',
            title: 'PyTorch documentation: torch.Tensor',
            url: 'https://docs.pytorch.org/docs/2.15/tensors.html',
            type: 'documentation',
            explanation:
              'Official reference for tensor creation, shapes and operations used in deep learning systems.',
          },
        ],
        exercises: [
          {
            id: 'math-2-exercise-shapes',
            title: '1. Name scalar, vector and matrix shapes',
            instructions:
              'Classify 4.5, (2, −1, 0) and [[1, 2], [3, 4], [5, 6]] as a scalar, vector or matrix. State each vector dimension or matrix shape. Write the shape of a batch containing 8 examples with 3 features when each example is a row.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Each object is classified by its structure.',
              'The batch shape follows the stated row/feature convention.',
            ],
            acceptanceCriteria: [
              'Distinguish number of components from row/column shape.',
              'State the matrix row count before its column count.',
              'Explain what each batch axis represents.',
            ],
          },
          {
            id: 'math-2-exercise-vector-operations',
            title: '2. Add, subtract and scale vectors',
            instructions:
              'For a=(3,−2,1) and b=(1,4,0), calculate a+b, a−b and −2b by hand. Then implement the operations with Python lists using component-wise logic. Include an explicit length check and explain what would go wrong if the vectors had different sizes.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'The component calculations are correct.',
              'The code refuses incompatible vector lengths.',
            ],
            acceptanceCriteria: [
              'Show all three results with components in the original order.',
              'Do not use list concatenation as vector addition.',
              'Check equal lengths before combining components.',
            ],
          },
          {
            id: 'math-2-exercise-dot-norm',
            title: '3. Calculate a dot product and norm',
            instructions:
              'For p=(−1,2,2) and q=(3,0,−2), compute p·q and ||p||₂. Show the products and squares before simplifying. Write a short Python calculation and compare its output with your hand result.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'A scalar dot product and nonnegative vector norm.',
              'Matching hand and code results.',
            ],
            acceptanceCriteria: [
              'Multiply corresponding components for the dot product.',
              'Square all components and take the square root for the norm.',
              'Keep the sign of each dot-product term.',
            ],
          },
          {
            id: 'math-2-exercise-distance',
            title: '4. Compare Euclidean distances',
            instructions:
              'For points a=(1,2) and b=(4,6), calculate their Euclidean distance. Then calculate the distance from a to c=(1,5). Compare which point is closer to a. State one reason raw Euclidean distance may be misleading when dataset features use very different units.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Both distances follow the norm-of-difference definition.',
              'The comparison is connected to feature scaling.',
            ],
            acceptanceCriteria: [
              'Subtract corresponding coordinates before squaring.',
              'Use a square root after summing squared differences.',
              'Explain why feature scale can dominate a distance.',
            ],
          },
          {
            id: 'math-2-exercise-transpose',
            title: '5. Transpose a matrix',
            instructions:
              'Write the transpose of [[1,2,3],[4,5,6]] and state its new shape. Explain how each original row becomes a column. Implement the transpose with Python lists and verify that transposing again restores the original matrix.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Rows and columns exchange positions.',
              'Applying transpose twice returns the starting matrix.',
            ],
            acceptanceCriteria: [
              'List the transposed values in the correct positions.',
              'State both original and transposed shapes.',
              'Test the double-transpose property in code.',
            ],
          },
          {
            id: 'math-2-exercise-matrix-vector',
            title: '6. Multiply a matrix by a vector',
            instructions:
              'Calculate [[2,1],[0,3],[−1,2]] times (4,−2). State the matrix and vector shapes and the result shape. Show each row dot product. Then write code that checks inner dimensions before calculating.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Each output uses the matching matrix row.',
              'The result has one component per matrix row.',
            ],
            acceptanceCriteria: [
              'Show three separate row-by-vector products.',
              'Check the vector length equals the matrix column count.',
              'Report the output shape.',
            ],
          },
          {
            id: 'math-2-exercise-matrix-product',
            title: '7. Check matrix multiplication compatibility',
            instructions:
              'For A with shape 2×3 and B with shape 3×4, decide whether AB and BA are defined and state the shape of each defined product. Then calculate the product of [[1,0,2],[−1,3,1]] and [[3,1],[2,1],[1,0]] by hand using row-column products. Keep intermediate products visible.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'Dimension compatibility is checked in both orders.',
              'The numeric 2×2 product is correct.',
            ],
            acceptanceCriteria: [
              'Compare inner dimensions for each proposed order.',
              'Use the first matrix row count and second matrix column count for output shape.',
              'Compute all four product entries explicitly.',
            ],
          },
          {
            id: 'math-2-exercise-linear-system',
            title: '8. Solve a small linear system',
            instructions:
              'Solve 3x+y=7 and x−y=1 by elimination or substitution. Write the coefficient matrix A, unknown vector x and right-hand side b in Ax=b form. Substitute your solution into both original equations as a check.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'A solution satisfies both equations.',
              'The system is represented with consistent coefficient order.',
            ],
            acceptanceCriteria: [
              'Use the same variable ordering in A and x.',
              'Show the elimination or substitution step.',
              'Verify both equations, not just one.',
            ],
          },
          {
            id: 'math-2-exercise-independence-rank',
            title: '9. Identify span, independence and rank',
            instructions:
              'Consider vectors u=(1,0), v=(0,1), w=(2,0) and z=(1,1). Decide which pairs span the plane and which pairs are linearly dependent. Find the rank of the matrix with rows (1,2,3) and (2,4,6). Explain your decisions using linear combinations rather than visual guesswork alone.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'The basis directions are distinguished from scalar multiples.',
              'The row rank follows from dependence between rows.',
            ],
            acceptanceCriteria: [
              'Use nonzero determinant or explicit combination reasoning for 2D pairs.',
              'Identify a pair of independent vectors spanning 2D.',
              'Explain why the two matrix rows contribute only one independent row.',
            ],
          },
          {
            id: 'math-2-exercise-transformation',
            title: '10. Trace a matrix transformation',
            instructions:
              'Let A=[[2,0],[0,1]]. Transform u=(1,3), v=(2,−1) and u+v. Check whether A(u+v)=Au+Av. Explain what happens to horizontal and vertical components and whether the transformation preserves addition.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'The three transformed vectors follow the matrix rows.',
              'The addition-preserving property is checked numerically.',
            ],
            acceptanceCriteria: [
              'Calculate every transformed vector.',
              'Compare both sides component by component.',
              'Describe the geometric stretch represented by A.',
            ],
          },
          {
            id: 'math-2-exercise-eigenvector',
            title: '11. Test an eigenvector candidate',
            instructions:
              'For A=[[3,0],[0,2]], test candidates (1,0), (0,1), (1,1) and (0,0). For each, calculate Av and decide whether it satisfies Av=λv for some scalar λ, respecting the nonzero condition in the definition. State eigenvalues for valid candidates.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'Each candidate is checked directly by multiplication.',
              'The zero vector is excluded even though its image is zero.',
            ],
            acceptanceCriteria: [
              'Name the eigenvalue for each valid nonzero candidate.',
              'Show why (1,1) is not a scalar multiple of its transformed result.',
              'Explain why the zero vector is not an eigenvector.',
            ],
          },
          {
            id: 'math-2-exercise-shape-debug',
            title: '12. Debug an ML matrix-shape plan',
            instructions:
              'A batch X has 5 examples and 4 features. A weight matrix is described as 3×4, and the intended result is 5 examples with 3 scores each. Determine whether XW is compatible as stated, identify a valid weight shape, and state the result shape. Explain why blindly transposing an array without checking axis meaning can produce a numerically valid but semantically wrong result.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'The feature and weight dimensions align.',
              'The result preserves the batch axis and has the intended score width.',
            ],
            acceptanceCriteria: [
              'Write the shape of X and desired output.',
              'Choose weights whose input dimension equals the feature count.',
              'Describe the semantic meaning of each axis.',
            ],
          },
        ],
        assessmentQuestions: [
          {
            id: 'math-2-check-shape',
            prompt:
              'A matrix has 4 rows and 3 columns. What is its shape, and what is the shape of its transpose?',
            expectedAnswer: 'Its shape is 4×3; its transpose has shape 3×4.',
            explanation: 'Transposing swaps rows and columns.',
          },
          {
            id: 'math-2-check-vector-add',
            prompt: 'For u=(3,−1) and v=(2,4), calculate u+v and explain the operation.',
            expectedAnswer: 'u+v=(3+2, −1+4)=(5,3), by adding corresponding components.',
            explanation:
              'Vector addition requires equal dimensions and combines matching positions.',
          },
          {
            id: 'math-2-check-dot',
            prompt: 'Calculate (2,−1,3)·(1,4,0).',
            expectedAnswer: '2×1 + (−1)×4 + 3×0 = 2−4+0 = −2.',
            explanation: 'A dot product multiplies matching components and sums the products.',
          },
          {
            id: 'math-2-check-norm',
            prompt: 'Find the Euclidean norm of (3,4).',
            expectedAnswer: 'sqrt(3²+4²)=sqrt(25)=5.',
            explanation: 'The norm is the square root of the sum of squared components.',
          },
          {
            id: 'math-2-check-matrix-vector',
            prompt: 'For A=[[1,2],[0,3]] and x=(2,1), what is Ax?',
            expectedAnswer: 'Ax=(1×2+2×1, 0×2+3×1)=(4,3).',
            explanation: 'Each result component is one matrix row dotted with the input vector.',
          },
          {
            id: 'math-2-check-matrix-shapes',
            prompt:
              'If A has shape 2×3 and B has shape 3×5, is AB defined and what is its shape? Is BA defined?',
            expectedAnswer:
              'AB is defined because the inner dimensions are both 3, and its shape is 2×5. BA is not defined because B has 5 columns but A has 2 rows, so the inner dimensions do not match.',
            explanation:
              'Compare inner dimensions for compatibility and use the outer dimensions for the result.',
          },
          {
            id: 'math-2-check-system',
            prompt: 'Solve x+y=5 and x−y=1.',
            expectedAnswer: 'Adding gives 2x=6, so x=3; then y=2. The solution is (3,2).',
            explanation: 'Substitution verifies 3+2=5 and 3−2=1.',
          },
          {
            id: 'math-2-check-rank',
            prompt: 'What is the rank of [[1,2],[3,6]], and why?',
            expectedAnswer:
              'The rank is 1 because the second row is three times the first, so only one row is independent.',
            explanation:
              'Rank counts independent row directions (equivalently, independent columns).',
          },
          {
            id: 'math-2-check-eigenvector',
            prompt:
              'For A=[[2,0],[0,1]], is v=(1,0) an eigenvector? If so, what is its eigenvalue?',
            expectedAnswer: 'Yes. Av=(2,0)=2(1,0), so the eigenvalue is 2.',
            explanation:
              'The transformed nonzero vector remains on the same line and is scaled by 2.',
          },
          {
            id: 'math-2-check-ml-shapes',
            prompt:
              'A batch has shape N×D and weights have shape D×K. What is the shape of the product, and what does each axis mean?',
            expectedAnswer:
              'The product has shape N×K: N rows for examples and K output values per example. The matching inner dimension D represents input features.',
            explanation:
              'Shape reasoning catches incompatible feature dimensions before model execution.',
          },
        ],
        miniBuild: {
          title: 'Tiny Feature Transformation Workbench',
          goal: 'Create a small, dependency-free Python program that treats a few records as feature vectors, validates their shapes, applies a matrix transformation, and reports interpretable results. The goal is to make the math and shape contracts visible before using NumPy or PyTorch.',
          requirements: [
            'Represent at least three small observations as equal-length numeric feature vectors.',
            'Document what each feature position means and use one consistent feature order.',
            'Implement component-wise vector addition, a dot product and matrix-vector multiplication with clear length checks.',
            'Apply a small, hand-checkable matrix to each observation and describe what the output components represent.',
            'Include one deliberately incompatible vector or matrix shape and report a useful error rather than silently truncating values.',
            'Check a small set of observation IDs for duplicates or overlap using Python sets, and explain what the result means for the chosen scenario.',
            'Include at least one test of a linear transformation property such as T(u+v)=T(u)+T(v).',
            'Keep the program in the Python standard library and avoid external numeric packages for the core implementation.',
          ],
          milestones: [
            'Write down feature meanings, vector length, matrix dimensions and expected output shape before coding.',
            'Create a tiny dataset with three hand-checkable feature vectors and verify all rows have the same length.',
            'Implement and test vector addition and dot product, including a dimension mismatch case.',
            'Implement matrix-vector multiplication and check each output by calculating one row dot product by hand.',
            'Apply the transformation to every record and label the output features clearly.',
            'Add a set-based ID check and state whether any overlap should trigger further investigation.',
            'Test the addition-preserving property for your fixed matrix and verify final outputs against hand calculations.',
          ],
          acceptanceCriteria: [
            'Every vector and matrix has documented dimensions and compatible operations.',
            'Component-wise vector arithmetic is not confused with Python list concatenation.',
            'Dimension mismatches are detected explicitly rather than hidden by zip truncation.',
            'At least three observation outputs match hand calculations.',
            'A simple linearity test gives equal results for T(u+v) and T(u)+T(v).',
            'Any set overlap is interpreted according to the stated data scenario, not automatically labeled leakage.',
            'The program uses only the Python standard library and prints readable labels and results.',
          ],
          testCases: [
            'Apply the transformation to a small vector and verify the result by hand.',
            'Try vector addition with incompatible lengths and confirm the program reports the problem.',
            'Try a matrix-vector product with incompatible inner dimensions and confirm it is rejected.',
            'Compare T(u+v) with T(u)+T(v) for two small vectors and a fixed matrix.',
            'Change one feature value and verify only the expected output components change.',
            'Calculate an ID-set intersection and compare the reported overlap with the input records.',
          ],
        },
        masteryCriteria: [
          'State the dimensions of scalars, vectors and matrices and interpret each axis in a small ML batch.',
          'Add and scale equal-length vectors and explain why Python lists need explicit component-wise arithmetic.',
          'Compute dot products, Euclidean norms and distances by hand and with short code.',
          'Transpose a matrix and multiply compatible matrices and vectors while checking dimensions.',
          'Represent and verify a small system of linear equations as Ax=b.',
          'Explain span, independence and rank using explicit linear combinations or dependent rows.',
          'Test a simple eigenvector/eigenvalue relationship and explain why the vector must be nonzero.',
          'Describe how matrix operations appear in feature transformations, model layers, embeddings and tensor shapes.',
          'Complete the Tiny Feature Transformation Workbench with shape checks and hand-verified outputs.',
        ],
      },
      {
        id: 'math-3',
        title: 'Calculus and gradients',
        detail: 'Derivatives, partial derivatives, chain rule, Jacobians and optimization.',
        status: 'later' as const,
        category: 'Math',
        difficulty: 'beginner',
        prerequisites: ['math-1', 'math-2', 'py-1', 'py-4'],
        learningObjectives: [
          'Interpret a derivative as an instantaneous rate of change and the slope of a tangent, and distinguish it from an average rate over an interval.',
          'Use the power, constant-multiple, sum and basic chain rules to differentiate simple polynomial and composed functions.',
          'Approximate a derivative with forward or central finite differences and explain how step size and floating-point rounding affect the estimate.',
          'Calculate a partial derivative by differentiating with respect to one variable while holding the other variables constant.',
          'Assemble partial derivatives into a gradient and use a unit direction vector to calculate a directional derivative.',
          'Build and interpret a Jacobian for a small vector-valued function, with output components as rows and input variables as columns.',
          'Apply the chain rule to a sequence of computations and explain how automatic differentiation uses the same local derivative relationships.',
          'Perform one-dimensional gradient-descent updates and explain the roles of the negative gradient and learning rate.',
          'Recognize that a zero gradient identifies a stationary point, not necessarily a global minimum, and that step size can affect optimization.',
          'Connect derivatives, gradients and Jacobians to loss functions, model parameters, backpropagation and numerical debugging in ML systems.',
        ],
        keyConcepts: [
          'function input and output',
          'average rate of change',
          'instantaneous rate of change',
          'secant line',
          'tangent line',
          'derivative',
          'difference quotient',
          'power rule',
          'sum rule',
          'constant-multiple rule',
          'chain rule',
          'partial derivative',
          'holding other variables constant',
          'gradient',
          'directional derivative',
          'unit direction vector',
          'Jacobian matrix',
          'vector-valued function',
          'finite difference',
          'forward difference',
          'central difference',
          'automatic differentiation',
          'computational graph',
          'loss function',
          'gradient descent',
          'learning rate',
          'stationary point',
          'local minimum',
          'saddle point',
          'backpropagation',
        ],
        contentSections: [
          {
            title: '1. A derivative describes local change',
            content:
              'For a function f, the average rate of change from x to x+h is [f(x+h)−f(x)]/h. It is the slope of the secant line through the two points. The derivative f′(x), when the limit exists, is lim(h→0)[f(x+h)−f(x)]/h: the limiting rate at the point and the slope of the tangent. The derivative is a new function; f′(a) is its value at one input. Units also carry through: if f measures metres and x measures seconds, f′ has units of metres per second.\n\nFor f(x)=x², the difference quotient at x=1 simplifies to [(1+h)²−1]/h = 2+h for h≠0, so its limit is 2. A derivative is local: it describes a small change near the selected input, not a guarantee about large changes elsewhere. A corner, jump or vertical tangent may prevent an ordinary finite derivative from existing at a point.\n\nIn ML, a loss function maps model parameters to a measure of prediction error. A derivative tells how that loss changes as one parameter changes. It is a sensitivity signal, not a judgment about whether the model is useful on unseen data.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/math-3/tangent-derivative.svg',
                alt: 'The curve y equals x squared passes through (1, 1); its tangent there has slope 2, and a nearby secant line illustrates the limiting slope.',
                caption:
                  'As the second point approaches (1, 1), the secant slope approaches the tangent slope f′(1)=2.',
                width: 1200,
                height: 620,
              },
            ],
            codeExamples: [
              {
                title: 'Estimate a derivative with a forward difference',
                language: 'python',
                code: 'def f(x):\n    return x * x\n\nx = 3.0\nh = 0.01\nestimate = (f(x + h) - f(x)) / h\nprint(round(estimate, 2))',
                explanation:
                  'Expected stdout JSON: ["6.01"]\nThe exact derivative of x² at 3 is 6; the forward estimate is slightly high because it measures change across a nonzero step.',
              },
            ],
          },
          {
            title: '2. Differentiate simple formulas with rules',
            content:
              'A few rules let us differentiate common expressions without repeatedly taking a limit. The derivative of a constant is zero; d(xⁿ)/dx = n xⁿ⁻¹ for integer powers; a constant factor stays in front; and the derivative of a sum is the sum of derivatives. For example, differentiating 3x²−4x+2 term by term gives 6x−4. At x=2 the slope is 8.\n\nThese rules apply where the functions are defined and differentiable. They do not mean every expression is differentiable everywhere: for example, the absolute-value graph has a corner at zero. Keep the variable clear, especially when an expression contains more than one variable; partial derivatives will make that distinction explicit.',
            codeExamples: [
              {
                title: 'Evaluate a polynomial derivative',
                language: 'python',
                code: 'def derivative(x):\n    return 6 * x - 4\n\nprint(derivative(2))',
                explanation:
                  'Expected stdout JSON: ["8"]\nThe power rule gives the derivative 6x−4, which evaluates to 8 at x=2.',
              },
            ],
          },
          {
            title: '3. Partial derivatives change one input at a time',
            content:
              'A function of several variables can change at different rates along different input axes. The partial derivative ∂f/∂x measures the rate of change in x while holding the other inputs fixed; ∂f/∂y does the same for y. Treat the other variables like constants while applying ordinary differentiation rules.\n\nFor f(x,y)=x²+3xy+y², the partial derivatives are ∂f/∂x=2x+3y and ∂f/∂y=3x+2y. At (1,2), they are 8 and 7. These are slopes in two coordinate directions at that point, not the complete description of every possible direction. In ML, holding other weights fixed lets us ask how one parameter affects the loss locally.',
            codeExamples: [
              {
                title: 'Evaluate two partial derivatives',
                language: 'python',
                code: 'x, y = 1, 2\ndf_dx = 2 * x + 3 * y\ndf_dy = 3 * x + 2 * y\nprint(df_dx, df_dy)',
                explanation:
                  'Expected stdout JSON: ["8 7"]\nEach partial treats the other input as fixed before evaluating at (1, 2).',
              },
            ],
          },
          {
            title: '4. The gradient collects partial derivatives',
            content:
              'For a scalar-valued function f(x₁,…,xₙ), the gradient ∇f is the vector of its partial derivatives, in the same input order. For f(x,y)=x²+2y², ∇f=(2x,4y), so at (1,−1) the gradient is (2,−4). The gradient points in the direction of steepest local increase; its negative points toward steepest local decrease.\n\nThe directional derivative in a unit direction u is ∇f·u. The direction must have length one for this dot product to represent change per unit distance. For u=(3/5,4/5), the example gradient (2,−4) gives (2·3−4·4)/5=−2, so the function is locally decreasing in that direction. In model training, a gradient over many parameters has one component per parameter; shape and ordering must match the parameter representation.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/math-3/gradient-descent.svg',
                alt: 'Nested elliptical loss contours surround a minimum; parameter updates move toward it opposite the uphill gradient.',
                caption:
                  'The gradient points toward local increase; gradient descent subtracts a scaled gradient to move toward lower loss.',
                width: 1200,
                height: 620,
              },
            ],
            codeExamples: [
              {
                title: 'Calculate a gradient and directional derivative',
                language: 'python',
                code: 'gradient = (2, -4)\ndirection = (3 / 5, 4 / 5)\ndirectional_rate = sum(g * d for g, d in zip(gradient, direction))\nprint(gradient)\nprint(directional_rate)',
                explanation:
                  'Expected stdout JSON: ["(2, -4)", "-2.0"]\nThe direction has unit length, so the dot product is the rate of change along it.',
              },
            ],
          },
          {
            title: '5. The chain rule tracks composed computations',
            content:
              'When an output depends on an intermediate value, its change depends on each link in the path. For y=g(u) and u=f(x), the chain rule is dy/dx=(dy/du)(du/dx). For y=(x²+1)³, let u=x²+1. Then dy/du=3u² and du/dx=2x, so dy/dx=6x(x²+1)². At x=1, the result is 24.\n\nFor multiple inputs, changes can arrive through more than one path. If z=f(x,y), where x and y both depend on t, then dz/dt=(∂z/∂x)(dx/dt)+(∂z/∂y)(dy/dt). This is the same local-rate bookkeeping, summed over paths. Neural-network layers are compositions of functions; backpropagation applies the chain rule from the loss back through those layers.',
            media: [
              {
                type: 'image',
                src: '/lesson-media/math-3/chain-rule.svg',
                alt: 'A computation graph maps x=2 to u=x squared=4, then y=3u+1=13; local derivatives 4 and 3 multiply to give dy by dx=12.',
                caption:
                  'The derivative of the complete computation is the product of the local derivatives along its path.',
                width: 1200,
                height: 560,
              },
            ],
            codeExamples: [
              {
                title: 'Apply the chain rule to a composition',
                language: 'python',
                code: 'x = 1\nderivative = 6 * x * (x * x + 1) ** 2\nprint(derivative)',
                explanation:
                  'Expected stdout JSON: ["24"]\nThis evaluates the derivative 6x(x²+1)² at x=1.',
              },
            ],
          },
          {
            title: '6. Jacobians organize derivatives of vector outputs',
            content:
              'A vector-valued function maps several inputs to several outputs. Its Jacobian places one output’s partial derivatives in each row and one input variable per column. For F(x,y)=(x²+y, xy), the Jacobian is [[2x,1],[y,x]]. At (2,3) it is [[4,1],[3,2]], with shape 2×2 because there are two outputs and two inputs.\n\nFor m outputs and n inputs, this convention gives an m×n Jacobian. A small input change Δx is approximately mapped to ΔF≈JΔx near the point. Jacobians help reason about composed transformations, sensitivity and tensor shape in ML systems. Libraries may choose conventions for gradients and Jacobians that differ in layout, so inspect documented shapes rather than assuming an orientation.',
            codeExamples: [
              {
                title: 'Evaluate a small Jacobian',
                language: 'python',
                code: 'x, y = 2, 3\njacobian = [[2 * x, 1], [y, x]]\nprint(jacobian)',
                explanation:
                  'Expected stdout JSON: ["[[4, 1], [3, 2]]"]\nRows correspond to the two outputs; columns correspond to inputs x and y.',
              },
            ],
          },
          {
            title: '7. Finite differences and automatic differentiation',
            content:
              'When a symbolic derivative is difficult or unavailable, a finite difference estimates it from nearby function values. The forward estimate is [f(x+h)−f(x)]/h. The central estimate [f(x+h)−f(x−h)]/(2h) often has lower truncation error for smooth functions, but both are approximations. A large h can blur local behavior; an extremely small h can magnify floating-point cancellation. Test a few sensible step sizes and compare with an analytic result when possible.\n\nAutomatic differentiation (AD) is different from finite differences and symbolic algebra. AD evaluates a program while applying local derivative rules through its operations, using the chain rule. Reverse-mode AD efficiently computes derivatives of one scalar loss with respect to many parameters, which is why it is central to neural-network training. AD still depends on the operations and values in the executed program; it does not guarantee that the model, data or objective is correct.',
            codeExamples: [
              {
                title: 'Compare a central difference with the exact slope',
                language: 'python',
                code: 'def f(x):\n    return x * x\n\nx = 3.0\nh = 0.01\nestimate = (f(x + h) - f(x - h)) / (2 * h)\nprint(round(estimate, 4))',
                explanation:
                  'Expected stdout JSON: ["6.0"]\nThe central difference estimates the exact derivative 6 at x=3; rounding hides tiny floating-point representation error.',
              },
            ],
          },
          {
            title: '8. Gradient descent turns slopes into parameter updates',
            content:
              'For a differentiable loss L(w), gradient descent updates w to w−ηL′(w), where η>0 is the learning rate. In several dimensions, w becomes a parameter vector and L′ becomes ∇L. The minus sign follows the local downhill direction. For L(w)=(w−3)², the derivative is 2(w−3). Starting at w=0 with η=0.1 gives gradient −6, next parameter 0.6, and loss 5.76 instead of 9.\n\nA learning rate that is too large may overshoot or diverge; one that is too small can make progress slow. A zero gradient can occur at a minimum, maximum, saddle point, or flat region, so it does not by itself prove a global minimum. Real training also depends on data, loss scaling, parameterization and numerical behavior. Monitor loss and validate model quality separately.',
            codeExamples: [
              {
                title: 'Take one gradient-descent step',
                language: 'python',
                code: 'def loss(w):\n    return (w - 3) ** 2\n\ndef gradient(w):\n    return 2 * (w - 3)\n\nw = 0.0\nlearning_rate = 0.1\nw = w - learning_rate * gradient(w)\nprint(round(w, 2))\nprint(round(loss(w), 2))',
                explanation:
                  'Expected stdout JSON: ["0.6", "5.76"]\nThe initial loss is 9; subtracting the negative gradient moves w toward 3 and lowers this quadratic loss.',
              },
            ],
          },
        ],
        workedExamples: [
          {
            title: 'Example 1: Find a derivative from the definition',
            problem: 'Use the difference quotient to find the derivative of f(x)=x² at x=1.',
            reasoning:
              'Substitute f(1+h)=(1+h)² and f(1)=1 into the quotient, then simplify for h≠0 before taking the limit.',
            solution: '[(1+h)²−1]/h = (2h+h²)/h = 2+h. As h approaches zero, the derivative is 2.',
            explanation: 'The limiting secant slope is the tangent slope at the selected point.',
          },
          {
            title: 'Example 2: Differentiate a polynomial',
            problem: 'Find the derivative of f(x)=3x²−4x+2 and evaluate it at x=2.',
            reasoning:
              'Apply the power rule term by term; the constant term differentiates to zero.',
            solution: 'f′(x)=6x−4, so f′(2)=12−4=8.',
            explanation: 'The slope of the graph at x=2 is 8.',
          },
          {
            title: 'Example 3: Calculate two partial derivatives',
            problem: 'For f(x,y)=x²+3xy+y², calculate both partial derivatives at (1,2).',
            reasoning: 'For ∂f/∂x hold y fixed; for ∂f/∂y hold x fixed.',
            solution: '∂f/∂x=2x+3y=2+6=8. ∂f/∂y=3x+2y=3+4=7.',
            explanation:
              'The two values describe the local slopes along the coordinate directions.',
          },
          {
            title: 'Example 4: Apply the chain rule',
            problem: 'Differentiate y=(x²+1)³ and evaluate the derivative at x=1.',
            reasoning:
              'Differentiate the outer cube, keep the inner expression, and multiply by the derivative of the inner expression.',
            solution: 'dy/dx=3(x²+1)²(2x)=6x(x²+1)²; at x=1 this is 6·1·2²=24.',
            explanation: 'Each nested operation contributes a local derivative factor.',
          },
          {
            title: 'Example 5: Find a directional derivative',
            problem:
              'For f(x,y)=x²+2y² at (1,−1), find the rate of change along the unit vector (3/5,4/5).',
            reasoning:
              'First calculate the gradient at the point, then take its dot product with the given unit direction.',
            solution: '∇f=(2x,4y)=(2,−4); the directional derivative is (2·3−4·4)/5=−2.',
            explanation: 'The negative result means f decreases locally in that direction.',
          },
          {
            title: 'Example 6: Evaluate a Jacobian',
            problem: 'Find the Jacobian of F(x,y)=(x²+y,xy) at (2,3).',
            reasoning:
              'Differentiate each output with respect to x and y; place the first output derivatives in row one.',
            solution: 'The Jacobian is [[2x,1],[y,x]], so at (2,3) it is [[4,1],[3,2]].',
            explanation: 'Its two rows represent outputs and its two columns represent inputs.',
          },
          {
            title: 'Example 7: Check a central-difference estimate',
            problem: 'Estimate f′(3) for f(x)=x² with central step h=0.01.',
            reasoning: 'Evaluate [f(3+h)−f(3−h)]/(2h) using the stated step.',
            solution:
              '[(3.01)²−(2.99)²]/0.02 = (9.0601−8.9401)/0.02 = 6. The exact derivative is also 6.',
            explanation:
              'The equality holds for this quadratic and symmetric central difference, apart from possible floating-point rounding.',
          },
          {
            title: 'Example 8: Perform one gradient-descent update',
            problem: 'For L(w)=(w−3)², take one step from w=0 with learning rate 0.1.',
            reasoning:
              'Differentiate the loss, evaluate the gradient at the current value, and subtract learning rate times gradient.',
            solution:
              'L′(w)=2(w−3), so L′(0)=−6. The next value is 0−0.1(−6)=0.6; the new loss is (0.6−3)²=5.76.',
            explanation: 'This step moves downhill for the chosen quadratic and learning rate.',
          },
        ],
        commonMistakes: [
          {
            title: 'Confusing average and instantaneous change',
            explanation:
              'A secant slope spans a finite interval; a derivative is the limit as that interval shrinks. Do not label a finite difference as exact unless you have proved it for the function and step.',
          },
          {
            title: 'Forgetting which variable is held fixed',
            explanation:
              'A partial derivative differentiates with respect to one input and treats the other inputs as constants.',
          },
          {
            title: 'Applying the chain rule to only the outer function',
            explanation:
              'For a composition, multiply by the derivative of the inner expression. Trace each input-to-output link to avoid dropping a factor.',
          },
          {
            title: 'Using a non-unit vector in a directional derivative',
            explanation:
              'The dot product with a non-unit direction scales by its length. Normalize the direction if the requested quantity is change per unit distance.',
          },
          {
            title: 'Transposing the Jacobian convention without noticing',
            explanation:
              'This lesson uses outputs as rows and inputs as columns. Check the library convention and expected shape before comparing results.',
          },
          {
            title: 'Treating finite differences as exact',
            explanation:
              'Finite differences have truncation and floating-point errors. Try multiple step sizes and compare against an analytic derivative when one is available.',
          },
          {
            title: 'Confusing automatic differentiation with finite differences',
            explanation:
              'Automatic differentiation applies derivative rules to the executed operations; it does not estimate a slope by perturbing inputs.',
          },
          {
            title: 'Assuming every zero gradient is a minimum',
            explanation:
              'A stationary point can also be a maximum or saddle point. Inspect the objective and use additional analysis or validation.',
          },
          {
            title: 'Choosing a learning rate without checking its effect',
            explanation:
              'An overly large step can increase loss or diverge. Track the objective and reduce or otherwise adjust the step if updates are unstable.',
          },
          {
            title: 'Assuming a gradient validates an ML model',
            explanation:
              'A gradient describes local change in the chosen objective. It does not detect data leakage, poor labels, distribution shift or inadequate evaluation.',
          },
        ],
        resources: [
          {
            id: 'math-3-openstax-partials',
            title: 'OpenStax Calculus Volume 3: Partial Derivatives',
            url: 'https://openstax.org/books/calculus-volume-3/pages/4-3-partial-derivatives',
            type: 'book',
            explanation:
              'A free textbook section introducing partial derivatives and their interpretation.',
          },
          {
            id: 'math-3-openstax-chain-rule',
            title: 'OpenStax Calculus Volume 3: The Chain Rule',
            url: 'https://openstax.org/books/calculus-volume-3/pages/4-5-the-chain-rule',
            type: 'book',
            explanation:
              'Extends the chain rule to multivariable computations and derivative paths.',
          },
          {
            id: 'math-3-openstax-gradient',
            title: 'OpenStax Calculus Volume 3: Directional Derivatives and the Gradient',
            url: 'https://openstax.org/books/calculus-volume-3/pages/4-6-directional-derivatives-and-the-gradient',
            type: 'book',
            explanation: 'Explains gradients, directional derivatives and their geometric meaning.',
          },
          {
            id: 'math-3-mit-multivariable',
            title: 'MIT OpenCourseWare: Multivariable Calculus (18.02SC)',
            url: 'https://ocw.mit.edu/courses/18-02sc-multivariable-calculus-fall-2010/',
            type: 'course',
            explanation:
              'A self-study course with lectures, notes, worked problems and assessments.',
          },
          {
            id: 'math-3-pytorch-autograd',
            title: 'PyTorch: Automatic Differentiation with torch.autograd',
            url: 'https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html',
            type: 'documentation',
            explanation:
              'Connects computational graphs and automatic differentiation to neural-network training.',
          },
          {
            id: 'math-3-numpy-gradient',
            title: 'NumPy: numpy.gradient',
            url: 'https://numpy.org/doc/stable/reference/generated/numpy.gradient.html',
            type: 'documentation',
            explanation:
              'Documents numerical gradients for sampled one- and multi-dimensional data.',
          },
        ],
        exercises: [
          {
            id: 'math-3-exercise-average-rate',
            title: '1. Compare two average rates',
            instructions:
              'For f(x)=x², calculate the average rate of change from x=2 to x=3 and from x=2 to x=2.1. Explain why the two rates differ.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Compute each difference quotient accurately.',
              'Describe how interval width affects the average rate.',
            ],
            acceptanceCriteria: [
              'Show the function values and interval widths used.',
              'Distinguish each secant slope from the derivative at a single point.',
            ],
          },
          {
            id: 'math-3-exercise-polynomial',
            title: '2. Differentiate a polynomial',
            instructions:
              'Differentiate f(x)=5x³−2x²+7x−4. Evaluate the derivative at x=−1 and explain each rule used.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Apply the power, constant-multiple and sum rules.',
              'Evaluate the resulting derivative at the specified input.',
            ],
            acceptanceCriteria: [
              'Show the derivative term by term.',
              'Substitute the input only after differentiating.',
            ],
          },
          {
            id: 'math-3-exercise-limit-definition',
            title: '3. Use a difference quotient',
            instructions:
              'Use the limit definition to find the derivative of f(x)=x²+2x at a general input x.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Substitute f(x+h) and f(x) into the quotient.',
              'Simplify before taking the limit.',
            ],
            acceptanceCriteria: [
              'State the restriction on h while simplifying.',
              'Show the final derivative as a function of x.',
            ],
          },
          {
            id: 'math-3-exercise-partials',
            title: '4. Calculate partial derivatives',
            instructions:
              'For f(x,y)=2x²−xy+3y², find both first partial derivatives and evaluate them at (1,−2).',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Differentiate with respect to each variable independently.',
              'Evaluate both derivatives at the requested point.',
            ],
            acceptanceCriteria: [
              'Show which variable is held constant in each calculation.',
              'Keep the two evaluated partial derivatives clearly labeled.',
            ],
          },
          {
            id: 'math-3-exercise-chain',
            title: '5. Apply the chain rule',
            instructions:
              'Differentiate y=(2x−1)⁴ and evaluate the derivative at x=2. Show the outer and inner derivative factors.',
            difficulty: 'beginner',
            expectedOutcomes: [
              'Identify the inner and outer functions.',
              'Multiply their derivative factors in the chain rule.',
            ],
            acceptanceCriteria: [
              'Include the inner derivative factor.',
              'Substitute the requested input into the complete derivative.',
            ],
          },
          {
            id: 'math-3-exercise-gradient',
            title: '6. Interpret a gradient',
            instructions: 'For f(x,y)=3x²+y², find and interpret the gradient at (−1,2).',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'Assemble partial derivatives in input order.',
              'Explain what the gradient direction and magnitude represent locally.',
            ],
            acceptanceCriteria: [
              'Label the components by input variable.',
              'Do not claim the gradient alone proves a global optimum.',
            ],
          },
          {
            id: 'math-3-exercise-directional',
            title: '7. Calculate a directional derivative',
            instructions:
              'For f(x,y)=xy at (2,3), calculate the directional derivative in the direction (−3/5,4/5). Explain how you confirmed the direction is a unit vector.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'Calculate the gradient at the point.',
              'Use a dot product with a normalized direction.',
            ],
            acceptanceCriteria: [
              'Verify the direction length.',
              'Interpret the sign of the directional rate.',
            ],
          },
          {
            id: 'math-3-exercise-jacobian',
            title: '8. Build a Jacobian',
            instructions:
              'For G(x,y)=(x+y², x²−y), derive its Jacobian and evaluate it at (1,2). State its shape and explain the row and column meanings.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'Differentiate each output with respect to both inputs.',
              'Use a consistent Jacobian orientation.',
            ],
            acceptanceCriteria: [
              'Place output derivatives in rows and input variables in columns.',
              'Substitute the point into every matrix entry.',
            ],
          },
          {
            id: 'math-3-exercise-finite-difference',
            title: '9. Compare finite-difference step sizes',
            instructions:
              'Estimate the derivative of f(x)=x³ at x=2 using central differences with two different positive step sizes. Compare each estimate with the analytic derivative and discuss the observed error.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'Implement a central-difference calculation.',
              'Compare numerical estimates with a symbolic derivative.',
            ],
            acceptanceCriteria: [
              'Report both step sizes and estimates.',
              'Discuss truncation and floating-point effects without claiming smaller is always better.',
            ],
          },
          {
            id: 'math-3-exercise-optimization',
            title: '10. Trace repeated gradient-descent updates',
            instructions:
              'For L(w)=(w+2)², start at w=4 and use a fixed learning rate of 0.2 for three updates. Record each parameter and loss.',
            difficulty: 'intermediate',
            expectedOutcomes: [
              'Derive the loss gradient.',
              'Apply the update repeatedly using the latest parameter.',
            ],
            acceptanceCriteria: [
              'Use the same stated rate for each step.',
              'Recompute the gradient and loss after every update.',
            ],
          },
          {
            id: 'math-3-exercise-learning-rate',
            title: '11. Investigate learning-rate behavior',
            instructions:
              'Use L(w)=(w−1)², start at w=4, and compare a small, moderate and large positive learning rate over several updates. Describe how the parameter and loss behave.',
            difficulty: 'advanced',
            expectedOutcomes: [
              'Implement an update loop for multiple learning rates.',
              'Relate observed progress or instability to step size.',
            ],
            acceptanceCriteria: [
              'Keep the objective and starting value fixed between trials.',
              'Support claims with recorded parameter and loss values.',
            ],
          },
          {
            id: 'math-3-exercise-ml-gradient',
            title: '12. Debug an ML gradient plan',
            instructions:
              'A scalar loss depends on a parameter vector containing four weights and one bias. Describe the expected gradient structure, give two checks for a numerical gradient test, and explain what a successful test cannot establish about the model.',
            difficulty: 'advanced',
            expectedOutcomes: [
              'Relate gradient entries to the parameter structure.',
              'Propose meaningful checks for a numerical comparison.',
            ],
            acceptanceCriteria: [
              'Address shape/order consistency and at least one step-size issue.',
              'Distinguish implementation checks from model-quality evaluation.',
            ],
          },
        ],
        assessmentQuestions: [
          {
            id: 'math-3-check-derivative',
            prompt: 'Differentiate f(x)=x³−2x and evaluate f′(2).',
            expectedAnswer: 'f′(x)=3x²−2, so f′(2)=10.',
            explanation: 'Apply the power and sum rules, then substitute the input.',
          },
          {
            id: 'math-3-check-partials',
            prompt: 'For f(x,y)=x²+xy, find ∂f/∂y at (2,3).',
            expectedAnswer: '∂f/∂y=x, so its value is 2.',
            explanation: 'Treat x as a constant when differentiating with respect to y.',
          },
          {
            id: 'math-3-check-chain',
            prompt: 'If y=(x+1)², what is dy/dx at x=2?',
            expectedAnswer: 'dy/dx=2(x+1), giving 6 at x=2.',
            explanation: 'Differentiate the outer square and multiply by the inner derivative.',
          },
          {
            id: 'math-3-check-gradient',
            prompt: 'For f(x,y)=x²+y², what is the gradient at (1,−2)?',
            expectedAnswer: '∇f=(2x,2y), so ∇f(1,−2)=(2,−4).',
            explanation: 'The gradient lists both coordinate partial derivatives.',
          },
          {
            id: 'math-3-check-direction',
            prompt:
              'For gradient (3,4), what is the directional derivative in unit direction (0,1)?',
            expectedAnswer: 'The dot product is 3·0+4·1=4.',
            explanation:
              'A directional derivative in a unit direction is the gradient dot that direction.',
          },
          {
            id: 'math-3-check-jacobian',
            prompt: 'For F(x,y)=(x+y,xy), what is the Jacobian at (2,3) using outputs as rows?',
            expectedAnswer: 'The Jacobian is [[1,1],[y,x]], so at (2,3) it is [[1,1],[3,2]].',
            explanation: 'Each row contains one output’s derivatives with respect to x and y.',
          },
          {
            id: 'math-3-check-central-difference',
            prompt: 'For f(x)=x², what central-difference estimate is produced at x=2 with h=0.1?',
            expectedAnswer: '[(2.1)²−(1.9)²]/0.2=(4.41−3.61)/0.2=4.',
            explanation: 'The central difference equals the exact derivative for this quadratic.',
          },
          {
            id: 'math-3-check-update',
            prompt:
              'For L(w)=(w−1)², take one gradient-descent step from w=3 with learning rate 0.25.',
            expectedAnswer: 'L′(w)=2(w−1), so the gradient is 4 and the next w is 3−0.25·4=2.',
            explanation: 'The update subtracts the positive gradient scaled by the learning rate.',
          },
          {
            id: 'math-3-check-zero-gradient',
            prompt: 'Does a zero gradient alone prove that a point is a global minimum?',
            expectedAnswer:
              'No. A zero gradient identifies a stationary point; it may be a local minimum, local maximum, saddle point or flat region.',
            explanation:
              'Additional analysis is needed to classify a stationary point and establish global optimality.',
          },
          {
            id: 'math-3-check-autodiff',
            prompt: 'How does automatic differentiation differ from a finite-difference estimate?',
            expectedAnswer:
              'Automatic differentiation applies local derivative rules through the executed computation graph; finite differences estimate change by evaluating nearby inputs.',
            explanation:
              'Both can support gradient checks, but they compute derivatives by different methods.',
          },
        ],
        miniBuild: {
          title: 'Gradient Descent Loss Explorer',
          goal: 'Build a small Python program that explores how gradient descent changes a parameter while minimizing a simple, known loss, then reports enough evidence to inspect each step.',
          requirements: [
            'Use a one-variable quadratic loss with a clearly stated minimum.',
            'Represent the loss and its derivative as separate functions.',
            'Accept or configure an initial parameter, positive learning rate and number of updates.',
            'Print the starting parameter and loss, then the parameter, gradient and loss after each update.',
            'Reject invalid update counts and non-positive learning rates with a clear message.',
            'Use only the Python standard library for the core implementation.',
          ],
          milestones: [
            'Write down the loss, its derivative and the location of its minimum before coding.',
            'Implement the loss and derivative independently and check them at a hand-selected point.',
            'Implement one update and verify its parameter and loss by hand.',
            'Repeat the update for a configurable number of steps and record the full trace.',
            'Compare traces from multiple positive learning rates while keeping the initial value and loss fixed.',
            'Add input validation and a test demonstrating a rejected invalid setting.',
            'Explain what the trace shows and why reaching a low training loss is not evidence of generalization.',
          ],
          acceptanceCriteria: [
            'The derivative function matches the chosen loss derivative.',
            'Every update uses the current parameter and the formula w_next=w−ηL′(w).',
            'Printed values include enough precision to follow progress and are labeled clearly.',
            'A valid run produces the requested number of updates and reports loss at every step.',
            'Invalid learning rates and update counts are reported without a traceback.',
            'At least one update and one loss value are independently checked by hand.',
            'The explanation distinguishes optimization of the selected objective from model evaluation.',
          ],
          testCases: [
            'Run from a value on one side of the known minimum with a modest learning rate.',
            'Run from the other side and inspect whether the update direction changes appropriately.',
            'Try a learning rate that causes an overshoot and describe the observed loss.',
            'Try a zero or negative learning rate and verify validation.',
            'Try an invalid update count and verify validation.',
            'Compare the final loss with the initial loss for a stable run.',
          ],
        },
        masteryCriteria: [
          'Explain a derivative as a limit of average rates and interpret it as a local slope with units.',
          'Differentiate simple polynomial expressions and apply the chain rule to nested functions.',
          'Calculate and interpret partial derivatives while stating which inputs are held constant.',
          'Assemble a gradient and calculate a directional derivative using a unit vector.',
          'Construct a small Jacobian with output rows and input columns and state its shape.',
          'Compare a finite-difference estimate with an analytic derivative and identify step-size limitations.',
          'Explain how automatic differentiation uses the chain rule through a computation graph.',
          'Perform and interpret gradient-descent updates, including the effect of learning rate and stationary points.',
          'Complete the Gradient Descent Loss Explorer with validation and hand-checked results.',
          'Relate gradients and Jacobians to model parameters, backpropagation and ML system debugging without treating them as proof of model quality.',
        ],
      },
      {
        id: 'math-4',
        title: 'Probability and statistics',
        detail: 'Random variables, distributions, Bayes, expectation, variance and estimation.',
        status: 'later' as const,
        category: 'Math',
      },
    ],
  },
  {
    id: 'classical-machine-learning',
    name: 'Classical Machine Learning',
    tag: 'MODEL BUILDING',
    description: 'Learn the modelling workflow using real datasets and sound evaluation.',
    lessons: [
      {
        id: 'ml-1',
        title: 'Data investigation and feature engineering',
        detail: 'Data quality, leakage, missing values, encoding, scaling and feature reasoning.',
        status: 'later' as const,
        category: 'ML',
      },
      {
        id: 'ml-2',
        title: 'Supervised learning',
        detail: 'Linear and logistic regression, trees, ensembles and model evaluation.',
        status: 'later' as const,
        category: 'ML',
      },
      {
        id: 'ml-3',
        title: 'Unsupervised learning and dimensionality reduction',
        detail: 'Clustering, PCA and representation of high-dimensional data.',
        status: 'later' as const,
        category: 'ML',
      },
    ],
  },
  {
    id: 'deep-learning-pytorch',
    name: 'Deep Learning & PyTorch',
    tag: 'NEURAL NETWORKS',
    description: 'Understand neural networks before moving into transformer internals.',
    lessons: [
      {
        id: 'dl-1',
        title: 'Tensors and PyTorch workflow',
        detail:
          'Tensor creation, shapes, broadcasting, matrix multiplication, autograd and datasets.',
        status: 'later' as const,
        category: 'PyTorch',
      },
      {
        id: 'dl-2',
        title: 'Neural networks from scratch',
        detail: 'Neurons, layers, loss functions, backpropagation, optimizers and training loops.',
        status: 'later' as const,
        category: 'Deep Learning',
      },
      {
        id: 'dl-3',
        title: 'CNNs and practical deep learning',
        detail: 'Convolutions, transfer learning, regularization and experiment tracking.',
        status: 'later' as const,
        category: 'Deep Learning',
      },
      {
        id: 'dl-4',
        title: 'Attention and transformers',
        detail: 'Attention, self-attention, positional information and a small GPT implementation.',
        status: 'later' as const,
        category: 'LLMs',
      },
    ],
  },
  {
    id: 'software-engineering-mlops',
    name: 'Software Engineering & MLOps',
    tag: 'SHIP RELIABLY',
    description: 'Turn experiments into testable, deployable software.',
    lessons: [
      {
        id: 'ops-1',
        title: 'Python software engineering',
        detail: 'OOP when useful, project structure, typing, tests, logging and packaging.',
        status: 'later' as const,
        category: 'Engineering',
      },
      {
        id: 'ops-2',
        title: 'APIs, FastAPI and Docker',
        detail: 'Build inference APIs, validate inputs, containerize and test services.',
        status: 'later' as const,
        category: 'MLOps',
      },
      {
        id: 'ops-3',
        title: 'MLflow, CI/CD and monitoring',
        detail: 'Track experiments, version data, automate checks and monitor model services.',
        status: 'later' as const,
        category: 'MLOps',
      },
      {
        id: 'ops-4',
        title: 'Cloud deployment foundations',
        detail: 'Deploy a small service, understand object storage, compute, networking and costs.',
        status: 'later' as const,
        category: 'Cloud',
      },
    ],
  },
  {
    id: 'systems-distributed-computing',
    name: 'Systems & Distributed Computing',
    tag: 'SYSTEMS DEPTH',
    description: 'Learn the infrastructure ideas behind scalable services and ML platforms.',
    lessons: [
      {
        id: 'sys-1',
        title: 'Operating systems and networking',
        detail: 'Processes, memory, concurrency, HTTP, TCP, latency and resource limits.',
        status: 'later' as const,
        category: 'Systems',
      },
      {
        id: 'sys-2',
        title: 'Databases, caching and queues',
        detail: 'Indexes, transactions, cache policies, task queues, streams and backpressure.',
        status: 'later' as const,
        category: 'Systems',
      },
      {
        id: 'sys-3',
        title: 'Distributed systems foundations',
        detail: 'Replication, consistency, partitioning, consensus, failure and observability.',
        status: 'later' as const,
        category: 'Distributed Systems',
      },
      {
        id: 'sys-4',
        title: 'System design for ML services',
        detail: 'Design an ML-backed service with SLOs, capacity estimates and failure handling.',
        status: 'later' as const,
        category: 'System Design',
      },
    ],
  },
  {
    id: 'inference-engineering-ai-infrastructure',
    name: 'Inference Engineering & AI Infrastructure',
    tag: 'SPECIALIZATION',
    description: 'Your primary specialization: measure, optimize and operate model inference.',
    lessons: [
      {
        id: 'inf-1',
        title: 'Run and inspect your first open LLM',
        detail: 'Load a small model, tokenize prompts, generate output and observe GPU memory.',
        status: 'later' as const,
        category: 'Inference',
      },
      {
        id: 'inf-2',
        title: 'Prefill, decode and KV cache',
        detail: 'Understand token generation, KV memory, context length and concurrency limits.',
        status: 'later' as const,
        category: 'Inference',
      },
      {
        id: 'inf-3',
        title: 'Benchmark inference correctly',
        detail: 'Measure TTFT, TPOT, throughput, tail latency, goodput and reproducibility.',
        status: 'later' as const,
        category: 'Inference',
      },
      {
        id: 'inf-4',
        title: 'Serving engines and continuous batching',
        detail: 'Compare a basic PyTorch server with vLLM; study scheduling and batching.',
        status: 'later' as const,
        category: 'Inference',
      },
      {
        id: 'inf-5',
        title: 'Quantization, profiling and optimization',
        detail: 'Study precision, memory bandwidth, profiling and quality/performance tradeoffs.',
        status: 'later' as const,
        category: 'Inference',
      },
      {
        id: 'inf-6',
        title: 'Production inference capstone',
        detail: 'Build, benchmark, monitor and document a cost-aware inference service.',
        status: 'later' as const,
        category: 'Capstone',
      },
    ],
  },
];
export const starterGoals = [
  { id: 'g1', title: 'Build a consistent Python practice habit', due: '2026-11-30', done: false },
  {
    id: 'g2',
    title: 'Finish the current real-dataset investigation',
    due: '2026-12-15',
    done: false,
  },
  {
    id: 'g3',
    title: 'Publish one honest technical learning update each week',
    due: '2026-12-31',
    done: false,
  },
];
