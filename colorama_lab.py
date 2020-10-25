from colorama import init
init()
from colorama import Fore, Back, Style

"""Question 1: Write a function that prints given text into a given color"""
def change_text_color(text, color):

"*** YOUR CODE HERE ***"

	print(getattr(Fore, color) + text)

"""Question 2: Write a function that prints given text into a given background color"""
	