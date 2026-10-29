"""
# Accessing & Slicing Strings & Comparison


# Indexing, including out of range errors
str = "Olympic College Rangers"
str[0]
print(str[2]) #index into the sring to get the 3rd character
#print(str[100])
length = len(str)
print(length)
print(str[23-1])

# Slicing & Stopping
str [0:7] #slice the string to get the first 6 characters
print(str[0:7])
print(str[:7])
print(str[:16])
print(str[16:]) # slice the string to get the last 7 characters 

# String Comparison
"olympic"=="olympic" # True #Boolean values are True or False
"olympic"=="Olympic" # False #Boolean values are True or False
print("olympic"=="olympic") # True
print("olympic"=="Olympic") # False
print("olympic">"Olympic") # True
print("olympic"<"Olympic") # False #sort things in alphabetical order, capital letters come before lowercase letters
# string commparison ( ** l* < > <= >*)
"""