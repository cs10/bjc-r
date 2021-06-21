import timeit

#Function to add all numbers from 1 to N (Gauss method)
def non_gauss_add(lst):
    'YOUR CODE HERE'


#Function to add all numbers from 1 to N (Gauss method)
def gauss_add(lst):
    'YOUR CODE HERE'


#Experiment with runtimes here:
def runtime(fn):
    start = timeit.default_timer()
    fn
    print('The sum took', int((timeit.default_timer() - start) * 1000000), 'ms.')


n = 40000  # Change this global variable
numbers = list(range(1, n+1))


#Function to determine if numbers in lst is distinct
def are_distinct(lst):
    'YOUR CODE HERE'



