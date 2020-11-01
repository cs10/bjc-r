from colorama import init
init()
from colorama import Fore, Back, Style

"""Question 1: Write a function that prints given text into a given color"""
def change_text_color(text, color):

"*** YOUR CODE HERE ***"

	print(getattr(Fore, color) + text)

"""Question 2: Write a function that prints given text into a given background color"""









####### Teext Processing ########

def read_file(filename):
    """Returns the text contained in file with given filename."""
    f = open(filename, "r")
    text = f.read()
    return text

def func_name(var):
	"""returns text changed colors w following conditionsn"""
	return



text = read_file("replace with file location ex. text/gettysburg.txt")
print(apply_language_game(text, func_name))