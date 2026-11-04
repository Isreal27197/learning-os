import type { LessonContent } from '../curriculum/lessonTypes';

export const content: LessonContent = {
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
};
