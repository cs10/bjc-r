from datetime import datetime

class Book:

    def __init__(self: 'Book', genre: str, title: str, author: str, publication_year: int):
        """
        Initialize a Book object.

        Args:
            genre (str): The genre of the book.
            title (str): The title of the book.
            author (str): The author of the book.
            publication_year (int): The publication year of the book.
	    
	    Examples:
	    >>> book1 = Book("Fiction", "Norwegian Wood", "Haruki Murakami", 1987)
	    >>> book1.genre == "Fiction"
	    True
	    >>> book1.title == "Norwegian Wood"
	    True
	    >>> book1.title = "Kafka on the Shore"
	    >>> book1.author.lower() == "haruki murakami"
	    True
	    >>> type(book1.publication_year) == int
	    True
	    >>> books = []
	    >>> for genre, title, author, publication_year in [\
                ["Manga", "Tomie", "Junji Ito", 2016], \
                ["Self-help", "Outliers", "Malcolm Gladwell", 2008], \
                ["Fiction", "1984", "George Orwell", 1961]]:
	    ... 	books.append(Book(genre, title, author, publication_year))
		>>> [x.genre for x in books] == ["Manga", "Self-help", "Fiction"]
		True
		>>> sum([y.publication_year for y in books]) == 5985
		True
		>>> [title.title for title in books] == ["Tomie", "Outliers", "1984"]
		True
		>>> books[1].author == "Malcolm Gladwell"
		True
        """
        pass


    def __str__(self: 'Book') -> str: 
        """
        Return the string representation of a Book object.
        Examples:
        >>> book1 = Book("Fiction", "Norwegian Wood", "Haruki Murakami", 1987)
        >>> print(book1)
        Book Title: Norwegian Wood | Genre: Fiction | Author: Haruki Murakami | Year: 1987
        """
        pass
    

    def __repr__(self) -> str:
        """
        Return a string representation that can be used to recreate the object.

        Returns:
            str: A string representation of the Book object.
        >>> dune = Book("Science Fiction", "Dune", "Frank Herbert", 1965)
        >>> dune
        Book('Science Fiction', 'Dune', 'Frank Herbert', 1965)
        """
        pass
    

    def calculate_age(self: 'Book') -> int:
        """
        Calculate the age of the book by subtracting its publication year from the current year.

        Returns:
            int: The age of the book.
        >>> tokyo = Book("Mystery", "Tokyo Heist", "Diana Renn", 2013)
        >>> 10 <= tokyo.calculate_age() <= 15 #in 2023, tokyo.calculate_age() == 10
        True
        """
        pass


    def outdated(self: 'Book', old_age: int) -> int:
        """
        Determine if the book is outdated based on a specified age.

        Args:
            old_age (int): The maximum age threshold for considering the book outdated.

        Returns:
            bool: True if the book's age is greater than the specified old_age, False otherwise.
        >>> hunger_games = Book('Dystopian fiction', 'The Hunger Games', 'Suzanne Collins', 2008)
        >>> hunger_games.outdated(1)
        True
        >>> hunger_games.outdated(30)
        False
        >>> sum([Book('Mystery', 'Gone Girl', 'Gillian Flynn', 2012).outdated(x) for x in range(1, 11)])
        10
        >>> strange_book = Book('Science Fiction', 'Dune', 'Frank Herbert', 1965)
        >>> Book.outdated(strange_book, 45)
        True
        """
        pass


    def add_to_genres(self: 'Book') -> None:
        """
        Add the book to the genres dictionary.

        If the book's genre isn't in the genres dictionary, add the genre and the book's information.
        Otherwise, make sure the book isn't already present in the genres dictionary before adding it.

        Returns:
            None
        >>> frankenstein = Book("Fiction", "Frankenstein", "Mary Shelley", 1818)
        >>> old_book = Book("Comic", "Calvin & Hobbes", "Bill Watterson", 1985)
        >>> strange_book = Book("Cooking", "How to Cook Water", "Yaxson Mang", 2016)
        >>> Book.add_to_genres(old_book)
        >>> Book.genres
        {'Comic': [['Calvin & Hobbes', 'Bill Watterson']]}
        >>> cooking_two = Book("Cooking", "Never Cook Slime", "Josh Hug", 2021)
        >>> Book.add_to_genres(frankenstein); Book.add_to_genres(strange_book); Book.add_to_genres(cooking_two)
        >>> Book.genres == {'Comic': [['Calvin & Hobbes', 'Bill Watterson']],
        ... 'Fiction': [['Frankenstein', 'Mary Shelley']], 
        ... 'Cooking': [['How to Cook Water', 'Yaxson Mang'], ["Never Cook Slime", "Josh Hug"]]}
        True
        """
        pass


