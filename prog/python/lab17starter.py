########################################################################
## LAB 17: Data Structures and Text Processing in Python
## Part 1 (Exercises 1-7.2): Data Structures
## Part 2 (Exercises 8-14):  Text Processing
##
## Do NOT edit the names of any functions, and do NOT delete comments.
## Part 2 reads .txt files (e.g. gettysburg.txt), so run doctests from the
## folder that contains this file AND the text files:
##     python3 -m doctest lab17starter.py
########################################################################

########################################################################
## PART 1: DATA STRUCTURES (Exercises 1-7.2)
########################################################################

# Exercise 1
def push_first_odd_back(lst: list) -> None:
    """
    Modify the input list by pushing the first odd number to the back.

    Parameters:
    - lst (list): The input list to be modified.

    Returns:
    None

    `test_cases` is a list of lists. lst[0] is the input. 
    lst[1] is the expected result of the mutated input

    Examples:
    >>> test_cases = [
    ...     ([], []),     #empty list should not error
    ...     ([2, 4, 6, 8], [2, 4, 6, 8]),     #Don't push anything back, every element is even
    ...     ([6, -3, 100, -4], [6, 100, -4, -3]),     #push the -3 back
    ...     ([x**2 for x in range(0, 9)] + [9], [0, 4, 9, 16, 25, 36, 49, 64, 9, 1]),     #push the 1 back
    ...     ([2, 4, 1], [2, 4, 1])    #push the 1 back
    ... ]

    >>> for lst, expected_output in test_cases:
    ...     push_first_odd_back(lst)
    ...     assert lst == expected_output, f"Expected: {expected_output}, Actual: {lst}"

    """
    pass #FIXME

# Exercise 2
def flatten(lst: list) -> list:
    """
    Flatten a 2D list to a single-dimensional list.

    Parameters:
    - lst (list): A 2D list containing elements of various types.

    Returns:
    - list: A single-dimensional list with all elements from the 2D list.
    >>> flatten([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
    >>> board2048 = [
    ...     [2, 4, 8, 16],
    ...     [4, 2, 16, 8],
    ...     [8, 16, 4, 2],
    ...     [16, 8, 2, 4]
    ... ]
    >>> flatten(board2048)
    [2, 4, 8, 16, 4, 2, 16, 8, 8, 16, 4, 2, 16, 8, 2, 4]
    >>> nested_lst = [[x * y for x in range(1, 8, 2)] for y in range(1, 8, 2)]
    >>> result = flatten(nested_lst)
    >>> result
    [1, 3, 5, 7, 3, 9, 15, 21, 5, 15, 25, 35, 7, 21, 35, 49]
    >>> names = [['Alice', 'Bob', 'Charlie'], ['Dave', 'Eve'], ['Frank']]
    >>> flatten(names) == ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank']
    True
    """
    pass #FIXME


## OPTIONAL (not required for credit) ##
def flatten_ND(lst: list) -> list:
    """
    Flatten a nested list to a single-dimensional list.

    Parameters:
    - lst (list): A nested list containing elements of various types.

    Returns:
    - list: A single-dimensional list with all elements from the nested list.
    Examples:
    >>> numbers = [[1, [2, [3, 4, [5]]], [6, 7], [8, 9], 10]]
    >>> flatten_ND(numbers) == list(range(1, 11))
    True
    >>> storage = ['root', ['Documents', ['file1.txt', 'file2.txt']],
    ... ['Pictures', ['photo1.jpg', 'photo2.jpg']],
    ... 'README.txt'
    ... ]
    >>> flatten_ND(storage)
    ['root', 'Documents', 'file1.txt', 'file2.txt', 'Pictures', 'photo1.jpg', 'photo2.jpg', 'README.txt']
    >>> family_tree = ['John', ['Mary', ['Anna', 'David']],
    ... ['Paul', ['Emily', 'Daniel', 'Sarah']],
    ... ['Kate', ['Sophia']]
    ... ]
    >>> result = flatten_ND(family_tree)
    >>> result 
    ['John', 'Mary', 'Anna', 'David', 'Paul', 'Emily', 'Daniel', 'Sarah', 'Kate', 'Sophia']
    """
    pass #FIXME


