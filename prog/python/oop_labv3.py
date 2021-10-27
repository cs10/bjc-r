class Book:
	def __init__(self, genre, title, author, py):
		return 
		
	def calculate_age(self):
		#Calculates the age of the book by subtracting its publication year from the current year.
		return 
		
	def outdated(self, old_age):
		#Determines if the book is outdated. Takes in an old_age and return True or False.
		#Should return True if the age is at least old_age
		return 

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
