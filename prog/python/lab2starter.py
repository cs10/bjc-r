# Exercise 1
def push_first_odd_back(lst):
    """
    Modify the input list by pushing the first odd number to the back.

    Parameters:
    - lst (list): The input list to be modified.

    Returns:
    None

    `test_cases` is a list of lists. lst[0] is the input. 
    lst[1] is the expected result of the mutated input

    Examples:
    >>> test_cases = [
    ...     ([], []),     #empty list should not error
    ...     ([2, 4, 6, 8], [2, 4, 6, 8]),     #Don't push anything back, every element is even
    ...     ([6, -3, 100, -4], [6, 100, -4, -3]),     #push the -3 back
    ...     ([x**2 for x in range(0, 9)] + [9], [0, 4, 9, 16, 25, 36, 49, 64, 9, 1]),     #push the 1 back
    ...     ([2, 4, 1], [2, 4, 1])    #push the 1 back
    ... ]

    >>> for lst, expected_output in test_cases:
    ...     push_first_odd_back(lst)
    ...     assert lst == expected_output, f"Expected: {expected_output}, Actual: {lst}"

    """
    pass #FIXME

# Exercise 2
def flatten(lst):
    """
    Flatten a 2D list to a single-dimensional list.

    Parameters:
    - lst (list): A 2D list containing elements of various types.

    Returns:
    - list: A single-dimensional list with all elements from the 2D list.
    >>> flatten([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>> board2048 = [
    ...     [2, 4, 8, 16],
    ...     [4, 2, 16, 8],
    ...     [8, 16, 4, 2],
    ...     [16, 8, 2, 4]
    ... ]
    >>> flatten(board2048)
    [2, 4, 8, 16, 4, 2, 16, 8, 8, 16, 4, 2, 16, 8, 2, 4]
    >>> nested_lst = [[x * y for x in range(1, 8, 2)] for y in range(1, 8, 2)]
    >>> result = flatten(nested_lst)
    >>> result
    [1, 3, 5, 7, 3, 9, 15, 21, 5, 15, 25, 35, 7, 21, 35, 49]
    >>> names = [['Alice', 'Bob', 'Charlie'], ['Dave', 'Eve'], ['Frank']]
    >>> flatten(names) == ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank']
    True
    """
    pass #FIXME


## OPTIONAL EXERCISE ##
def flatten_ND(lst):
    """
    Flatten a nested list to a single-dimensional list.

    Parameters:
    - lst (list): A nested list containing elements of various types.

    Returns:
    - list: A single-dimensional list with all elements from the nested list.
    Examples:
    >>> numbers = [[1, [2, [3, 4, [5]]], [6, 7], [8, 9], 10]]
    >>> flatten_ND(numbers) == list(range(1, 11))
    True
    >>> storage = ['root', ['Documents', ['file1.txt', 'file2.txt']],
    ... ['Pictures', ['photo1.jpg', 'photo2.jpg']],
    ... 'README.txt'
    ... ]
    >>> flatten_ND(storage)
    ['root', 'Documents', 'file1.txt', 'file2.txt', 'Pictures', 'photo1.jpg', 'photo2.jpg', 'README.txt']
    >>> family_tree = ['John', ['Mary', ['Anna', 'David']],
    ... ['Paul', ['Emily', 'Daniel', 'Sarah']],
    ... ['Kate', ['Sophia']]
    ... ]
    >>> result = flatten_ND(family_tree)
    >>> result 
    ['John', 'Mary', 'Anna', 'David', 'Paul', 'Emily', 'Daniel', 'Sarah', 'Kate', 'Sophia']
    """
    pass #FIXME


