from multiprocessing.sharedctypes import Value

#################
## Exercise 0 ###
#################
def read_file(filename: str) -> str:
    """Returns the text contained in the file with the given filename.

    Parameters:
        filename (str): The name of the file to be read.

    Returns:t a
        str: The text content of the file.
    """
    pass

#################
## Exercise 1 ###
#################
def pig_latin(word: str) -> str:
    """Returns the pig Latin translation of a word.

    Parameters:
        word (str): The word to be translated into pig Latin.

    Returns:
        str: The pig Latin translation of the input word.
    Examples:
    >>> pig_latin("hello")
    'ellohay'
    >>> x = pig_latin("hello") #makes sure that the value is being returned, not printed
    >>> x
    'ellohay'
    >>> pig_latin("it") #Since the first letter is a vowel, do not move any characters
    'itay'
    >>> lst = "The Beauty and Joy of Computing".split()
    >>> " ".join([pig_latin(x) for x in lst])
    'eThay eautyBay anday oyJay ofay omputingCay'
    >>> pig_latin("hymn") #has no vowels
    'hymnay'
    >>> greeting = "hello Chris how are you".split()
    >>> " ".join([pig_latin(x) for x in greeting])
    'ellohay isChray owhay areay ouyay'
    """
    pass

#################
## Exercise 2 ###
#################
def izzle(word: str) -> str:
    """ Returns the izzle translation of a word. 

    The 'izzle' translation follows the following rules:
    - If the word has no vowels, there are two options: append 'izzle' or replace the whole string with 'izzle'.
    - If the word has vowels, replace the string with 'izzle' starting at the last vowel.

    Parameters:
        word (str): The word to be translated.

    Returns:
        str: The 'izzle' translation of the word.

    >>> x = izzle("Merry")
    >>> x
    'Mizzle'
    >>> izzle('my') in ["myizzle", 'izzle'] #no vowels, two options -> append izzle or replace whole string with izzle
    True
    >>> izzle("dentist") #replace the string with izzle starting at the last vowel
    'dentizzle'
    >>> lst = "The quick brown fox jumps over the lazy dog".split()
    >>> result = []
    >>> for word in lst:
    ...     result.append(izzle(word))
    >>> result = " ".join(result)
    >>> a1 = 'Thizzle quizzle brizzle fizzle jizzle ovizzle thizzle lizzle dizzle'
    >>> a2 = 'izzle quizzle izzle izzle izzle ovizzle izzle lizzle izzle'
    >>> #two options -> either replace words with 0 or 1 vowels with 'izzle' 
    >>> # or replace with 'izzle' starting at the first vowel
    >>> result in [a1, a2]
    True
    """
    pass

#################
## Exercise 3 ###
#################
def apply_language_game(text: str, language_game) -> str:
    """Applies a language game function to every word in the text.

    Given a text and a language game function, this function applies the
    language game function to each word in the text.
    It returns the modified text where each word has been transformed according to the language game.

    Parameters:
        text (str): The input text to be processed.
        language_game (callable): A function representing the language game to be applied to each word.

    Returns:
        str: The modified text where each word has been transformed according to the language game.
    Examples:
    >>> text = read_file("gettysburg.txt")
    >>> result = apply_language_game(text, str.upper) #Uppercases all words read from gettysburg.txt
    >>> result = result.split()
    >>> result[0:8]
    ['FOUR', 'SCORE', 'AND', 'SEVEN', 'YEARS', 'AGO', 'OUR', 'FATHERS']
    >>> pig = apply_language_game(text, pig_latin)
    >>> pig = pig.split()
    >>> pig[0:8]
    ['ourFay', 'orescay', 'anday', 'evensay', 'earsyay', 'agoay', 'ouray', 'athersfay']
    >>> vowels = ['a', 'e', 'i', 'o', 'u']
    >>> #the below language_game filters out the vowels in each word of the file
    >>> no_vowels = apply_language_game(text, lambda word: "".join([char for char in word if char not in vowels]))
    >>> no_vowels = no_vowels.split()
    >>> no_vowels[-10:] #the last 10 words
    ['ppl,', 'fr', 'th', 'ppl,', 'shll', 'nt', 'prsh', 'frm', 'th', 'rth.']
    """
    pass


