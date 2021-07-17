class Book:
	def __init__(self, genre, title, author, publication_year):
		return 0
		
	def calculate_age(self):
		#Calculates the age of the book by subtracting its publication year from the current year.
		return 0
	def outdated(self, old_age):
		#Determines if the book is outdated. Takes in an old_age and sets worn_down to True.
		return 0

	def add_genre(self):
		'''If the book's genre isn't in the varieties, then you'll need to add the genre to varieties
		as well as the original book's information. Otherwise, just make sure the book isn't
		inside varieties before you add it!'''
		return 0

class Textbook(Book):
	publisher = 'Houghton Mifflin Harcourt'

	def random_function(self):
		return 'Do something'

class MemePage:
	def __init__(self, name):
		return 0
	def tag_ur_friend_in_meme(self, friend):
		return 0
		#Hint: use the isinstance function
	def post_in_page(self, title_of_post):
		return 0
	def like_a_post_in_page(self, title_of_post):
		return 0