# Exercise 3.1
def squares_of_evens(lst):
    """
    Square the numbers in `lst`

    Parameters:
    - lst (list): A single-dimensional list of numbers

    Returns:
    - list: A list where all the even numbers are squared. Filters out the odd numbers.
    
    `test_cases` is a list of lists. lst[0] is the input. 
    lst[1] is the expected result of the mutated input

    Examples:
    >>> test_cases = [
    ...     ([-5, -2, 0, 1, 3, 4, 8], [4, 0, 16, 64]),
    ...     (list(range(-5, 10, 3)), [4, 16]),
    ...     (sorted([-3.5, -4, 0, -5, 10, 11]), [16, 0, 100]),
    ...     ([i for i in range(-1, 10, 3)], [4, 64])
    ... ]
    >>> for input_lst, expected_output in test_cases:
    ...     actual = squares_of_evens(input_lst)
    ...     assert actual == expected_output, f"Input: {input_lst} | Expected: {expected_output} | Actual: {actual}"
    """
    pass #FIXME


# Exercise 3.2
def nth_power_of_evens(lst, n):
    """
    Generate a list of even numbers raised to the nth power from the input list.

    Parameters:
    - lst (list): A single-dimensional list of numbers.
    - n (int): The power to which even numbers should be raised.

    Returns:
    - list: A list of even numbers from the input list raised to the nth power.

    Examples:
    >>> nth_power_of_evens([-5, -2, 0, 1, 3, 4, 8], 3)
    [-8, 0, 64, 512]
    >>> board = [[2, 4], [32, 64]]
    >>> nth_power_of_evens(flatten(board), 2)
    [4, 16, 1024, 4096]
    >>> result = nth_power_of_evens([i for i in range(-10, 10)], 3)
    >>> result
    [-1000, -512, -216, -64, -8, 0, 8, 64, 216, 512]
    """
    pass #FIXME


# Exercise 4
def substitute_base(string, old, new):
    """
    Replace the occurrences of 'old' character with 'new' character in the input 'string'.

    Parameters:
    - string (str): The input string where replacements will be made.
    - old (str): The character to be replaced. A single character.
    - new (str): The character(s) to replace the 'old' character with.

    Returns:
    - str: The modified string with the replacements made.

    Examples:
    >>> substitute_base("AAGTTAGTCA", "A", "C")
    'CCGTTCGTCC'
    >>> result = substitute_base("12-31-1969", "-", "/")
    >>> result
    '12/31/1969'
    >>> substitute_base("email@example.com", "@", "[at]")
    'email[at]example.com'
    >>> substitute_base("Let's meet at 7 PM.", " ", "_")
    "Let's_meet_at_7_PM."
    """
    pass #FIXME


# Exercise 5
def combine(items):
    """
    Combine the items of a list by concatenating strings or summing numbers.

    Parameters:
    - items (list): A list of numbers or strings to be combined.

    Returns:
    - int, float, or str: The combined result of the items.

    Examples:
    >>> nums = [1, 2, 3, 4, 5]
    >>> combine(nums)
    15
    >>> strings = ["hello ", "my ", "name ", "is ", "someone?"]
    >>> combine(strings)
    'hello my name is someone?'
    >>> shopping_lst, prices = ["1.Apples", "2.Bananas", "3.Oranges", "4.Milk"], [2.53, 0.69, 3.34, 3.69]
    >>> (combine(shopping_lst), round(combine(prices), 2)) == ('1.Apples2.Bananas3.Oranges4.Milk', 10.25)
    True
    >>> combine(list(range(0, 11)))
    55
    """
    pass #FIXME


# Exercise 6
def base_freq(sequence):
    """
    Calculate the frequency of each base pair in a DNA sequence string.

    Parameters:
    - sequence (str) or (lst): The DNA sequence string or list of entries.

    Returns:
    - dict: A dictionary with the base pair as the key and its frequency as the value.

    Examples:
    >>> base_freq("AAGTTAGTCA") == {"A": 4, "C": 1, "G": 2, "T": 3}
    True
    >>> result = base_freq([4, 4, 4, 5, 5, 5, 2, 2, 1])
    >>> result == {4: 3, 5: 3, 2: 2, 1: 1} #the number 4 appears 3 times
    True
    """
    pass #FIXME
    

