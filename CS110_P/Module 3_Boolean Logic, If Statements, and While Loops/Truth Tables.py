# Truth Tables
# Problem of the day: (A or B) and (not A or not B)
# 1. List varibles
# A,B 

# 2. Determine the number of Rows 
# 2 possibilites for A
# 2 possibilites for B
# 2^2 = 4 rows of A&B

# #3. Create Table Columns
# A B   (A AND B)   NOT(A AND B)    (A OR B)    AND NOT(A AND B)


# 4. Enumerate All Possible (A, B) Combinations
# A, B, (A or B), (not A or not B), ((A or B) and (not A or not B))
# T T
# T F
# F T
#F F

# 5. Fill Each Row with Sub-Expression Results
# A B   (A AND B)   NOT(A AND B)    (A OR B)    (A OR B) AND NOT(A AND B)
# T T   T         F             T         F       F
# T F   F         T             T         F       T
# F T   F         T             T         F       T
# F F    F         T             F         T       F