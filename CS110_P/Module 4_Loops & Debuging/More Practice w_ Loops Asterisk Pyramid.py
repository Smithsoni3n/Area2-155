# Problem 3: Write a program that creates a pyrmaid of astreiks
# to the console. For each row in the pyrmaid, you use one to 
# print the required number of spaces and another loop to 
# print the required number of asterisks.
# Output should look like:




#       *    Row 1: 4 spaces, 1 asterisk
#      ***   Row 2: 3 spaces, 3 asterisks
#     *****  Row 3: 2 spaces, 5 asterisks
#    *******  Row 4: 1 space, 7 asterisks
#   *********  Row 5: 0 spaces, 9 asterisks


for i in range(10):  # Outer loop for rows (0 to 4)
    # Print spaces
    for j in range(10 - i):  # Inner loop for spaces
        print("_", end='')  # Print space without newline

    # Print asterisks
    for k in range(2 * i + 1):  # Inner loop for asterisks
        print("*", end='')  # Print asterisk without newline

    print()  # Move to the next line after each row
# Use different variables for the inner loops to avoid confusion and ensure clarity in the code.