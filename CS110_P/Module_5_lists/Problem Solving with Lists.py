# Problem 1
# You have a list of test scores.
# You want to calculate the average, identify the highest/lowest score,
# and see how many scores are above a certain threshold.
# without using any additional libraries.
scores = [80, 92, 78, 95, 88]
# Average (sum of all numbers / count of the numbers)
average = sum(scores) / len(scores)
print("Average: ", average)

# Highest & Lowest (max/min) 
#highest = max(scores)
#lowest = min(scores)
print("Max: ", max(scores))
print("Min: ", min(scores))



# Count # over the threshold of 90
# create a counter 
counter = 0
# loop through list of scores, if over 90 -> add to counter
for score in scores:
    if score > 90:
        counter += 1
print("# of Scores over 90: ", counter)

#threshold = 90
#count_above_threshold = len([score for score in scores if score > threshold])


# Problem 2
# You have a list of names with possible duplicates.
# Remove duplicates while maintatining the original order.
names = ["Alice", "Bob", "Charlie", "Alice", "Bob", "Crystal"]
# Hint: in keyword from strings works with lists too.
# 
print("Ali" in names) #value is in the list?
print("Ali" in "Alice") #substring is in larger string?


# Start an empty list to store unique names
unique_names = []

# Loop through the list of names. check to see if name is already in unique_names. If not, add it to unique_names.
# if not in, add to list. 
#for name in names:
    #if name in unique_names:
        #continue
    #else:
        #unique_names.append(name)

#print("Unique Names: ", unique_names)

for name in names:
    if name not in unique_names:
        unique_names.append(name)

print(unique_names)

