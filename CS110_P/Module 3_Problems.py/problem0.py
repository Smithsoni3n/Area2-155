age = int(input("Enter your age: "))
if age < 13:
    print("You can see a G-rated movie.")
elif age < 17:
   print("You can see a G-rated or PG-13-rated movie.")
else:
    print("You can see a G-rated, PG-13-rated, or R-rated movie.")