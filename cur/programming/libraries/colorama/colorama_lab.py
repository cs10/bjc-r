from colorama import init
init()
from colorama import Fore, Back, Style


"""Question 1: Write a function that prints given text into a given color"""
def change_text_color(text, color):

	"*** YOUR CODE HERE ***"
	

"""Question 2: Write a function that prints given text onto a given background color"""
def change_background_color(text, color):
	
	"*** YOUR CODE HERE ***"


def change_brightness(text, level):
"""Question 2: Write a function that prints given text in a given brightness level"""

	"*** YOUR CODE HERE ***"


	
####### Text Processing with Colorama ########

def read_file(filename):
    """Returns the text contained in file with given filename."""
    f = open(filename, "r")
    text = f.read()
    return text

def parse_text(text):
	"""Prints the given text with changed formatting according to different conditions"""

	"*** YOUR CODE HERE ***"


text = read_file('tetris.txt')
print(parse_text(text))
