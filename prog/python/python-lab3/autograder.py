import sys
import re
from importlib import import_module
import traceback
import platform
import copy

class color:
    COLOR_PLATFORMS = ['Darwin', 'Linux']
    if platform.system() in COLOR_PLATFORMS:
        OKBLUE = '\033[94m'
        OKGREEN = '\033[92m'
        WARN = '\033[93m'
        FAIL = '\033[91m'
        ENDC = '\033[0m'
    else:
        OKBLUE, OKGREEN, WARN, FAIL, ENDC = '', '', '', '', ''

def anyjoin(lst):
    """ Join the items of lst into a string with each item's __repr__ """
    return ", ".join(map(repr, lst))

def is_pandigital(num):
    digits = split_into_digits(num)
    return len(digits) == len([x for x in range(1, len(digits)+1) if x in digits])

def is_factorion(num):
    return num == sum([factorial(x) for x in split_into_digits(num)])

def is_even(num):
    return (num % 2) == 0

def split_into_digits(num):
    return [int(i) for i in str(num)]

class TestCase:
    def __init__(self, ins=None, out=None):
        self.inputs = ins
        self.output = out
    def run(self, function_ref):
        try:
            result = function_ref(*self.inputs)
        except Exception as e:
            return False, self.format_error_message(traceback.format_exc())
        if result == self.output:
            return True, self.format_success_message()
        else:
            return False, self.format_error_message(repr(result))
    def format_success_message(self):
        return color.OKGREEN + "Passed. " + color.ENDC + "With inputs %s, returned %s." \
                % (anyjoin(self.inputs), repr(self.output))
    def format_error_message(self, got):
        return color.FAIL + "Failed. " + color.ENDC + "With inputs %s, expected %s, instead got:\n %s" \
                % (anyjoin(self.inputs), self.output, got)

class MutableTestCase:
    def __init__(self, ins=None, outs=None, mutable_indices=0):
        if not (isinstance(ins, tuple) and isinstance(outs, tuple)):
            raise ValueError("Inputs and outputs must be listed in tuples.")
        self.inputs = ins
        self.outputs = outs
        if hasattr(mutable_indices, "__iter__"):
            self.mutable_indices = mutable_indices
        else:
            self.mutable_indices = [mutable_indices]
        self.frozen_inputs = anyjoin(self.inputs)
    def run(self, function_ref):
        try:
            mutable_inputs = [self.inputs[i] for i in self.mutable_indices]
            function_ref(*self.inputs)
            passed = tuple(mutable_inputs) == self.outputs
        except Exception as e:
            return False, self.format_error_message(traceback.format_exc())
        if passed:
            return True, self.format_success_message()
        else:
            return False, self.format_error_message(anyjoin(mutable_inputs))
    def format_success_message(self):
        return color.OKGREEN + "Passed. " + color.ENDC + "With inputs: %s; input(s) # %s became %s." \
                % (self.frozen_inputs, anyjoin(self.mutable_indices), anyjoin(self.outputs))
    def format_error_message(self, got):
        return color.FAIL + "Failed. " + color.ENDC + "With inputs: %s; expected input(s) # %s to become %s; instead got:\n %s" \
                % (self.frozen_inputs, anyjoin(self.mutable_indices), anyjoin(self.outputs), got)

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
    # current_module = sys.modules[__name__]

    class Flag:
        def __init__(self, key):
            self.key = key
        def test(self, against):
            return self.key in [against, "all", None]
    flag = Flag(sys.argv[2] if len(sys.argv) > 2 else None)

    if flag.test("1.1"):
        exercise_1_1 = Exercise("exercise 1: Is Factorion", testmodule, "is_factorion")
        exercise_1_1.add_test(TestCase(ins=([145]), out=(True)))
        exercise_1_1.add_test(TestCase(ins=([1]), out=(True)))
        exercise_1_1.add_test(TestCase(ins=([18]), out=(False)))
        exercise_1_1.run_tests()

    if flag.test("1.2"):
        exercise_1_2 = Exercise("exercise 1.2: List All Factorion", testmodule, "list_all_factorions_between")
        exercise_1_2.add_test(TestCase(ins=([1, 150]), out=([1, 2, 145])))
        exercise_1_2.add_test(TestCase(ins=([1, 2]), out=([1, 2])))
        exercise_1_2.run_tests()

    if flag.test("2.1"):
        exercise_2_1 = Exercise("exercise 2.1: Is Panditgital", testmodule, "is_pandigital")
        exercise_2_1.add_test(TestCase(ins=([15432]), out=(True)))
        exercise_2_1.add_test(TestCase(ins=([1]), out=(True)))
        exercise_2_1.add_test(TestCase(ins=([2]), out=(False)))
        exercise_2_1.add_test(TestCase(ins=([11132]), out=(False)))
        exercise_2_1.run_tests()

    if flag.test("2.2"):
        exercise_2_2 = Exercise("exercise 2.2: List All Panditgital", testmodule, "list_all_pandigital_between")
        exercise_2_2.add_test(TestCase(ins=([1, 12]), out=([1, 12])))
        exercise_2_2.add_test(TestCase(ins=([1, 135]), out=([1, 12, 21, 123, 132])))
        exercise_2_2.run_tests()

    if flag.test("3"):
        exercise_3 = Exercise("exercise 2.2: List All Panditgital", testmodule, "list_satisfying_numbers_between")
        exercise_3.add_test(TestCase(ins=([is_pandigital, 1, 12]), out=([1, 12])))
        exercise_3.add_test(TestCase(ins=([is_pandigital, 1, 135]), out=([1, 12, 21, 123, 132])))
        exercise_1_2.add_test(TestCase(ins=([is_factorion, 1, 150]), out=([1, 2, 145])))
        exercise_1_2.add_test(TestCase(ins=([is_factorion, 1, 2]), out=([1, 2])))
        exercise_1_2.add_test(TestCase(ins=([is_even, 1, 4]), out=([2, 4])))
        exercise_1_2.add_test(TestCase(ins=([is_even, 11, 16]), out=([12, 14, 16])))
        exercise_3.run_tests()

if __name__ == "__main__":
    main()