#################
## Exercise 4 ###
#################
def count_words(text: str) -> dict:
    """Counts the occurrences of each word in the given text.

    Given a text, this function counts the occurrences of each word and returns a dictionary
    mapping each word to its count.

    Parameters:
        text (str): The input text to be counted.

    Returns:
        dict: A dictionary mapping each word in the text to its count.
    Examples:
    >>> result = count_words("Fruits and Vegetables and Vegetables on a Budget and Vegetables at a Store and Vegetables to Clean Fruit and Vegetables")
    >>> result == {'and': 5, 'on': 1, 'Vegetables': 5, 'Budget': 1, 'to': 1, 'Fruit': 1, 'a': 2, 'Clean': 1, 'Fruits': 1, 'Store': 1, 'at': 1}
    True
    >>> input = "apples and bananas and turkey and meat and bananas and apples and bananas and steak and a new professor."
    >>> expected = {'apples': 2, 'and': 8, 'bananas': 3, 'turkey': 1, 
    ... 'meat': 1, 'steak': 1, 'a': 1, 'new': 1, 'professor.': 1}
    >>> actual = count_words(input)
    >>> actual == expected
    True
    >>> input = "Gotta catch 'em all gotta catch 'em all Pokemon! Gotta catch 'em all! Pikachu!"
    >>> expected = {'Gotta': 2, 'catch': 3, "'em": 3, 'all': 2, 'gotta': 1, 'Pokemon!': 1, 'all!': 1, 'Pikachu!': 1}
    >>> actual = count_words(input)
    >>> actual == expected
    True
    """
    pass


#################
## Exercise 5 ###
#################
def top_n_words(counts: dict, n: int) -> list:
    """Returns the top n words by count. In the case of a tie, it doesn't matter which words are chosen to break the tie.

    Parameters:
        counts (dict): A dictionary mapping words to their counts.
        n (int): The number of top words to return.

    Returns:
        list: A list of the top n words by count.

    Examples:
    >>> top_n_words({'and': 5, 'on': 1, 'Vegetables': 5, 'Budget': 1, 
    ... 'to': 1, 'Fruit': 1, 'a': 2, 'Clean': 1, 'Fruits': 1, 'Store': 1, 'at': 1}, 2)
    ['and', 'Vegetables']
    >>> input = "apples and bananas and turkey and meat and bananas and apples and bananas and steak and a new professor."
    >>> counts = count_words(input)
    >>> top_n_words(counts, 3)
    ['and', 'bananas', 'apples']
    >>> counts = count_words("Gotta catch 'em all gotta catch 'em all Pokemon! Gotta catch 'em all! Pikachu!")
    >>> top_n_words(counts, 2) == ['catch', "'em"]
    True
    """
    pass

#################
## Exercise 6 ###
#################
def print_top_n_words(counts: dict, n: int) -> None:
    """Prints the top n words along with their counts.

    Parameters:
        counts (Dict[str, int]): A dictionary mapping words to their counts.
        n (int): The number of top words to print.

    Returns:
        None

    >>> print_top_n_words({'and': 5, 'on': 1, 'Vegetables': 5, 
    ... 'Budget': 1, 'to': 1, 'Fruit': 1, 'a': 2, 'Clean': 1, 'Fruits': 1, 'Store': 1, 'at': 1}, 2)
    and 5
    Vegetables 5
    >>> input = "apples and bananas and turkey and meat and apples and bananas and bananas and steak and a new professor."
    >>> counts = count_words(input)
    >>> print_top_n_words(counts, 3)
    and 8
    bananas 3
    apples 2
    """
    pass


#OPTIONAL
def top_n_words_except(counts: dict, n: int, boring: list) -> list:
    """
    Returns the top words except for anything that appears in boring,
    which is a list of boring words.
    >>> counts = {'and': 5, 'on': 1, 'Vegetables': 5, 'Budget': 1, 
    ... 'to': 1, 'Fruit': 1, 'a': 2, 'Clean': 1, 'Fruits': 1, 'Store': 1, 'at': 1}
    >>> top_n_words_except(counts, 2, ['and'])
    ['Vegetables', 'a']
    """
    pass

