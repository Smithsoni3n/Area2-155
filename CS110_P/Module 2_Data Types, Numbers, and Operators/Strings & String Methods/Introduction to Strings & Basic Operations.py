# Introduction to Strings

# Single vs. Double Quotes
my_str_single = 'Hello'
my_str_double = "World"
#print(my_str_single, my_str_double)

# len()
#print(len(my_str_single))

# Empty String
empty = " "
#print(len(empty))

# Missing Quotes & escape characters for backslash
#print("She said, Python is fun!")
sentence1 = "She said, 'Python is fun!'"
#print(sentence1) # This will cause an error due to the quotes inside the string
sentence2 = 'She said, "Python is fun!"'
sentence3 = "She said, \"Python is fun!\"" # This will work because we used escape characters for the quotes inside the string
print(sentence1)
print(sentence2) # This will work because we used double quotes for the string and single quotes inside
print(sentence3)
