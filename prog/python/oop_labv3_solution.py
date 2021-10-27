class Book:
	def __init__(self, genre, title, author, py):
		self.genre = genre
		self.title = title
		self.author = author
		self.publication_year = py

	def calculate_age(self):
		return 2021 - self.publication_year

	def outdated(self, old_age):
		#Determines if the book is outdated. Takes in an old_age and return True or False.
		#Should return True if the age is at least old_age
		return self.calculate_age() >= old_age		

	def add_genre(self):
		'''If the book's genre isn't in the genres, then you'll need to add the genre to genres
		as well as the original book's information. Otherwise, just make sure the book isn't
		inside genres before you add it!'''
		return 

class MooingBook(Book):    
    def moo(self):
        print("On behalf of " + self.author +  ", I moo.")

class MemePage:
	def __init__(self, topic):
		self.members = 0
		self.topic = topic
		self.posts = {}
		return 


class Member:
	def __init__(self, name, memepage):
		return

	def tag_ur_friend_in_meme(self, friend, title_of_post):
		return 
		#Hint: use the isinstance function

	def post_in_page(self, title_of_post):
		return 

	def like_a_post_in_page(self, title_of_post):
		return 