# Exercise 7.1
def substitute_chars(string, replacements):
    """
    Substitute characters in a string based on a dictionary of replacements.

    Parameters:
    - string (str): The original string to be modified.
    - replacements (dict): A dictionary of character replacements.

    Returns:
    - str: The modified string with characters substituted according to the replacements dictionary.
    Examples:
    >>> replacements = {"S":"Z", "E":"U", "T":"P", "A":"M"}
    >>> substitute_chars("SECRET MESSAGE", replacements)
    'ZUCRUP MUZZMGU'
    >>> replacements = {"P": "Pikachu, ", "B": "Bulbasaur, ", "C": "Charmander, ", "S": "Squirtle"}
    >>> result = substitute_chars("I choose you, PBCS!", replacements)
    >>> result
    'I choose you, Pikachu, Bulbasaur, Charmander, Squirtle!'
    """
    pass #FIXME


# Exercise 7.2
def invert_dict(original):
    """
    Invert a dictionary, swapping keys and values.

    Parameters:
    - original (dict): The original dictionary to be inverted.

    Returns:
    - dict: The inverted dictionary, where the keys and values of the original dictionary are swapped.

    Examples:
    >>> invert_dict({})
    {}
    >>> result = invert_dict({'apple': 'manzana', 'banana': 'plátano', 'cherry': 'cereza'})
    >>> result == {'manzana': 'apple', 'plátano': 'banana', 'cereza': 'cherry'} 
    True
    >>> invert_dict(result) == {'apple': 'manzana', 'banana': 'plátano', 'cherry': 'cereza'}
    True
    >>> replacements = {"S":"Z", "E":"U", "T":"P", "A":"M"}
    >>> substitute_chars("ZUCRUP MUZZMGU", invert_dict(replacements))
    'SECRET AESSAGE'
    """
    pass #FIXME


## Optional ##
# def sum_columns(board):
#     """
#     Calculate the sum of each column in a given 2D array and return the results as a list.

#     Parameters:
#     - arr (list of lists): A 2D array representing the input matrix.

#     Returns:
#     - list: A list of sums, where each element at index 'i' represents the sum of column 'i' in the input array.
#     Examples:
#     >>> board = [
#     ... [6, 8, 10, 6],
#     ... [5, 9, 9, 2],
#     ... [1, 8, 2, 1],
#     ... [2, 4, 10, 9]
#     ... ]
#     >>> result = sum_columns(board)
#     >>> result
#     [14, 29, 31, 18]
#     >>> sum_columns([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
#     [12, 15, 18]
#     """
#     pass #FIXME


## Optional ##
# def binary_search(numbers, target):
#     """
#     Perform binary search on a sorted list of numbers to find the target.

#     Parameters:
#     - numbers (list): A sorted list of numbers.
#     - target (int): The number to search for.

#     Returns:
#     - int: The index of the target number if found, or -1 if not found.
#     >>> arr = [1, 2, 3, 4, 5, 6, 7]
#     >>> result = binary_search(arr, 4)
#     >>> result 
#     3
#     >>> nums = [4, 7, 9, 11, 18]
#     >>> binary_search(nums, 17) == -1
#     True
#     >>> binary_search(nums, 4)
#     0
#     >>> binary_search(nums, 18)
#     4
#     """
#     pass #FIXME

## Optional ##
# def count_paths(level):
#     """
#     Given a level in Super Mario Bros represented as a 2D array,
#     write a Python function to count the number of possible paths 
#     Mario can take to reach the end of the level. Mario can only
#     move right or down in each step and cannot move outside the boundaries of the level.

#     Examples:
#     >>> level = [
#     ... [0, 0, 0, 0],
#     ... [0, 0, 1, 0],
#     ... [0, 1, 0, 0],
#     ... [0, 0, 0, 0]
#     ... ]
#     >>> count_paths(level)
#     2
#     >>> level = [
#     ... [0, 0, 0],
#     ... [1, 0, 0],
#     ... [0, 0, 0]
#     ... ]
#     >>> count_paths(level)
#     3
#     >>> count_paths([[0 for i in range(4)] for x in range(4)]) == 20
#     True
#     """
#     pass #FIXME


