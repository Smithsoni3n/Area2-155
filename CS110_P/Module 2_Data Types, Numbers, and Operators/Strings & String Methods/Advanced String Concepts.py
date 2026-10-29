"""
# Advanced String Concepts

# Srings Are Objects
text = "hello world"
#print(text.upper()) # HELLO WORLD
#print(text.lower()) # hello world
print(text.capitalize()) # Hello world

# Immutability Stings Cannot Change in Place
#text[0] = "y" # Does not work because strings are immutable
new_text = "y" + text[1:]
print(new_text)

# Comparison with Mutable Sequences
my_list = [1,2,3] # Lists are mutable, meaning they can be changed in place
my_list[0] = "a"
print(my_list)

# .replace(), .split(), and .join()
pharse = "banana"
new_phrase = pharse.replace("na", "NA")
print(new_phrase) # How to replace a substring in a string with another substring
phrase2 = "Hello this is Crystal"
new_phrase2 = phrase2.split(" ") # How to split a string into a list of substrings based on a delimiter
print(new_phrase2) 
new_phrase3 = "|".join(new_phrase2) # How to join a list of strings into a single string with a delimiter
print(new_phrase3)


# print() end & sep keyword args
# 
print(text, new_phrase, new_phrase2) # Keep in mind that the default separator is a space and the default end is a new line
print(text, new_phrase, new_phrase2, sep="|") # How to change the separator between arguments in the print() function
print(text, new_phrase, new_phrase2, end="---\n") # How to change the end character of the print() function
"""