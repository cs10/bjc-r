
import nltk


from nltk.corpus import PlaintextCorpusReader
corpus_root = 'JayZ'
wordlist = PlaintextCorpusReader(corpus_root, '.*')
kjv = nltk.corpus.gutenberg.words('bible-kjv.txt') # This is how you access the gutenberg corpus

import re

"""
This function takes in an object of the type PlaintextCorpusReader, and system path.
It returns an nltk corpus

It requires the regular expression package re to work
"""

def create_corpus(wordlist, some_corpus): #process the files so I know what was read in
    for fileid in wordlist.fileids():
        raw = wordlist.raw(fileid)
        raw = re.split(r'\W+', raw) ## split the raw text into appropriate words 
        some_corpus.extend(raw)
        print fileid

    return some_corpus


"""
The function for calculating lexical diversity
"""
def lexical_diversity(my_text_data):
  word_count = len(my_text_data)
  vocab_size = len(set(my_text_data))
  diversity_score = word_count / vocab_size
  return diversity_score

"""
Exercise, you may want to use the python funciton set.
"""
def NumberOfUniqueWords(SomeCorpus):
  return "%SOmeNumber%"