class MooingBook(Book):

    def __repr__(self: 'MooingBook'):
        """
        Returns the string representation of a MooingBook object.
        >>> sherlock = MooingBook("Mystery", "The Adventures of Sherlock Holmes", "Arthur Conan Doyle", 1892)
        >>> print(sherlock) #string representation
        Book Title: The Adventures of Sherlock Holmes | Genre: Mystery | Author: Arthur Conan Doyle | Year: 1892
        >>> sherlock #overrided repr
        MooingBook('Mystery', 'The Adventures of Sherlock Holmes', 'Arthur Conan Doyle', 1892)
        """
        pass


    def moo(self: 'MooingBook'):
        """
        Produce a moo sound on behalf of the book's author.

        Returns:
            None
        Examples:
        >>> frankenstein = MooingBook("Fiction", "Frankenstein", "Mary Shelley", 1818)
        >>> frankenstein.moo()
        On behalf of Mary Shelley, I moo.
        """
        pass


'''---------------------------------MemePage Class-----------------------------------------------'''
class MemePage:
    def __init__(self: 'MemePage', topic: int):
        """
        Initialize a MemePage object.

        Args:
            topic (int): The topic of the meme page.
        Examples:
        >>> meme = MemePage("CS61A")
        >>> (meme.members, meme.topic) == (0, "CS61A")
        True
        >>> type(meme.posts) == dict
        True
        """
        pass


    def __eq__(self: 'MemePage', other: 'MemePage') -> bool:
        """
        Compare the MemePage object with another MemePage object for equality.

        Args:
            other (MemePage): The other MemePage object to compare with.

        Returns:
            bool: True if the MemePage objects are equal, False otherwise.
        Examples:
        >>> meme1 = MemePage("Among Us")
        >>> meme2 = MemePage("Among Us")
        >>> meme1 == meme2
        True
        >>> meme1.members += 1 #Meme1 and meme2 do not equal since the member attributes are different
        >>> meme1 == meme2
        False
        >>> meme3 = MemePage("Spider Man")
        >>> meme2 == meme3
        False
        """
        pass

'''---------------------------------MemberPage Class-----------------------------------------------'''

