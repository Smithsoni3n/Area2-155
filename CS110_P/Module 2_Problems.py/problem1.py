# Create a program problem1.py that prompts for the side lengths of a 
# triangle and computes the area using Heron's formula.
# Example input & output would look like:

#Enter side a: 3.0
#Enter side b: 4.0
#Enter side c: 5.0
#The area is 6.00
# Your video is what helped me here to figure out this problem. Thank you.
import math

a = float(input("Enter side a: "))
b = float(input("Enter side b: "))
c = float(input("Enter side c: "))

s = (a + b + c) / 2
area =math.sqrt(s* (s-a) * (s-b) * (s-c))

print(f"The area is {area:.2f}")
