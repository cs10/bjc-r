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
		 
class Member:
	def __init__(self, name, memepage):
		self.name = name
		self.memepage = memepage
		self.activity = 0
		self.num_posts = 0
		memepage.members += 1

	def tag_ur_friend_in_meme(self, friend, title_of_post):
		if not isinstance(friend, Member):
			return "You cannot tag someone in a meme if they are not a member of this page."		
		if friend.memepage != self.mempage:
			return "You cannot tag someone in a meme if they are not a member of this page."
		self.activity += 1
		return "@ " + friend.name +  "has been tagged!"
		#Hint: use the isinstance function as described in lab

	def post_in_page(self, title_of_post):
		if title_of_post in self.posts:
			return "You have been banned for reposting a meme."
		self.memepage.posts[title_of_post] = 0
		self.activity += 1
		self.num_posts += 1
		return String.format("Your total activity on this {} page is {}, and your total posts to it is now {}.",
			                  self.memepage.topic, self.activity, self.num_posts)

	def like_a_post_in_page(self, title_of_post):
		self.activity += 1
		self.memepage.posts[title_of_post] += 1		
		return String.format("Your total activity on this {} page is {}, and the total number of likes on the post {} is {}.",
			                  self.memepage.topic, self.activity, title_of_post, self.memepage.posts[title_of_post])

