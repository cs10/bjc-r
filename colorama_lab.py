from colorama import init
init()
from colorama import Fore, Back, Style

"""Question 1: Write a function that prints given text into a given color"""
def change_text_color(text, color):

	"*** YOUR CODE HERE ***"

	print(getattr(Fore, color) + text)
	print(Fore.RESET)

"""Question 2: Write a function that prints given text onto a given background color"""
def change_background_color(text, color):
	
	"*** YOUR CODE HERE ***"

	print(getattr(Back, color) + text)
	print(Back.RESET)


def change_brightness(text, level):
"""Question 2: Write a function that prints given text in a given brightness level"""

	"*** YOUR CODE HERE ***"

	print(getattr(Style, level) + text)


####### Text Processing with Colorama ########

def read_file(filename):
    """Returns the text contained in file with given filename."""
    f = open(filename, "r")
    text = f.read()
    return text

def parse_text(text):
	"""Prints the given text with changed formatting according to different conditions"""

	"*** YOUR CODE HERE ***"

	text = list(text)
	for word in text:
		if len(word) >= :
			change_
		if 'y' in word:
			change_
		if word[len(word)-1] == 's':
			change_
		if is_palindrome(word):
			change_



text = read_file("replace with file location ex. text/gettysburg.txt")
print(apply_language_game(text, func_name))