# Exercise 3.1
def squares_of_evens(lst: list) -> list:
    """
    Square the numbers in `lst`

    Parameters:
    - lst (list): A single-dimensional list of numbers

    Returns:
    - list: A list where all the even numbers are squared. Filters out the odd numbers.
    
    `test_cases` is a list of lists. lst[0] is the input. 
    lst[1] is the expected result of the mutated input

    Examples:
    >>> test_cases = [
    ...     ([-5, -2, 0, 1, 3, 4, 8], [4, 0, 16, 64]),
    ...     (list(range(-5, 10, 3)), [4, 16]),
    ...     (sorted([-3.5, -4, 0, -5, 10, 11]), [16, 0, 100]),
    ...     ([i for i in range(-1, 10, 3)], [4, 64])
    ... ]
    >>> for input_lst, expected_output in test_cases:
    ...     actual = squares_of_evens(input_lst)
    ...     assert actual == expected_output, f"Input: {input_lst} | Expected: {expected_output} | Actual: {actual}"
    """
    pass #FIXME


# Exercise 3.2
def nth_power_of_evens(lst: list, n: int) -> list:
    """
    Generate a list of even numbers raised to the nth power from the input list.

    Parameters:
    - lst (list): A single-dimensional list of numbers.
    - n (int): The power to which even numbers should be raised.

    Returns:
    - list: A list of even numbers from the input list raised to the nth power.

    Examples:
    >>> nth_power_of_evens([-5, -2, 0, 1, 3, 4, 8], 3)
    [-8, 0, 64, 512]
    >>> board = [[2, 4], [32, 64]]
    >>> nth_power_of_evens(flatten(board), 2)
    [4, 16, 1024, 4096]
    >>> result = nth_power_of_evens([i for i in range(-10, 10)], 3)
    >>> result
    [-1000, -512, -216, -64, -8, 0, 8, 64, 216, 512]
    """
    pass #FIXME


# Exercise 4
def substitute_base(string: str, old: str, new: str) -> str:
    """
    Replace the occurrences of 'old' character with 'new' character in the input 'string'.

    Parameters:
    - string (str): The input string where replacements will be made.
    - old (str): The character to be replaced. A single character.
    - new (str): The character(s) to replace the 'old' character with.

    Returns:
    - str: The modified string with the replacements made.

    Examples:
    >>> substitute_base("AAGTTAGTCA", "A", "C")
    'CCGTTCGTCC'
    >>> result = substitute_base("12-31-1969", "-", "/")
    >>> result
    '12/31/1969'
    >>> substitute_base("email@example.com", "@", "[at]")
    'email[at]example.com'
    >>> substitute_base("Let's meet at 7 PM.", " ", "_")
    "Let's_meet_at_7_PM."
    """
    pass #FIXME


# Exercise 5
def combine(items: list):
    """
    Combine the items of a list by concatenating strings or summing numbers.

    Parameters:
    - items (list): A list of numbers or strings to be combined.

    Returns:
    - int, float, or str: The combined result of the items.

    Examples:
    >>> nums = [1, 2, 3, 4, 5]
    >>> combine(nums)
    15
    >>> strings = ["hello ", "my ", "name ", "is ", "someone?"]
    >>> combine(strings)
    'hello my name is someone?'
    >>> shopping_lst, prices = ["1.Apples", "2.Bananas", "3.Oranges", "4.Milk"], [2.53, 0.69, 3.34, 3.69]
    >>> (combine(shopping_lst), round(combine(prices), 2)) == ('1.Apples2.Bananas3.Oranges4.Milk', 10.25)
    True
    >>> combine(list(range(0, 11)))
    55
    """
    pass #FIXME


# Exercise 6
def base_freq(sequence) -> dict:
    """
    Calculate the frequency of each base pair in a DNA sequence string.

    Parameters:
    - sequence (str) or (lst): The DNA sequence string or list of entries.

    Returns:
    - dict: A dictionary with the base pair as the key and its frequency as the value.

    Examples:
    >>> base_freq("AAGTTAGTCA") == {"A": 4, "C": 1, "G": 2, "T": 3}
    True
    >>> result = base_freq([4, 4, 4, 5, 5, 5, 2, 2, 1])
    >>> result == {4: 3, 5: 3, 2: 2, 1: 1} #the number 4 appears 3 times
    True
    """
    pass #FIXME
    

# Exercise 7.1
def substitute_chars(string, replacements) -> str:
    """
    Substitute characters in a string based on a dictionary of replacements.

    Parameters:
    - string (str): The original string to be modified.
    - replacements (dict): A dictionary of character replacements.

    Returns:
    - str: The modified string with characters substituted according to the replacements dictionary.
    Examples:
    >>> replacements = {"S":"Z", "E":"U", "T":"P", "A":"M"}
    >>> substitute_chars("SECRET MESSAGE", replacements)
    'ZUCRUP MUZZMGU'
    >>> replacements = {"P": "Pikachu, ", "B": "Bulbasaur, ", "C": "Charmander, ", "S": "Squirtle"}
    >>> result = substitute_chars("I choose you, PBCS!", replacements)
    >>> result
    'I choose you, Pikachu, Bulbasaur, Charmander, Squirtle!'
    """
    pass #FIXME


