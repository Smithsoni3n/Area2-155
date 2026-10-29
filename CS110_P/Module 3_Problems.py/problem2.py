total = 0

while total < 100:
    coin = int(input("Enter coin value (in cents): "))
    if coin < 0:
        print("Invalid")
    else:
        total += coin
        if total < 100:
            print(f"Total so far: {total}")

print(f"You have entered {total} cents in total.")