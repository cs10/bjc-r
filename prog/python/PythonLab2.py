"""
Welcome to Besides Blocks 2: Data Structures in Python.

In this lab you will explore how to manipulate Python data structures 
in a way that allows you to efficiently process data.  Many of the excercises
are challenging and you will most likely need to spend some time thinking about 
how to appoach each problem (particularly the challenge problems).  This is 
not because we are mean, we just want you to learn a lot! So definitely try to 
have fun with this.  Weclome to data structures.

Creators: Max Doughtery and Andrew Schmitt (UC Berkeley CS10 TAs, Fall 2014)

"""

##############
# Exercise 1 #
##############
"""
Place the first odd number at the back of the input list. 
Do not return a new list.

>>> input = [10, 2, 4, 7, 6, 7, 8, 9]
>>> push_odd_back(input)
>>> input
[10, 2, 4, 6, 7, 8, 9, 7]

"""

def push_odd_back(lst):
	return lst


##############
# Exercise 2 #
##############
"""
Takes a list of lists and returns all the items of each list 
concatenated together into one new list (turns a 2D list into a 1D list).

>>> flatten([["a", "b"], ["c", "d", "e"], ["f"]])
["a", "b", "c", "d", "e", "f"]

"""

def flatten(lst):
	return lst

###########################
# Exercise 3 Part 1 (3.1) #
###########################
"""
Takes as input a string representing a DNA sequence, a base to be substituted, 
and a base that is to take the place of the base being substituted.  Returns
a string with the proper base substituted.

>>> substitute_base("AAGTTAGTCA", "A", "C") # substitute "A" with "C"
"CCGTTCGTCG"

"""

def substitute_base(sequence, old, new):
	return sequence


###########################
# Exercise 3 Part 2 (3.2) #
###########################
"""
Takes as input a list of strings representing DNA sequences, a base 
to be substituted (old), and a base that is to take the place of the base 
being substituted (new).  This function should return a list of DNA sequences 
with the proper base substituted in each sequence (make sure to use HOFs here).

>>> sequences = ["AAGTTAGTCA", "CTCGAGTCCGAAAGC", "AAGTTCCGACTG"]
>>> substitue_sequences(sequences, "A", "C")
["CCGTTCGTCC", "CTCGCGTCCGCCCGC", CCGTTCCGCTG"]

"""

def substitue_sequences(sequences, old, new):
	return sequences


##############
# Exercise 4 #
##############
"""
Takes in a list of numbers OR strings and returns the combined result 
(hint: think about what the + operator does for strings and for numbers).

>>> nums = [1, 2, 3, 4, 5]
>>> strings = ["hello ", "my ", "name ", "is ", "someone?"]
>>> combine(nums)
15
>>> combine(strings)
"hello my name is someone?"

"""

def combine(lst):
	return lst


##############
# Exercise 5 #
##############
"""
Given a DNA sequence string, calculate the frequency of each 
base pair (i.e. the number of times that each letter appears in the sequence).

>>> base_freq("AAGTTAGTCA")
{"A": 4, "C": 1, "G": 2, "T": 3}

"""

def base_freq(sequence):
	return sequence


##############
# Exercise 6 #
##############
"""
Given a dictionary of people (band), like the one below, returns a 
new dictionary that contains only the people who play a certain instrument.

>>> alonzo = {"age": 10, "height": 42, "weight": 175, "instrument ": "fiddle" }
>>> turing = {"age": 41, "height": 70 "weight": 160, "instrument": "theremin"}
>>> bertha = {"age": 32, "height": 97, "weight": 587, "instrument": "cello"}
>>> tinkerB = {"age":100, "height": 4, "weight": 0.5, "instrument": "cello"}
>>> banditos = {"Alonzo": Alonzo, "Turing": Turing, "Bertha": Bertha, "TinkerB": TinkerB}
>>> find_players(banditos, "cello")
{"Bertha": Bertha, "TinkerB": TinkerB}

"""

def find_players(band, insturment):
	return band


######################################
# Challenge Exercises (for the bold) #
######################################

###############
# Challenge 1 #
###############
"""
Recursively merge two sorted lists into one sorted list

>>> merge([2, 4, 6, 7], [1, 3, 5])
[1, 2, 3, 4, 5, 6, 7]

"""

def merge(A, B):
	return A + B


###############
# Challenge 2 #
###############
"""
Find the most frequent sub-sequence of base pairs of a given length.
>>> most_freq_seq("AAGTTAGTCA", 3)
"AGT"

"""

