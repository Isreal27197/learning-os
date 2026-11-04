import type { LessonContent } from '../curriculum/lessonTypes';

export const content: LessonContent = {
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
};
