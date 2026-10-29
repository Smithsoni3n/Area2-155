# Advanced List Operation
numbers = [1, 2, 3, 4, 5, 7, 3, 6, 8]
edibles = ["apple", "banana", "cherry", "date", "fig", "grape", "honeydew", "kiwi", "lemon", "mango"]

# .sort() - changes list in place.
#numbers.sort() # ascending order
#numbers.sort(reverse=True) # desending order
#print(numbers)

#edibles.sort()
#print(edibles)

# .sorted() - leaves the original list unchanged and returns a new sorted list.
#sorted_numbers = sorted(numbers)
#print(numbers)
#print(sorted_numbers)

# .reverse() - changes list in place.
#numbers.reverse()
#print(numbers)
#edibles.reverse()
#print(edibles)

# .min(), .max(), .sum()
#print("Min: ", min(numbers))
#print("Max: ", max(numbers))
#print("Sum: ", sum(numbers))

# .index() - index searching 

banana_index = edibles.index("banana")
print("Index of banana: ", banana_index)