#Create a program problem2.py that computes 
#different statistics given five numbers including the total, 
# average, minimum, maximum, range, and standard deviation.

import math 

n1 =float(input("Enter first number: "))
n2 =float(input("Enter second number: "))
n3 =float(input("Enter third number: "))
n4 =float(input("Enter fourth number: "))
n5 =float(input("Enter fifth number: "))


total = n1 + n2 + n3 + n4 + n5
average = total / 5
minimum = min(n1, n2, n3, n4, n5)
maximum = max(n1, n2, n3, n4, n5)
range_val = maximum - minimum

variance = (
    (n1 - average) **2
    + (n2 - average) **2
    + (n3 - average) **2    
    + (n4 - average) **2
    + (n5 - average) **2
) /5
standard_deviation = math.sqrt(variance)

print(f"Total:\t{total:.6f}")
print(f"Avg:\t{average:.6f}")
print(f"Min:\t{minimum:.6f}")
print(f"Max:\t{maximum:.6f}")
print(f"Range:\t{range_val:.6f}")
print(f"Sigma:\t{standard_deviation:.6f}")