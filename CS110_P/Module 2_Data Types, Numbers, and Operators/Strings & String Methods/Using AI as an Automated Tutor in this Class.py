"""
# Create a program problem1.py that prompts for the side 
# lengths of a triangle and computes the 
# area using Heron's formula.

#Example input & output would look like:

#Enter side a: 3.0
#Enter side b: 4.0
#Enter side c: 5.0
#The area is 6.00

num3 = float(input("We're going to find the area of a Triangle, please use Heron's formula. Please enter the lengths of the three sides of the triangle. Enter side a: "))
num4 = float(input("Now the 2nd side lenth:  "))
num5 = float(input("And the 3rd side length: "))

s = (num3+num4+num5)
import math
area =math.sqrt(s*(s-num3)*(s-num4)*(s-num5))
print(s)
print(f"The area is {area:.2f}")
"""