"""
Created by Omoju Miller
Depends on nltk
"""

import nltk
## define a class for Indexing a text using a stemmer

class IndexedText(object):
    def __init__(self, stemmer, text):
        self._text = text
        self._stemmer = stemmer
        self._index = nltk.Index((self._stem(word), i) for (i, word) in enumerate(text))

    def concordance(self, word, width=40):
        key = self._stem(word)
        wc = width / 4            # words of context
        for i in self._index[key]:
            lcontext = ' '.join(self._text[i - wc:i])
            rcontext = ' '.join(self._text[i:i + wc])
            ldisplay = '%*s' % (width, lcontext[-width:])
            rdisplay = '%*s' % (width, rcontext[:width])
            print ldisplay, rdisplay

    def _stem(self, word):
        return self._stemmer.stem(word).lower()


    def newconc(self, word, width=20):
        """ This is a thing I created to extend nltk

        :param word: the word we are searching in the index
        :param width: the length of a context words around it
        """
        key = self._stem(word)
        wc = width / 2            # words of context
        window = 1
        s = ''
        for i in self._index[key]:
            lcontext = ' '.join(self._text[i - wc:i])
            rcontext = ' '.join(self._text[i:i + wc])
            ldisplay = '%*s' % (width, lcontext[-width:])
            rdisplay = '%*s' % (width, rcontext[:width])
            window = window + 1
            print ldisplay, rdisplay
            if window % 10 == 0:
                s = raw_input('\n******Next 10 enter next or to stop enter quit--> \n')
            if s == 'quit':
                break
            if s == 'next':
                continue
                lcontext = ' '.join(self._text[i - wc:i])
                rcontext = ' '.join(self._text[i:i + wc])
                ldisplay = '%*s' % (width, lcontext[-width:])
                rdisplay = '%*s' % (width, rcontext[:width])
                window = window + 1
                print ldisplay, rdisplay

