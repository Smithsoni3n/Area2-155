# Input, Math, and Other Functions
"""
#Help

#help(print) #prints the help documentation for the print function

#Input (Always Output a String)
user_name = input("What is your name?") 
print("Hello,", user_name)
print(type(user_name)) #This will always be a string

#Math Library Functions
import math
num = int(input("what number do you want to square root?")) #This will always be a string
print(math.sqrt(num)) #Square Root

      
#Foramt 
price = 5.50
#print(f"The calculator costs", price)
#print(f"The calculator costs {price: .2f}") #f-string formatting
print(f"The calculator costs ${price:.3f}.") # f-string formatting with 3 decimal places
"""