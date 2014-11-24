
import nltk


from nltk.corpus import PlaintextCorpusReader
corpus_root = 'JayZ'
wordlist = PlaintextCorpusReader(corpus_root, '.*')

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

Albums = wordlist.fileids()
basket_ball_bag_of_words = ['bounce','crossover','techncal',
 'shooting','double','jump','goal','backdoor','chest','ball',
 'team','block','throw','offensive','point','airball','pick',
 'assist','shot','layup','break','dribble','roll','cut','forward',
 'move','zone','three-pointer','free','post','fast','blocking','backcourt',
 'violation','foul','field','pass','turnover','alley-oop','guard']

cfd = nltk.ConditionalFreqDist(
          (target, fileid[5:])
           for fileid in Albums[:14]
           for w in wordlist.words(fileid)
           for target in basket_ball_bag_of_words
          if w.lower().startswith(target))
 
cfd.plot()


"""
This section deals with the creation of a concordance, so we can investigate the sense in which a word is being used.
For example, we see that the word "roll" seems to be prevelant in the song "Party Life." Remember we started this
investigation to see if Jay Z uses a lot of basket ball concepts in his lyrics. In order to accurately determine
if "roll" was used in the basketball sense, we need to see the context in which it was used.
A concordance gives us access to context.

Depends on Index.py
 """

import Index

AmericanGangster_wordlist = PlaintextCorpusReader(corpus_root, 'JayZ_American Gangster_.*') 
AmericanGangster_corpus = create_corpus(AmericanGangster_wordlist, [])


"""
In order to create a concordance, we need to stem the words. In linguistics, this is known as lemmatization.
"""
porter = nltk.PorterStemmer()
AmericanGangster_lyrics = IndexedText(porter, AmericanGangster_corpus)
AmericanGangster_lyrics.concordance('roll')