def most_freq_seq(sequence, length):
	return sequence


###############
# Challenge 3 #
###############
"""
Given a dictionary of each student and a corresponding dictionary 
of their preferences, returns a student with the lowest average score.

>>> alice_ratings = {"alonzo": 1, "bob": 3, "turing" : 2}
>>> bob_ratings = {"alice": 1, "alonzo": 2, "turing": 3}
>>> alonzo_ratings = {"alice": 3, "bob": 2, "turing": 1}
>>> turing_ratings = {"alice": 2, "alonzo": 1 "bob": 3}
>>> friends = {"alice": alice_ratings, "bob": bob_ratings, "alonzo": alonzo_ratings, "turing": turing_ratings}
>>> most_popular(friends)
"alonzo"

"""

def most_popular(friends):
	return friends





######################################################
## DO NOT TOUCH, ONLY LOOK (a wise person one said) ##
######################################################

# This handles arguments that you enter at the command line and runs the tests
# for each exercise

import sys


def main(argv):

    functionDict =  {"1": test_EX1, "2": test_EX2, "3.1": test_EX31, "3.2": test_EX32, "4": test_EX4, "5": test_EX5, "6": test_EX6, "C1": test_C1, "C2": test_C2, "C3": test_C3, "All": "All"}

    arguments = argv[1:]
    numArgs = len(arguments)

    if numArgs == 0:
        print("No exercise specified")
        return
    else:
        try:
            function = functionDict[arguments[0]]
        except (KeyError):
            print ("It looks like the exercise you entered:" + arguments[0] + " does not exist. \nTry running the file again with a different function name.")
            sys.exit(1)
        if (function != "All"):
            function()

        # Runs All Tests #
        else:
            print("\nRunning tests on regular exercises...\n")
            test_set = set()
            test_set.add(test_EX1())
            test_set.add(test_EX2())
            test_set.add(test_EX31())
            test_set.add(test_EX32())
            test_set.add(test_EX4())
            test_set.add(test_EX5())
            test_set.add(test_EX6())
            if (0 in test_set):
                print("**** One or more of your exercises did not pass our tests :( ****\n")
            else:
            	print("**** All of your exercises passed our tests!!! ****\n")
            test_set = set()
            test_set.add(test_C1())
            test_set.add(test_C2())
            test_set.add(test_C3())
            if (0 in test_set):
                print("**** One or more of your challenge exercises did not pass our tests :( ****\n")
            else:
                print("**** All of your challenge exercises passed our tests!!! ****\n")

##################
# Test Functions #
##################

# Test exercise 1 #
def test_EX1():
    for tple in [[[10, 2, 4, 7, 6, 7, 8, 9], [10, 2, 4, 6, 7, 8, 9, 7]], [[5, 4, 3, 2, 1], [4, 3, 2, 1, 5]], [[1, 2, 3], [2, 3, 1]]]:
        test = list(tple[0])
        push_odd_back(test)
        if (test != tple[1]):
            return function_fail_output("push_odd_back", tple[0], test)
    return function_pass_output("push_odd_back")

# Test exercise 2 #
def test_EX2():
    for tple in [[[["a", "b"], ["c", "d", "e"], ["f"]], ["a", "b", "c", "d", "e", "f"]] , [[["a", "b"], [], ["g", " h"], ["c", "d", "e"], ["f"]], ["a", "b", "g", " h", "c", "d", "e", "f"]]]:
        test = flatten(tple[0])
        if (test != tple[1]):
            return function_fail_output("flatten", tple[0], test)
    return function_pass_output("flatten")

# Test exercise 3.1 #
def test_EX31():
    for quad in [("AAGTTAGTCA", "A", "C", "CCGTTCGTCC") , ("CTCGAGTCCGAAAGC", "C", "G", "GTGGAGTGGGAAAGG") , ("AAGTTCCGACTG", "T", "U", "AAGUUCCGACUG")]:
        test = substitute_base(quad[0], quad[1], quad[2])
        if (test != quad[3]):
            return function_fail_output("substitute_base", "substitute_base('" + quad[0] + "', " + quad[1] + ", " + quad[2] + ")", test)
    return function_pass_output("substitute_base")

