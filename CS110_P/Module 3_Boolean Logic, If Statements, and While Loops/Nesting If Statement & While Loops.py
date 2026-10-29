'''

#Input validation
import math


# Prompt user for side lengths
a = float(input("Enter side a: "))
if (a < 0):
    print("Sorry, try again. Values must be positive.")
else:
    b = float(input("Enter side b: "))
    if (b < 0):
        print("Sorry, try again. Values must be positive.")
    else:
        c = float(input("Enter side c: "))
        if (c < 0):
            print("Sorry, try again. Values must be positive.")
        else:
            # Semi-perimeter
            s = (a + b + c) / 2

            # Area using Heron's formula
            area = math.sqrt(s * (s - a) * (s - b) * (s - c))


            print(f"The area is {area:.2f}")


# Keep prompting the user for input until some condidtion is satisfied
# Include input validation
sum = 0
print("Keep giving me numbers and I'll add then together until we reach 10.")
while sum < 10:
    num = int(input("Enter a number: "))

    if num <= 0:
        print("Invalid")
    else:
        sum += num
        if sum < 100:
            print(f"Sum so far: {sum}.")

print(f"\nALL your numbers add up to: {sum}")
'''''''''