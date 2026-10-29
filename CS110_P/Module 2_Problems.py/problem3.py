#Create a program problem3.py that converts 24-hour time to 12-hour time (excluding am/pm). Examples include:

#0000 → 12:00
#0130 → 01:30
#1200 → 12:00
#2359 → 11:59
#To convert hours accurately use the following formula:

#Example input & output would look like:


#Enter time in 24-hour format (HHMM): 0000
#In 12-hour time that is 12:00



time_str = input("Enter time in 24-hour format (HHMM): ")
hour24 = int(time_str[:2])
minutes = time_str[2:4]

hour12 = (hour24 - 1) % 12 + 1

print(f"In 12-hour time that is {hour12:02d}:{minutes}")
