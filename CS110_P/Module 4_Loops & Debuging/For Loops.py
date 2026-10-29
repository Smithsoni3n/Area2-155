# For Loops
'''
string = "Hello"
for char in string:
    # Do something with item
    #
    #
    print(char,"!")
print("Exited for loop")


#range(stop) range(5) -> 0,1,2,3,4
#range(start, stop) -> range(2,6) -> 2,3,4,5
#range(start, stop, step) -> range(2,10,2) -> 2,4,6,8
 #                         -> range(3,10,3) -> 3,6,9

#for i in range(0,5):
    #print(i)
#print("End of loop")

# range(0,101,2)
for i in range(0,101,2):
    print(i)
print("End of loop")




# Try to loop through the string "Programming" and print every 3rd letter

string = "Programming"
for i in range(0, len(string), 3):
    print(string[i])
print("End of loop")

'''