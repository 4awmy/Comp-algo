var e=`sheet02`,t=`lec02`,n=2,r=`Analysis Fundamentals`,i=[{number:1,question:`For the following code segments, define the basic operation and find the total execution count T(n):
a. x <- 0; for i <- 1 to n do x <- x+1
b. x <- 0; for i <- 1 to n do x <- x+1*2
c. x <- 0; for i <- 1 to n do x <- x+1; x <- x+x
d. x <- 19; for i <- 1 to n do x <- x-1; x <- x+x
e. x <- 0; for i <- 1 to n do for j <- 1 to n do x <- x+1; x <- x+x
f. x <- 0; for i <- 1 to n do for j <- 1 to i do x <- x*2; x <- x/3`,answer:`Basic Operations and T(n):
a. Addition/assignment inside loop. T(n) = n ∈ Θ(n).
b. Multiplication/addition. T(n) = n ∈ Θ(n).
c. Loop iterations. T(n) = n ∈ Θ(n).
d. Loop iterations. T(n) = n ∈ Θ(n).
e. Nested loop body execution. T(n) = n^2 ∈ Θ(n^2).
f. Inner loop statements. T(n) = ∑_{i=1}^n i = n(n+1)/2 ∈ Θ(n^2).`,explanation:[{step:1,text:`Identify the statement inside the innermost loop as the basic operation.`},{step:2,text:`Set up a sum representing how many times the loop runs. For nested loops, use a nested summation.`},{step:3,text:`For part f: inner loop runs 'i' times for each outer step 'i'. Summing i from 1 to n yields n(n+1)/2.`}],hasVisualization:!0,algorithm:`analysisWorkspace`},{number:2,question:`Consider definition-based matrix algorithms:
a. For adding two n x n matrices, what is the basic operation? How many times is it performed as a function of matrix order n? As a function of total elements N?
b. Answer the same for definition-based matrix multiplication.`,answer:`Answers:
a. Addition of elements. Performed n^2 times. In terms of N = 2n^2 (total input elements), it is N/2 times.
b. Multiplication of elements. Performed n^3 times. In terms of N = 2n^2, it is (N/2)^1.5 times.`,explanation:[{step:1,text:`Matrix addition loops through all cells i, j: C[i,j] = A[i,j] + B[i,j]. This requires exactly n^2 additions.`},{step:2,text:`Matrix multiplication loops through i, j, k: C[i,j] = ∑ A[i,k] * B[k,j]. This takes n^3 multiplications.`},{step:3,text:`Express n in terms of total input elements N = 2n^2 (two n x n matrices). n = sqrt(N/2). Substitute to get formulas.`}],hasVisualization:!0,algorithm:`analysisWorkspace`},{number:3,question:`Glove selection: There are 22 gloves in a drawer: 5 pairs of red gloves, 4 pairs of yellow, and 2 pairs of green. You select gloves in the dark. What is the smallest number of gloves you need to select to have at least one matching pair in (a) the best case, and (b) the worst case?`,answer:`a. Best Case: 2 gloves (if first two selected match in color).
b. Worst Case: 12 gloves (you could select 5 left-red, 4 left-yellow, and 2 left-green without forming any pairs. The 12th glove must form a pair).`,explanation:[{step:1,text:`Analyze total glove counts: Red (10), Yellow (8), Green (4). Total = 22 gloves.`},{step:2,text:`Best Case: Minimum possible selections to get a matching pair is choosing two of the same color, which takes 2 draws.`},{step:3,text:`Worst Case: Apply Pigeonhole Principle. Maximum single gloves of different types you can draw without any matches is 1 of each pair = 5 + 4 + 2 = 11 gloves. The next glove (12th) will guarantee a matching pair.`}],hasVisualization:!0,algorithm:`exhaustiveSearch`},{number:4,question:`For each of the following functions, indicate how much the function's value will change if its argument is increased fourfold (n becomes 4n):
a. log_2 n
b. √n
c. n
d. n^2
e. n^3
f. 2^n`,answer:`Answers:
a. log_2(4n) = log_2 n + 2 (increases by a constant +2)
b. sqrt(4n) = 2*sqrt(n) (doubles)
c. 4n (increases 4-fold)
d. (4n)^2 = 16n^2 (increases 16-fold)
e. (4n)^3 = 64n^3 (increases 64-fold)
f. 2^(4n) = (2^n)^4 (raised to the fourth power)`,explanation:[{step:1,text:`Substitute n with 4n in each expression and simplify.`},{step:2,text:`Compare the simplified expression with the original function to determine the ratio or difference of growth.`}],hasVisualization:!0,algorithm:`analysisWorkspace`},{number:5,question:`List the following functions in order of growth from lowest to highest:
(n-2)!, 5log(n+100)^10, 2^{2n}, 0.002n^4 + 3n^3 + 1, ln^2 n, 3^n, 3n`,answer:`Order of growth (lowest to highest):
ln^2 n < 5log(n+100)^10 < 3n < 0.002n^4 + 3n^3 + 1 < 3^n < 2^{2n} < (n-2)!`,explanation:[{step:1,text:`Logarithmic functions grow slowest (ln^2 n < log^10 n).`},{step:2,text:`Linear functions (3n) grow faster than logs, but slower than polynomial powers (n^4).`},{step:3,text:`Exponential functions (3^n < 4^n = 2^{2n}) grow faster than any polynomial.`},{step:4,text:`Factorial functions (n-2)! grow the fastest among the listed functions.`}],hasVisualization:!0,algorithm:`analysisWorkspace`},{number:6,question:`For each of the following pairs, indicate whether the first function has a lower, same, or higher order of growth than the second:
a. 100n^2 and 0.01n^3
b. log_2^2 n and log_2 n^2
c. (n-1)! and n!
d. n(n+1) and 2000n^2
e. log_2 n and ln n
f. 2^{n-1} and 2^n`,answer:`Answers:
a. Lower
b. Higher
c. Lower
d. Same
e. Same
f. Same`,explanation:[{step:1,text:`Use limits lim_{n->∞} f(n)/g(n) to determine relationship. If limit is 0, first is lower; if c > 0, same; if ∞, first is higher.`},{step:2,text:`Part b: log_2^2 n = (log_2 n)^2. log_2 n^2 = 2 * log_2 n. Since (log_2 n)^2 / log_2 n goes to infinity, it has a higher order of growth.`},{step:3,text:`Part f: 2^(n-1) = 0.5 * 2^n. They differ by a constant multiple of 0.5, so they have the same order of growth.`}],hasVisualization:!0,algorithm:`analysisWorkspace`},{number:7,question:`Analyze the following algorithms to state their basic operation, T(n), and order of growth:
a. Mystery(n): S <- 0; for i <- 1 to n do S <- S + i*i; return S
b. Secret(A[0..n-1]): minval <- A[0]; maxval <- A[0]; for i <- 1 to n-1 do (if A[i] < minval ... if A[i] > maxval ...); return maxval - minval
c. Enigma(A[0..n-1, 0..n-1]): for i <- 0 to n-2 do for j <- i+1 to n-1 do (if A[i,j] != A[j,i] return false); return true`,answer:`Answers:
a. Mystery: Basic operation is multiplication (i*i) or addition. T(n) = n. Growth: Θ(n).
b. Secret: Basic operation is comparison (A[i] < minval). T(n) = n - 1 (or 2(n-1) depending on implementation). Growth: Θ(n).
c. Enigma: Basic operation is comparison (A[i,j] != A[j,i]). Worst case T(n) = n(n-1)/2. Growth: Θ(n^2).`,explanation:[{step:1,text:`For Mystery: loop runs n times executing single multiplication and additions inside, hence linear.`},{step:2,text:`For Secret: single loop from 1 to n-1 performs array comparisons, hence linear.`},{step:3,text:`For Enigma: nested loops where j runs from i+1 to n-1. Total comparisons is ∑_{i=0}^{n-2} (n-1-i) = n(n-1)/2, hence quadratic.`}],hasVisualization:!0,algorithm:`analysisWorkspace`}],a={id:e,lectureId:t,week:2,title:r,problems:i};export{a as default,e as id,t as lectureId,i as problems,r as title,n as week};