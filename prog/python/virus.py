"""
This is a comment in python.  We can make comments span multiple lines
by enclosing our text in triple quotes.

We will also make comments in the code by doing the following:
"""

# Hello this is a comment made with the '#', but I only work for a single line.

"""
IMPORTANT STUFF:

In this file is basic 'skeleton code' for many of the exercises that you will be
asked to complete in this lab.  Try to put you answers in the correct section 
that we have designated by reading the comments.  Things should be in order so just
scroll down the page as you go through the lab exercises.  At the bottom of the 
page you'll find code that you should not edit.  Feel free to take a look at it 
and see if you can figure out what it's doing.  Good Luck and don't worry this
file isn't actually a computer virus...but then again how much do yo trust us?

"""

your_name = ""


#########################################
# Exercise 1: debugging first_even_nums #
#########################################

def first_even_nums(x):
    for num in range(1, x):
        print (2 * num)
        
########################
# Exercise 2: exponent #
########################

"""
should return the value of num raised to power. Examples 
shown below:
>>>exponent(10, 0)
1
>>>exponent(5, 3)
125
>>>exponent(2, 10)
1024
>>>exponent(9, 2)
81
"""
def exponent(num, power):
    # write your code below this comment.
    # make sure to change the return statement.
    return 0

##############    
# Exercise 3 #
##############

"""
Modify the function reverse_string that takes in a string and returns
the string in reversed order.

>>>> reverse_string('Alonzo') 
'oznolA'

>>> reverse_string('abcdefghijklmnopqrstuvwxyz')
'zyxwvutsrqponmlkjihgfedcba'

>>> reverse_string('hello world')
'dlrow olleh'
"""

def reverse_string(string):
    # write your code below this comment.
    # make sure to change the return statement.
    return string
    
##########################
# Exercise 4: palindrome #
##########################

"""
Modify the function palindrome that takes in a string and returns
True if the string is a palindrome and False otherwise.

>>> palindrome("racecar") 
True 
>>> palindrome("google")
False 
>>> palindrome("poop")
True
>>> palindrome("alonzo")
False
"""

def palindrome(string):
    # write your code below this comment.
    # make sure to change the return statement.
    return False




######################################################
## DO NOT TOUCH, ONLY LOOK (a wise person one said) ##
######################################################

# This handles arguments that you enter at the command line and runs the tests
# for each exercise

import sys
import time

functionList =  ["first_even_nums", "exponent", "reverse_string", "palindrome", "run_tests"]

def main(argv):

    arguments = argv[1:]
    numArgs = len(arguments)
    if numArgs == 0:
        print('Installing Virus:')
        for i in range(101):
            sys.stdout.write("\r [")
            for j in range(int(i/10)):
                sys.stdout.write("#")
            for j in range(10-int(i/10)-1):
                sys.stdout.write(" ")
            sys.stdout.write("] ")

            sys.stdout.write("" + str(i) + "%")
            sys.stdout.flush()
            time.sleep(0.1)
        sys.stdout.write("\n")
        print("Activating Camera...\n\n")
        print("Hello " + your_name)
    elif (numArgs > 2):
        print ("It appears that you've inputted too many arguments.  \nTry python3 virus.py function_name <argument> (the <> means it's optinoal)")
        sys.exit(1)
    else:
        case = -1
        value = -1
        try:
            case = functionList.index(arguments[0])
        except (ValueError):
            print ("It looks like the function name you entered:" + arguments[0] + " is incorrect. \nTry running the file again with a different function name.")
            sys.exit(1)

        # Exercise 1 #
        if (case == 0):
            if (numArgs == 2):
                try:
                    arg = int(arguments[1])
                except (ValueError):
                    print ("It looks like the second argument you entered isn't a number.  \nTry running the file again.")
                    sys.exit(1)
                first_even_nums(arg)
            else:
                print("Please enter a number after the function name such as:\npython3 virus.py first_even_nums 5")
                sys.exit(1)

        # Exercise 2 #
        elif (case == 1):
            for triple in [(10, 0, 1), (5, 3, 125), (2, 10, 1024), (9, 2, 81)]:
                if (exponent(triple[0], triple[1]) != triple[2]):
                    print ("Your exponent function failed on the test case: \n" + "exponent(" + str(triple[0]) + ", " + str(triple[1]) + ")\n")
                    sys.exit(1)
            print ("Your exponent function passed all of our test cases!!!")
            sys.exit(0)
            
        # Exercise 3 #
        elif (case == 2):
            for tple in [("Alonzo", "oznolA"), ("abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"), ("hello world", "dlrow olleh")]:
                value = reverse_string(tple[0])
                if (value != tple[1]):
                    print ("Your reverse_string function failed on the test case: " + tple[0] + "\nIt returned the string: " + str(value))
                    sys.exit(1)
            print ("Your reverse_string function passed all  of our test!!!")
            sys.exit(0)
            
        # Exercise 4 #
        elif (case == 3):
            for tple in [("racecar", True), ("google", False), ("poop", True), ("alonzo", False)]:
                value = palindrome(tple[0])
                if (value != tple[1]):
                    print ("Your palindrome function failed on the test case: " + tple[0] + "\nIt returned the boolean: " + str(value))
                    sys.exit(1)
            print ("Your palindrome function passed all  of our test!!! \nCongrats you've finished your first lab in Python!!!")
            sys.exit(0)

        # Runs All Tests #
        elif (case == 4):

            # Exercise 2 #
            for triple in [(10, 0, 1), (5, 3, 125), (2, 10, 1024), (9, 2, 81)]:
                    if (exponent(triple[0], triple[1]) != triple[2]):
                        print ("Your exponent function failed on the test case: \n" + "exponent(" + str(triple[0]) + ", " + str(triple[1]) + ")\n")
                        sys.exit(1)
            print ("Your exponent function passed all of our test cases!!!")
            
            # Exercsie 3 #
            for tple in [("Alonzo", "oznolA"), ("abcdefghijklmnopqrstuvwxyz", "zyxwvutsrqponmlkjihgfedcba"), ("hello world", "dlrow olleh")]:
                    value = reverse_string(tple[0])
                    if (value != tple[1]):
                        print ("Your reverse_string function failed on the test case: " + tple[0] + "\nIt returned the string: " + str(value))
                        sys.exit(1)
            print ("Your reverse_string function passed all  of our test!!!")
            
            # Exercise 4 #    
            for tple in [("racecar", True), ("google", False), ("poop", True), ("alonzo", False)]:
                    value = palindrome(tple[0])
                    if (value != tple[1]):
                        print ("Your palindrome function failed on the test case: " + tple[0] + "\nIt returned the boolean: " + str(value))
                        sys.exit(1)
            print ("Your palindrome function passed all  of our test!!! \nCongrats you've finished your first lab in Python!!!")
            print ("\nCongrats You've passed all our Tests!!!\nPlease show this to your TA to get checked off for this lab.")
             

        
            
if __name__ == "__main__":
    main(sys.argv)
