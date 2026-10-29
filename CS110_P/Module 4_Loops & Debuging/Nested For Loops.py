
#Break vs. Continue

# Break exits the loop (breaks you out!)
#for i in range(10): #0.... 9
    #if i == 5:
        #break
    #print("i=", i)
#print("Outside of the for loop")
# Continue: skips the current iteration of  loop (continues to next iteration)
#for i in range(10): #0.... 9
    #if i == 5:
        #continue
    #print("i=", i)
#print("Outside of the for loop")


'''

# Nested Loops


for i in range(3):   # Outer loop (0,1,2)
    for j in range(2):  # Inner loop (0,1)
        print(f"i={i}, j={j}") # f-strings allow you to embed expressions inside string literals, using curly braces {}.


for i in range(3):   
    for j in range(2):  
        print(f"({i},{j})")  # To look more like coordinates, you can format the output as follows:
    print("Exiting inner loop")
print("Exiting outer loop")


# 1 2 3 4 5
# 1 2 3 4 5
# 1 2 3 4 5
# 1 2 3 4 5
# 1 2 3 4 5

for i in range(5):   # Outer loop (0,1,2,3,4)
    for j in range(5):  # Inner loop (0,1,2,3,4)
       print(str(j + 1) + " ", end='')
    print("")  # Print a newline after the inner loop completes
    print(f"({i},{j})")
          # Print j with a space and stay on the same line
    #print("\n")  # Print a newline after the inner loop completes
    print("Exiting inner loop")
print("Exiting outer loop")
'''

