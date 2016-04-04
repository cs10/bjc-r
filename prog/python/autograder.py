import sys
import re
from importlib import import_module
import traceback

class color:
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARN = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'

class TestCase:
    def __init__(self, inputs, output):
        self.inputs = inputs
        self.output = output
    def run(self, function_ref):
        try:
            result = function_ref(*self.inputs)
        except Exception as e:
            return False, self.format_error_message(traceback.format_exc())
        if result == self.output:
            return True, self.format_success_message()
        else:
            return False, self.format_error_message(result)
    def format_success_message(self):
        return color.OKGREEN + "Passed. " + color.ENDC + "With inputs %s, returned %s." % (self.inputs, self.output)
    def format_error_message(self, got):
        return color.FAIL + "Failed. " + color.ENDC + "With inputs %s, expected %s, instead got:\n %s" % (self.inputs, self.output, got)

class Exercise:
    def __init__(self, name, module, func_name):
        self.module = module
        self.func_name = func_name
        self.name = name
        self.tests = []
    def add_test(self, test_case):
        self.tests.append(test_case)
    def run_tests(self):
        print("Running tests for %s\n=============" % self.name)
        try:
            func = getattr(self.module, self.func_name)
        except AttributeError:
            print(color.WARN + "Fail: " + color.ENDC + "no function named '%s' exists\n" % self.func_name)
            return
        results = []
        for i in range(len(self.tests)):
            result, message = self.do_test(i, func)
            print(message)
            results.append(result)
        success_rate = sum(results)/len(results)
        if success_rate == 1:
            print("You passed all of the tests!\n")
        else:
            print("You passed %s/%s tests.\n" % (sum(results), len(results)))
    def do_test(self, test_index, function_ref):
        result, message = self.tests[test_index].run(function_ref)
        return result, message

def import_file_or_fail(filename):
    modulename = re.sub(r"\.py$", "", filename)
    try:
        return __import__(modulename, globals(), locals(), ['*'])
    except ImportError:
        print("Error: could not find file %s" % filename)
        exit()

def main():
    try:
        filename = sys.argv[1]
    except IndexError:
        print("Error: please provide a file to be tested.")
        exit()
    testmodule = import_file_or_fail(filename)

    exercise_1 = Exercise("exercise 1: Exponent", testmodule, "exponent")
    exercise_1.add_test(TestCase((2, 3), 8))
    exercise_1.add_test(TestCase((5, 0), 1))
    exercise_1.add_test(TestCase((10, 2), 100))
    exercise_1.run_tests()

    exercise_2 = Exercise("exercise 2: Reverse String", testmodule, "reverse_string")
    exercise_2.add_test(TestCase(["alonzo"], "oznola"))
    exercise_2.add_test(TestCase(["racecar"], "racecar"))
    exercise_2.add_test(TestCase(["google"], "elgoog"))
    exercise_2.run_tests()

    exercise_3 = Exercise("exercise 3: Palindrome", testmodule, "palindrome")
    exercise_3.add_test(TestCase(["alonzo"], False))
    exercise_3.add_test(TestCase(["racecar"], True))
    exercise_3.add_test(TestCase(["google"], False))
    exercise_3.run_tests()

if __name__ == "__main__":
    main()
