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
for i in range(5):   # Outer loop (0,1,2,3,4)
    for j in range(5):  # Inner loop (0,1,2,3,4)
       print(str(j + 1) + " ", end='')
    print("")
'''