#################
## Exercise 7 ###
#################
def average_word_length(counts: dict) -> float:
    """Calculates the average length of words in a text with given counts.

    Given a dictionary `counts` that maps words to their counts in a text, this function
    calculates and returns the average length of words in the text.

    Parameters:
        counts (dict): A dictionary mapping words to their counts in a text.

    Returns:
        float: The average length of words in the text.
    Examples:
    >>> average_word_length({'and': 5, 'on': 1, 'Vegetables': 5, 'Budget': 1, 'to': 1, 
    ... 'Fruit': 1, 'a': 2, 'Clean': 1, 'Fruits': 1, 'Store': 1, 'at': 1})
    5.0
    >>> dict = {'that': 13, 'the': 9, 'to': 8, 'we': 8, 'alpha': 7, 'and': 6, 'can': 5, 'have': 4}
    >>> x = average_word_length(dict)
    >>> x == 3.25
    True
    >>> round(average_word_length({'Gotta': 2, 'catch': 3, "'em": 3, 'all': 3, 'gotta': 1, 'Pokemon!': 1}), 2)
    4.31
    """
    """
    The first test case would return 5.0. This is because:
    Total letters: 3*5 + 2*1 + 10*5 + 6*1 + 2*1 + 5*1 + 1*2 + 5*1 + 6*1 + 5*1 + 2*1 = 100
    Total words: 5 + 1 + 5 + 1 + 1 + 1 + 2 + 1 + 1 + 1 + 1 = 20
    """
    pass


#OPTIONAL
def word_diversity(counts: dict) -> float:
    """Returns the diversity of a text. 
    Test the diversity of the given input texts.
    >>> x = {'and': 5, 'on': 1, 'Vegetables': 5, 'Budget': 1, 'to': 1, 'Fruit': 1, 'a': 2, 'Clean': 1, 'Fruits': 1, 'Store': 1, 'at': 1}
    >>> word_diversity(x)
    0.55
    >>> round(word_diversity({'Gotta': 2, 'catch': 3, "'em": 3, 'all': 3, 'gotta': 1, 'Pokemon!': 1}), 3)
    0.462
    >>> word_diversity({"Beauty": 2, "and": 3, "Joy": 10})
    0.2
    """
    pass

# OPTIONAL
def get_kgram(text: str, ptr: int, k: int) -> str:
    """Returns the kgram starting at position ptr in a text.
    >>> get_kgram("hello", 0, 3)
    'hel'
    >>> get_kgram("hello", 1, 3) 
    'ell'
    >>> get_kgram("hello", 1, 4) 
    'ello'
    >>> get_kgram("hello", 3, 4)
    Traceback (most recent call last):
    ...
    ValueError: 3 + 4 is longer than the length of hello
    """
    pass


#OPTIONAL
def process_character(m: dict, text: str, ptr: int, k: int):
    """Adds information about the given character to the model
    m is the model (a dictionary)
    text is the text
    text[ptr] is the character to be processed
    k is the order of our Markov chain
    >>> markovmodel = {}
    >>> process_character(markovmodel, "the ether", 0, 4)
    >>> process_character(markovmodel, "the ether", 1, 4)
    >>> process_character(markovmodel, "the ether", 2, 4)
    >>> expected = {'the ': {'e': 1}, 'he e': {'t': 1}, 'e et': {'h': 1}}
    >>> expected == markovmodel
    True
    """
    pass

#OPTIONAL
def build_markov_model(text: str, k: int) -> dict:
    """ Returns the markov model for text.
    m is the model (a dictionary)
    text is the text
    k is the order of our Markov chain
    >>> expected = {'the': {' ': 1, 'r': 1}, 'he ': {'e': 1}, 'e e': {'t': 1}, ' et': {'h': 1}}
    >>> actual = build_markov_model("the ether", 3)
    >>> expected == actual
    True
    >>> expected = {'Beau': {'t': 1, 'y': 1}, 'eaut': {'y': 1}, 'auty': {' ': 1}, 'uty ': {'+': 1}, 'ty +': {' ': 1}}
    >>> actual = build_markov_model("Beauty + Joy", 4)
    >>> expected == actual
    True
    """
    pass
