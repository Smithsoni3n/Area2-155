# Slicing and looping thru Lists

# Slicing
shopping_list = ["milk", "eggs", "bread", "butter", "cheese", "yogurt"]
#print(shopping_list[1:3]) # returns ['eggs', 'bread']
#print(shopping_list[2:5]) # returns ['bread', 'butter', 'cheese']

# Looping


# For ... in loop
#for element in shopping_list: # : makes the loop body
    #print(element)


# Using range() when you need indices
#for i in range(len(shopping_list)):
    #print(f"Index: {i}, Element: {shopping_list[i]}") #{} these are used to format the string and insert the values of i and shopping_list[i] into the string.
    #print(i, shopping_list[i]) # this is another way to print the index and element without using f-strings.

names = ["Alice", "Bob", "Charlie", "David"]
for name in names:
    print(name)
    print("Greetings,", name, "!", sep="") # sep="" is used to remove the space between the strings and variables in the print statement.
#for i in range(len(names)):
    #print(f"Index: {i}, Name: {names[i]}")