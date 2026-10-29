total = 0
while True:
    num = int(input("Enter a positive integer: "))
    if num <= 0:
        break
    total += num
print("Sum:", total)