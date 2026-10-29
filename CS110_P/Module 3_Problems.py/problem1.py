principal = float(input("Enter principal amount: "))
if principal < 0:
    print("Invalid principal")
else:
    rate = float(input("Enter interest rate: "))
    if rate < 0:
        print("Invalid interest rate")
    else:
        years = float(input("Enter number of years: "))
        if years < 0:
            print("Invalid number of years")
        else:
            accrued = principal * (1 + (rate / 100)) ** years
            print(f"\nA = ${accrued:.2f}")