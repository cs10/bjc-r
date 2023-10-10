#import turtle as t

"""
This is a comment in python.  We can make comments span multiple lines
by enclosing our text in triple quotes.

We will also make comments in the code by doing the following:
"""

# Hello this is a comment made with the '#', but I only work for a single line.

"""
IMPORTANT STUFF:

In this file is basic 'skeleton code' for many of the exercises that you will be
asked to complete in this lab. Put you answers under the function doctests.
To run the code, in the command line, run the command:
python -m doctest <file_name>.py

NOTE: Please make sure that line 1 is commented out in your gradescope submission, otherwise
your submission will fail the autograder.
"""

## Exercise 1 ## 
def sum_all_numbers(x: int, y: int):
    """
    Calculate the sum of all numbers between x and y (inclusive).

    Parameters:
    x (int): The starting number of the range.
    y (int): The ending number of the range.

    Returns:
    int: The sum of all numbers from x to y.
    Examples:
    >>> sum_all_numbers(1, 4)
    10
    >>> sum_all_numbers(2, 3)
    5
    >>> sum_all_numbers(0, 0)
    0
    >>> sum_all_numbers(-45, 45)
    0
    >>> sum_all_numbers(-11, -3)
    -63
    >>> result = sum_all_numbers(1, 100) * 2
    >>> result
    10100
    """
    pass

## Exercise 2 ##
def exponent(num: int, power: int):
    """
    Calculate the exponentiation of a number.

    Parameters:
    num (int): The base number where num >= 0
    power (int): The power to which the base number is raised.

    Returns:
    int: The result of raising the base number to the given power.
    Examples:
    >>> exponent(2, 3)
    8
    >>> exponent(3, 9)
    19683
    >>> exponent(999, 0)
    1
    >>> exponent(4, 2)
    16
    >>> exponent(1, 42)
    1
    """
    pass

"""
The above exponent does not handle `pow < 0`.
As an optional exercise, uncomment the exponent_any
code that works for any `pow`. It may be helpful to 
utilize your existing `exponent` function.
"""
# def exponent_any(num: int, pow: int):
#     """
#     Calculate the exponentiation of a number.

#     Parameters:
#     num (int): The base number where num is any int
#     power (int): The power to which the base number is raised.

#     Returns:
#     int: The result of raising the base number to the given power.
#     Examples:
#     >>> exponent_any(4, 3)
#     64
#     >>> exponent_any(1, 50)
#     1
#     >>> exponent_any(0, 5)
#     0
#     >>> exponent_any(5, -2)
#     0.04
#     >>> exponent_any(2, -5)
#     0.03125
#     """
#     pass
    

## Exercise 3 ##
def palindrome(string: str):
    """
    Returns a boolean that indicates whether the inputted string is a palindrome.

    Parameters:
    string (str): The word 

    Returns:
    boolean: True if the word is a palindrome, otherwise False.
    Examples:
    >>> palindrome("")
    True
    >>> palindrome("s")
    True
    >>> palindrome("racecar")
    True
    >>> palindrome("Bananas")
    False
    >>> palindrome("kayak")
    True
    >>> is_palindrome = palindrome("xyz")
    >>> is_palindrome
    False
    """
    pass

## Exercise 4 ##
def reverse_string(string: str):
    """
    Reverses a string.

    Parameters: 
    string (str): The word

    Returns:
    str: The reversed word.
    Examples:
    >>> reverse_string("Alonzo")
    'oznolA'
    >>> reverse_string("Bananas")
    'sananaB'
    >>> word = reverse_string("racecar")
    >>> word
    'racecar'
    >>> reverse_string(reverse_string("Snap is over! Welcome to Python!"))
    'Snap is over! Welcome to Python!'
    """
    pass


### OPTIONAL ###
def c_curve(size: int, levels: int):
    """
    Draw a c-curve shape recursively using the turtle module.
    NOTE: Please make sure that line 1 is commented out in your gradescope submission, otherwise
    your submission will fail the autograder.
    """
    pass 


### OPTIONAL ###
def clear_stage():
    """
    A function that clears drawings from the stage, resets the 
    turtle back to a position, and has the turtle pointing in the direction 90 degrees.
    """
    pass 
