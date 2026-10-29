numbers = [3, -1, 5, -2, 0, 8]
positive = 0
negative = 0

for num in numbers:
    if num > 0:
        positive += 1
    elif num < 0:
        negative += 1

print("Positive:", positive)
print("Negative:", negative)