class Member:
    def __init__(self: 'Member', name: str, memepage: 'MemePage'):
        """
        Initialize a Member object.

        Args:
            name (str): The name of the member.
            memepage (MemePage): The MemePage object the member belongs to.
        Examples:
        >>> meme1 = MemePage("Among Us")
        >>> red = Member("Red", meme1)
        >>> blue = Member("Blue", meme1)
        >>> imposter = Member("grey", meme1)
        >>> red.name == "Red" and red.memepage == meme1
        True
        >>> meme1.members == 3 and imposter.memepage == meme1 == blue.memepage
        True
        """
        pass


    def tag_ur_friend_in_meme(self: 'Member', friend: 'Member', title_of_post: str) -> str:
        """
        Tag a friend in a meme post.

        Args:
            friend (Member): The friend to tag in the meme.
            title_of_post (str): The title of the post to tag the friend in.

        Returns:
            str: A message indicating whether the friend was tagged or not.
        Examples:
        >>> meme1 = MemePage("Among Us")
        >>> red = Member("Red", meme1)
        >>> blue = Member("Blue", meme1)
        >>> isinstance(blue, Member)
        True
        >>> imposter = Member("grey", meme1)
        >>> red.tag_ur_friend_in_meme(blue, "Who is the Imposter!!!")
        "@Blue has been tagged in 'Who is the Imposter!!!'"
        >>> red.activity == 1 and blue.activity == 0
        True
        >>> meme2 = MemePage("Funny Memes")
        >>> red.tag_ur_friend_in_meme(meme2, "Scuba Diving") #meme2 is not a member
        'You cannot tag someone in a meme if they are not a member of this page.'
        """
        pass


    def post_in_page(self: 'Member', title_of_post: str) -> str:
        """
        Post a meme in the meme page.

        Args:
            title_of_post (str): The title of the post to be posted.
        Examples:
        >>> meme1 = MemePage("Among Us")
        >>> red = Member("Red", meme1)
        >>> blue = Member("Blue", meme1)
        >>> imposter = Member("grey", meme1)
        >>> len(meme1.posts) == 0
        True
        >>> title = "Red is the imposter! Vote for him!"
        >>> imposter.post_in_page(title)
        'Your total activity on this Among Us page is 1, and your total posts to it is now 1.'
        >>> title in imposter.memepage.posts
        True
        >>> blue.post_in_page(title)
        'You have been banned for reposting a meme.'
        >>> title in red.memepage.posts
        True
        >>> red.post_in_page("Imposter is kind of suspicious")
        'Your total activity on this Among Us page is 1, and your total posts to it is now 1.'
        >>> len(imposter.memepage.posts) == 2
        True
        """
        pass


    def like_a_post_in_page(self: 'Member', title_of_post: str) -> str:
        """
        Like a post in the meme page. Throw an error if title of post is not found.

        Args:
            title_of_post (str): The title of the post to like.

        Returns:
            str: A message indicating the activity and number of likes on the post.
        Examples:
        >>> meme_page = MemePage("Computer Security")
        >>> alice = Member("Alice", meme_page)
        >>> bob = Member("Bob", meme_page)
        >>> mallory = Member("Mallory", meme_page)
        >>> password = "among us"
        >>> title = f"Hey Bob! My Netflix password is {password}"
        >>> alice.post_in_page(title)
        'Your total activity on this Computer Security page is 1, and your total posts to it is now 1.'
        >>> alice.tag_ur_friend_in_meme(bob, title)
        "@Bob has been tagged in 'Hey Bob! My Netflix password is among us'"
        >>> bob.like_a_post_in_page(title)
        "Your total activity on this page is 1, and the total number of likes on the post 'Hey Bob! My Netflix password is among us' is 1."
        >>> mallory.like_a_post_in_page(title)
        "Your total activity on this page is 1, and the total number of likes on the post 'Hey Bob! My Netflix password is among us' is 2."
        >>> bob.activity == 1 and bob.memepage.posts[title] == 2
        True
        >>> title2 = f"Hey Alice, the password doesn't seem to work :("
        >>> bob.post_in_page(title2)
        'Your total activity on this Computer Security page is 2, and your total posts to it is now 1.'
        >>> bob.tag_ur_friend_in_meme(alice, title2)
        "@Alice has been tagged in 'Hey Alice, the password doesn't seem to work :('"
        >>> del mallory.memepage.posts[title2]
        >>> title3 = "The new super mario movie is awesome!"
        >>> mallory.post_in_page(title3)
        'Your total activity on this Computer Security page is 2, and your total posts to it is now 1.'
        >>> bob.like_a_post_in_page(title3)
        "Your total activity on this page is 4, and the total number of likes on the post 'The new super mario movie is awesome!' is 1."
        >>> alice.like_a_post_in_page(title2)
        "Title of post 'Hey Alice, the password doesn't seem to work :(' not found"
        """
        pass
        temp = f"Your total activity on this page is {}, and the total number of likes on the post '{}' is {}."

