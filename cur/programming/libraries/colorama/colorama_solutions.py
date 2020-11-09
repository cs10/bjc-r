from colorama import init
init()
from colorama import Fore, Back, Style

"""Question 1: Write a function that prints given text into a given color"""
def change_text_color(text, color):

	print(getattr(Fore, color) + text)
	print(Fore.RESET)

"""Question 2: Write a function that prints given text onto a given background color"""
def change_background_color(text, color):

	print(getattr(Back, color) + text)
	print(Back.RESET)


"""Question 3: Write a function that prints given text in a given brightness level"""
def change_brightness(text, level):

	print(getattr(Style, level) + text)
	print(Style.RESET_ALL)



####### Text Processing with Colorama ########

def read_file(filename):
    """Returns the text contained in file with given filename."""
    f = open(filename, "r")
    text = f.read()
    return text

def parse_text(text):
	"""Prints the given text with changed formatting according to different conditions"""

	text = list(text)
	for word in text:
		if len(word) >= 6:
			change_text_color(word, 'BLUE')
		if 't' in word:
			change_background_color(word, 'YELLOW')
		if word[len(word)-1] == 'e':
			change_background_color(word, 'GREEN')
		if is_palindrome(word):
			change_brightness(word, 'BRIGHT')

def is_palindrome(word):
	if len(word) < 2: 
		return True
	if word[0] != word[-1]:
		return False
	return ispalindrome(word[1:-1])


text = read_file('tetris.txt')
print(parse_text(text))
