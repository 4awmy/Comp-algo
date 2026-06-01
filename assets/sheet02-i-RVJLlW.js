var e=`sheet02`,t=`lec02`,n=2,r=`Analysis Fundamentals`,i=[{question:`ALGORITHM Mystery(n)
//Input: A nonnegative integer n
S ← 0
for i ← 1 to n do
S ← S + i * i
return S`,answer:``,number:1,explanation:[{step:1,text:`Identify the basic operation of the algorithm (e.g. comparisons, assignments).`},{step:2,text:`Set up a summation representing the execution count of the basic operation based on input size n.`},{step:3,text:`Solve the summation using standard arithmetic or geometric series formulas.`},{step:4,text:`Determine the asymptotic growth class (O, Θ, Ω) using limits or definitions.`}],hasVisualization:!1},{question:`ALGORITHM Secret(A[0..n-1])
//Input: An array A[0..n-1] of n real numbers
minval ← A[0]; maxval ← A[0]
for i ← 1 to n - 1 do
  if A[i] < minval
    minval ← A[i]
  if A[i] > maxval
    maxval ← A[i]
return maxval - minval`,answer:``,number:2,explanation:[{step:1,text:`Identify the basic operation of the algorithm (e.g. comparisons, assignments).`},{step:2,text:`Set up a summation representing the execution count of the basic operation based on input size n.`},{step:3,text:`Solve the summation using standard arithmetic or geometric series formulas.`},{step:4,text:`Determine the asymptotic growth class (O, Θ, Ω) using limits or definitions.`}],hasVisualization:!1},{question:`ALGORITHM Enigma(A[0..n − 1, 0..n − 1])
//Input: A matrix A[0..n − 1, 0..n − 1] of real numbers
for i ← 0 to n − 2 do
for j ← i + 1 to n − 1 do
if A[i, j] ≠ A[j, i]
return false
return true`,answer:``,number:3,explanation:[{step:1,text:`Identify the basic operation of the algorithm (e.g. comparisons, assignments).`},{step:2,text:`Set up a summation representing the execution count of the basic operation based on input size n.`},{step:3,text:`Solve the summation using standard arithmetic or geometric series formulas.`},{step:4,text:`Determine the asymptotic growth class (O, Θ, Ω) using limits or definitions.`}],hasVisualization:!1}],a={id:e,lectureId:t,week:2,title:r,problems:i};export{a as default,e as id,t as lectureId,i as problems,r as title,n as week};