import oop_labv3
import unittest

#Lab code has to be named oop_labv3 otherwise import won't work
class TestBook(unittest.TestCase):
    def setUp(self):
        self.hunger_games = oop_labv3.Book('Dystopian fiction', 'The Hunger Games', 'Suzanne Collins', 2008)
        self.ranger_games = oop_labv3.Book('Crime Nonfiction', 'Ranger Games', 'Ben Blum', 2017)
        self.strange_book = oop_labv3.Book("Cooking", "How to Cook Water", "Yaxson Mang", 2016)
        self.old_book = oop_labv3.Book("Comic", "Calvin & Hobbes", "Bill Watterson", 1985)
        self.cooking_two = oop_labv3.Book("Cooking", "Never Cook Slime", "Josh Hug", 2021)

    def test_calculate_age(self):
        self.assertEqual(self.hunger_games.calculate_age(), 14)
        self.assertEqual(self.ranger_games.calculate_age(), 5)
        self.assertEqual(self.strange_book.calculate_age(), 6)
    
    def test_outdated(self):
        self.assertTrue(self.hunger_games.outdated(10))
        self.assertFalse(self.hunger_games.outdated(14))
        self.assertFalse(self.ranger_games.outdated(10))
        self.assertFalse(self.strange_book.outdated(10))
        
    def test_add_to_genres(self):
        self.assertEqual(oop_labv3.Book.genres, {})
        
        oop_labv3.Book.add_to_genres(self.old_book)
        self.assertEqual(oop_labv3.Book.genres, {"Comic" : [["Calvin & Hobbes", "Bill Watterson"]]})
        
        oop_labv3.Book.add_to_genres(self.strange_book)
        self.assertEqual(oop_labv3.Book.genres, {"Comic" : [["Calvin & Hobbes", "Bill Watterson"]],
        "Cooking" : [["How to Cook Water", "Yaxson Mang"]]})
        
        oop_labv3.Book.add_to_genres(self.old_book)
        self.assertEqual(oop_labv3.Book.genres, {"Comic" : [["Calvin & Hobbes", "Bill Watterson"]],
        "Cooking" : [["How to Cook Water", "Yaxson Mang"]]})
        
        oop_labv3.Book.add_to_genres(self.cooking_two)
        self.assertEqual(oop_labv3.Book.genres, {"Comic" : [["Calvin & Hobbes", "Bill Watterson"]], 
        "Cooking" : [["How to Cook Water", "Yaxson Mang"],["Never Cook Slime", "Josh Hug"]]})

'''class TestMemePage(unittest.TestCase):
    def setUp(self):
        self.cs = oop_labv3.MemePage("CS 10 MemePage")
        self.cal = oop_labv3.MemePage("Cal MemePage")
    
    def test_MemePage_constructor(self):
        self.assertEqual(self.cs.members, 0)
        self.assertEqual(self.cal.members, 0)
        self.assertEqual(self.cs.topic, "CS 10 MemePage")
        self.assertEqual(self.cal.topic, "Cal MemePage")
        self.assertEqual(self.cs.posts, {})

class TestMember(unittest.TestCase):
    def setUp(self):
        self.cs = oop_labv3.MemePage("CS 10 MemePage")
        self.cal = oop_labv3.MemePage("Cal MemePage")
        self.oski = oop_labv3.Member("Oski", self.cs)
        self.alonzo = oop_labv3.Member("Alonzo", self.cs)
        self.squirrel = oop_labv3.Member("Squirrel", self.cal)
    
    def test_Member_constructor(self):
        self.assertEqual(self.oski.name, "Oski")
        self.assertEqual(self.squirrel.name, "Squirrel")
        self.assertEqual(self.oski.memepage, self.cs)
        self.assertEqual(self.squirrel.memepage, self.cal)
        self.assertEqual(self.alonzo.activity, 0)
        self.assertEqual(self.alonzo.num_posts, 0)
        self.assertEqual(self.cs.members, 2, "Make sure you're changing the corresponding memepage's attribute member count.")
        self.assertEqual(self.cal.members, 1, "Make sure you're changing the corresponding memepage's attribute member count.")

    def test_tag_ur_friend_in_meme(self):
        self.assertEqual(self.oski.tag_ur_friend_in_meme(self.alonzo, "lol idk"),
        f"@ {self.alonzo.name} has been tagged!")
        self.assertEqual(self.oski.activity, 1)
        self.assertEqual(self.alonzo.activity, 0, "Friend's activity shouldn't change!")
        
        self.assertEqual(self.oski.tag_ur_friend_in_meme(self.squirrel, "lmao idk"),
        "You cannot tag someone in a meme if they are not a member of this page.")
        self.assertEqual(self.oski.activity, 1, "Activity shouldn't change!")
        self.assertEqual(self.squirrel.activity, 0, "Squirrel isn't related to this, activity shouldn't change!")
    
    def test_post_in_page(self):
        self.assertEqual(self.oski.post_in_page("lol idk"), 
        f"Your total activity on this {self.oski.memepage.topic} page is {self.oski.activity}, and your total posts to it is now {self.oski.num_posts}.")
        self.assertTrue("lol idk" in self.oski.memepage.posts)
        self.assertTrue("lol idk" in self.alonzo.memepage.posts, "Oski and Alonzo should both have access to the post.")
        self.assertTrue("lol idk" not in self.squirrel.memepage.posts, "Post should only be made in CS 10 MemePage")
        self.assertEqual(self.oski.memepage.posts["lol idk"], 0, "Starting likes should be 0.")
        self.assertEqual(self.oski.activity, 1)
        self.assertEqual(self.oski.num_posts, 1)

        self.assertEqual(self.alonzo.post_in_page("lol idk"), "You have been banned for reposting a meme.")
        self.assertTrue("lol idk" not in self.squirrel.memepage.posts, "Post should only be made in CS 10 MemePage")
        self.assertEqual(self.alonzo.memepage.posts["lol idk"], 0, "Starting likes shouldn't change.")
        self.assertEqual(self.alonzo.activity, 0, "Alonzo shouldn't have any change in activity!")
        self.assertEqual(self.alonzo.num_posts, 0, "Alonzo shouldn't have any change in posts!")

    def test_like_a_post_in_page(self):
        self.oski.post_in_page("lol idk")
        self.assertEqual(self.cs.posts['lol idk'], 0, "Starting likes should be 0")
        self.assertEqual(self.alonzo.like_a_post_in_page("lol idk"), 
        f"Your total activity on this {self.alonzo.memepage.topic} page is {self.alonzo.activity}, and the total number of likes on the post lol idk is " + str(self.alonzo.memepage.posts.get("lol idk")) + ".")
        self.assertEqual(self.alonzo.activity, 1)
        self.assertEqual(self.oski.activity, 1, "Oski's activity shouldn't change.")
        self.assertEqual(self.cs.posts['lol idk'], 1, "Likes should increase by 1")

        self.oski.like_a_post_in_page("lol idk")
        self.assertEqual(self.oski.activity, 2)
        self.assertEqual(self.alonzo.activity, 1, "Alonzo's activity shouldn't change!")
        self.assertEqual(self.cs.posts['lol idk'], 2, "Likes should increase by 1")'''


if __name__ == '__main__':
    unittest.main()

        
    



