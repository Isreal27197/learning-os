import type { LessonContent } from '../curriculum/lessonTypes';

export const content: LessonContent = {
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
};