# Exercise 7.2
def invert_dict(original) -> dict:
    """
    Invert a dictionary, swapping keys and values.

    Parameters:
    - original (dict): The original dictionary to be inverted.

    Returns:
    - dict: The inverted dictionary, where the keys and values of the original dictionary are swapped.

    Examples:
    >>> invert_dict({})
    {}
    >>> result = invert_dict({'apple': 'manzana', 'banana': 'plátano', 'cherry': 'cereza'})
    >>> result == {'manzana': 'apple', 'plátano': 'banana', 'cereza': 'cherry'} 
    True
    >>> invert_dict(result) == {'apple': 'manzana', 'banana': 'plátano', 'cherry': 'cereza'}
    True
    >>> replacements = {"S":"Z", "E":"U", "T":"P", "A":"M"}
    >>> substitute_chars("ZUCRUP MUZZMGU", invert_dict(replacements))
    'SECRET AESSAGE'
    """
    pass #FIXME


## OPTIONAL (not required for credit) ##
def sum_columns(board) -> list:
    """
    Calculate the sum of each column in a given 2D array and return the results as a list.

    Parameters:
    - board (list of lists): A 2D array representing the input matrix.

    Returns:
    - list: A list of sums, where each element at index 'i' represents the sum of column 'i' in the input array.
    Examples:
    >>> board = [
    ... [6, 8, 10, 6],
    ... [5, 9, 9, 2],
    ... [1, 8, 2, 1],
    ... [2, 4, 10, 9]
    ... ]
    >>> result = sum_columns(board)
    >>> result
    [14, 29, 31, 18]
    >>> sum_columns([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
    [12, 15, 18]
    """
    pass #FIXME


## OPTIONAL (not required for credit) ##
def binary_search(numbers, target) -> int:
    """
    Perform binary search on a sorted list of numbers to find the target.

    Parameters:
    - numbers (list): A sorted list of numbers.
    - target (int): The number to search for.

    Returns:
    - int: The index of the target number if found, or -1 if not found.
    >>> arr = [1, 2, 3, 4, 5, 6, 7]
    >>> result = binary_search(arr, 4)
    >>> result 
    3
    >>> nums = [4, 7, 9, 11, 18]
    >>> binary_search(nums, 17) == -1
    True
    >>> binary_search(nums, 4)
    0
    >>> binary_search(nums, 18)
    4
    """
    pass #FIXME

## OPTIONAL (not required for credit) ##
def count_paths(level) -> int:
    """
    Given a level in Super Mario Bros represented as a 2D array,
    write a Python function to count the number of possible paths 
    Mario can take to reach the end of the level. Mario can only
    move right or down in each step and cannot move outside the boundaries of the level.

    Examples:
    >>> level = [
    ... [0, 0, 0, 0],
    ... [0, 0, 1, 0],
    ... [0, 1, 0, 0],
    ... [0, 0, 0, 0]
    ... ]
    >>> count_paths(level)
    2
    >>> level = [
    ... [0, 0, 0],
    ... [1, 0, 0],
    ... [0, 0, 0]
    ... ]
    >>> count_paths(level)
    3
    >>> count_paths([[0 for i in range(4)] for x in range(4)]) == 20
    True
    """
    pass #FIXME


########################################################################
## PART 2: TEXT PROCESSING (Exercises 8-14)
########################################################################

#################
## Part 2 Setup: read_file (code given in workbook) ###
#################
def read_file(filename: str) -> str:
    """Returns the text contained in the file with the given filename.

    Parameters:
        filename (str): The name of the file to be read.

    Returns:
        str: The text content of the file.
    """
    pass

#################
## Exercise 8 ###
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
## Exercise 9 ###
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
## Exercise 10 ###
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
## Exercise 11 ###
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
## Exercise 12 ###
#################
def top_n_words(counts: dict, n: int) -> list:
    """Returns the top n words by count. In the case of a tie, words keep their original order from the dictionary (sorted is stable).

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
## Exercise 13 ###
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


## OPTIONAL (not required for credit) ##
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
## Exercise 14 ###
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


## OPTIONAL (not required for credit) ##
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

## OPTIONAL (not required for credit) ##
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


## OPTIONAL (not required for credit) ##
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

## OPTIONAL (not required for credit) ##
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
