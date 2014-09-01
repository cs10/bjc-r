# Lab Solutions & BJC Coding Style

This guide will serve as a reference for authoring lab solutions and for other Snap<i>!</i> code used in labs. Remember, that these are _guidelines_. If you have good judgement as to why "breaking" one of these is better for __students__, then follow that logic.

1. Keep to 1 solution file per "exercise".
    Most labs will have a few exercises in them, which means a few separate solution files per lab. An exercise may be more than one question if those questions are related to each other. The reason is that we might change only 1 exercise in a lab, or use the same problem in multiple labs.
2. Avoid referring to labs by number!
    Use the __title__ of each lab as the reference to a topic. The ordering of labs can often change, so avoiding numbers will help everyone's sanity in the future.
3. Comment on your code.
    Not everything needs a comment, but it is often helpful to explain "why" and "how" decisions were made. Solutions are meant to be a learning tool so it's definitely good to explain concepts to students. You should especially use comments when a piece of code seems complicated or a little advanced, or if it's a solution for a newly introduced concept.
4. Don't use concepts which haven't been taught.
    For example, you shouldn't use recursion if a student hasn't learned recursion yet.
5. There's often more than 1 solution.
    It's perfectly OK to show two correct solutions to the same problem. If you do, be sure to explain why they are both correct or what the trade-offs might be. A good example is the solution to the function `fibonnaci(n)` that can be written both iteratively and recursively. Though the iterative solution is conceptually more complex, it is a useful learning tool, and very practical example (given the speed performance).
6. Follow Good Coding Style
      * Use explicit variable names
      * Prefer script variables, to global ones
      * Follow the DRY Rule: Don't Repeat Yourself
      * Use abstraction! (You learned that on day one.)
      * As an example:

      ```python
      if (condition):
          report True
      else:
         report False
      ```
    should be simply `report condition`


***

#### Resources For Good Style
These aren't Snap<i>!</i> or BJC specific, but the principles are good.
##### _The Zen of Python_
obtained by typing `import this` in a Python interpreter.
```
>>> import this
The Zen of Python, by Tim Peters

Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```

#### [Paul Hilfinger's style guide](https://inst.eecs.berkeley.edu/~cs61b/fa13/labs/style61b.txt)
Keep in mind, these are for Java, so most will not apply, but most of the recommendations are solid.
