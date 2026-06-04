var e=`sheet01`,t=`lec01`,n=1,r=`Introduction`,i=[{number:1,question:`What is a computing algorithm? Define its key characteristics.`,answer:`A computing algorithm is a sequence of unambiguous instructions for solving a problem, i.e., for obtaining a required output for any legitimate input in a finite amount of time. Key characteristics include: finiteness, definiteness, input/output constraints, and effectiveness.`,explanation:[{step:1,text:`Understand the input parameters and the expected output for the given problem statement.`},{step:2,text:`Define the sequence of unambiguous steps required to transition from input to output.`},{step:3,text:`Validate the finiteness (termination) and correctness by tracing a test case.`}],hasVisualization:!0,algorithm:`sieveEratosthenes`},{number:2,question:`Compute the following sums using mathematical analysis:
a. 1 + 2 + 3 + ... + 70
b. 1 + 3 + 5 + ... + 999`,answer:`a. The sum is 2485 (using the formula n(n+1)/2 = 70 * 71 / 2).
b. The sum is 250000 (since 1 + 3 + ... + (2k-1) = k^2, where k = 500 terms: 500^2 = 250,000).`,explanation:[{step:1,text:`For part a, apply the arithmetic series sum formula: Sum = n(n+1)/2, with n = 70.`},{step:2,text:`For part b, identify the series of consecutive odd integers. Find the number of terms k = (999 - 1)/2 + 1 = 500.`},{step:3,text:`Use the odd sum formula: Sum = k^2 = 500^2 = 250,000.`}],hasVisualization:!0,algorithm:`euclidGcd`},{number:3,question:`Solve the following summation formulas:
a. ∑_{i=3}^{5} 2
b. ∑_{i=3}^{10} C
c. ∑_{i=3}^{n} 2
d. ∑_{i=0}^{n-1} i
e. ∑_{i=0}^{n-1} n
f. ∑_{i=0}^{n-1} ∑_{j=0}^{n-1} 1
g. ∑_{i=0}^{n-1} ∑_{j=0}^{n-1} j
h. ∑_{i=0}^{n-1} ∑_{j=0}^{i} 1
i. 2 + 4 + 8 + 16 + ... + 1024
j. ∑_{i=0}^{n-1} (3i + 1)`,answer:`Answers:
a. 6
b. 8C
c. 2n - 4
d. n(n-1)/2
e. n^2
f. n^2
g. n^2(n-1)/2
h. n(n+1)/2
i. 2046 (using geometric series a(r^k - 1)/(r - 1) = 2(2^10 - 1)/1)
j. (3n^2 - n)/2`,explanation:[{step:1,text:`Sum of constant C from i=a to b is C * (b - a + 1).`},{step:2,text:`Sum of i from 0 to n-1 is n(n-1)/2.`},{step:3,text:`For double sum ∑∑j, factor out independent index i and evaluate inner sum first.`},{step:4,text:`For geometric sum 2^1 + ... + 2^10, apply standard formula a(r^k - 1)/(r-1).`}],hasVisualization:!0,algorithm:`analysisWorkspace`},{number:4,question:`Solve the following logarithmic functions:
a. log_a 1
b. log_y y
c. log_2 2^{10}
d. log_x x^2
e. log_x (x / y)`,answer:`Answers:
a. 0
b. 1
c. 10
d. 2
e. 1 - log_x y`,explanation:[{step:1,text:`Apply logarithm properties: log_b 1 = 0, and log_b b = 1.`},{step:2,text:`Apply power rule: log_b b^k = k.`},{step:3,text:`Apply quotient rule: log_b (x/y) = log_b x - log_b y.`}],hasVisualization:!0,algorithm:`analysisWorkspace`},{number:5,question:`Given the following data structures, find the output elements:
a. Stack: What are the final elements after: push(a), push(b), push(c), pop(), pop(), push(d)?
b. Queue: What are the final elements after: enqueue(a), enqueue(b), enqueue(c), dequeue(), dequeue()?`,answer:`a. Stack elements from bottom to top: [a, d]. (b, c are popped)
b. Queue elements: [c]. (a, b are dequeued)`,explanation:[{step:1,text:`Stack is LIFO (Last In First Out). push(a)->[a], push(b)->[a,b], push(c)->[a,b,c], pop()->[a,b], pop()->[a], push(d)->[a,d].`},{step:2,text:`Queue is FIFO (First In First Out). enqueue(a)->[a], enqueue(b)->[a,b], enqueue(c)->[a,b,c], dequeue()->[b,c], dequeue()->[c].`}],hasVisualization:!0,algorithm:`josephus`}],a={id:e,lectureId:t,week:1,title:r,problems:i};export{a as default,e as id,t as lectureId,i as problems,r as title,n as week};