# Test exercise 3.2 #
def test_EX32():
    sequences = ["AAGTTAGTCA", "CTCGAGTCCGAAAGC", "AAGTTCCGACTG"]
    test = substitue_sequences(sequences, "A", "C")
    if (test != ["CCGTTCGTCC", "CTCGCGTCCGCCCGC", "CCGTTCCGCCTG"]):
        return function_fail_output("substitute_sequences", "substitute_sequences(['AAGTTAGTCA', 'CTCGAGTCCGAAAGC', 'AAGTTCCGACTG'], 'A', 'C')", test)
    else:
        return function_pass_output("substitute_sequences")

# Test exercise 4 #
def test_EX4():
    nums = [1, 2, 3, 4, 5]
    strings = ["hello ", "my ", "name ", "is ", "someone?"]
    test1 = combine(nums)
    test2 = combine(strings)

    if (test1 != 15):
        return function_fail_output("combine", nums, test1)
    elif (test2 != "hello my name is someone?"):
        function_fail_output("combine", strings, test2)
    else:
        return function_pass_output("combine")

# Test exercise 5 #
def test_EX5():
    for tple in [["AAGTTAGTCA", {"A": 4, "C": 1, "G": 2, "T": 3}], ["CTCGAGTCCGAAAGC", {"A": 4, "C": 5, "G": 4, "T": 2}]]:
        test = base_freq(tple[0])
        if (test != tple[1]):
            return function_fail_output("base_freq", tple[0], test)
    return function_pass_output("base_freq")

# Test exercise 6 #
def test_EX6():
    alonzo = {"age": 10, "height": 42, "weight": 175, "instrument": "fiddle" }
    turing = {"age": 41, "height": 70, "weight": 160, "instrument": "theremin"}
    bertha = {"age": 32, "height": 97, "weight": 587, "instrument": "cello"}
    tinkerB = {"age":100, "height": 4, "weight": 0.5, "instrument": "cello"}
    banditos = {"Alonzo": alonzo, "Turing": turing, "Bertha": bertha, "TinkerB": tinkerB}
    test1 = find_players(banditos, "cello")
    test2 = find_players(banditos, "theremin")
    if (test1 != {"Bertha": {"age": 32, "height": 97, "weight": 587, "instrument": "cello"}, "TinkerB": {"age":100, "height": 4, "weight": 0.5, "instrument": "cello"}}):
        return function_fail_output("find_players", "find_players(banditos, 'cello')", test1)
    elif (test2 != {"Turing": {"age": 41, "height": 70, "weight": 160, "instrument": "theremin"}}):
        return function_fail_output("find_players", "find_players(banditos, 'theremin')", test2)
    else:
        return function_pass_output("find_players")

# Test Challenge 1 #
def test_C1():
    for triple in [[[2, 4, 6, 7], [1, 3, 5], [1, 2, 3, 4, 5, 6, 7]], [[1, 2, 3, 4], [1, 2, 3, 4], [1, 1, 2, 2, 3, 3, 4, 4]]]:
        test = merge(triple[0], triple[1])
        if (test != triple[2]):
            return function_fail_output("merge", "merge("+str(triple[0])+", "+str(triple[1])+")", test)
    return function_pass_output("merge")

# Test Challenge 2 #
def test_C2():
    for triple in [("AAGTTAGTCA", 3, "AGT") , ("AAGTAGTAGCAGCGAGTG", 2, "AG")]:
        test = most_freq_seq(triple[0], triple[1])
        if (test != triple[2]):
            return function_fail_output("most_freq_seq", "most_freq_seq("+str(triple[0])+", "+str(triple[1])+")", test)
    return function_pass_output("most_freq_seq")

# Test Challenge 3 #
def test_C3():
    alice_ratings = {"alonzo": 1, "bob": 3, "turing" : 2}
    bob_ratings = {"alice": 1, "alonzo": 2, "turing": 3}
    alonzo_ratings = {"alice": 3, "bob": 2, "turing": 1}
    turing_ratings = {"alice": 2, "alonzo": 1, "bob": 3}
    friends = {"alice": alice_ratings, "bob": bob_ratings, "alonzo": alonzo_ratings, "turing": turing_ratings}
    test = most_popular(friends)
    if (test != "alonzo"):
        return function_fail_output("most_popular", "most_popular(friends", test)
    return function_pass_output("most_popular")



def function_fail_output(func_name, test_case, return_val):
    print("Your " + str(func_name) + " function failed on the test case: " + str(test_case) + "\nIt returned " + str(return_val)+"\n")
    return 0

def function_pass_output(func_name):
    print("Your " + str(func_name) + " function passed all our tests!!!\n")
    return 1      
            
if __name__ == "__main__":
    main(sys.argv)