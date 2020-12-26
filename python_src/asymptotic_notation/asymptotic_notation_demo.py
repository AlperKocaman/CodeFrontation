from big_o.big_o import (  # noqa
    big_o,
    infer_big_o_class,
    measure_execution_time,
)
from big_o import complexities  # noqa
from big_o import datagen  # noqa
from big_o import *

def find_max(x):
    """Find the maximum element in a list of positive integers."""
    max_ = 0
    for el in x:
        if el > max_:
            max_ = el
    return max_

def sum_of_list(l):
  total = 0
  for val in l:
    total = total + val
  return total


def merge_sort(arr):
    if len(arr) > 1:
 
         # Finding the mid of the array
        mid = len(arr)//2
 
        # Dividing the array elements
        L = arr[:mid]
 
        # into 2 halves
        R = arr[mid:]
 
        # Sorting the first half
        merge_sort(L)
 
        # Sorting the second half
        merge_sort(R)
 
        i = j = k = 0
 
        # Copy data to temp arrays L[] and R[]
        while i < len(L) and j < len(R):
            if L[i] < R[j]:
                arr[k] = L[i]
                i += 1
            else:
                arr[k] = R[j]
                j += 1
            k += 1
 
        # Checking if any element was left
        while i < len(L):
            arr[k] = L[i]
            i += 1
            k += 1
 
        while j < len(R):
            arr[k] = R[j]
            j += 1
            k += 1
 
def fibonacci(n):
    
    if n<=0:
        print("Incorrect input")
    # First Fibonacci number is 0
    elif n==1:
        return 0
    # Second Fibonacci number is 1
    elif n==2:
        return 1
    else:
        return fibonacci(n-1)+fibonacci(n-2)

def a_quadratic_algo(items):
    for item in items:
        for item2 in items:
            ghost_var = item + item2
            


def print_report(best, others):
    print()
    print("-------------Results-------------")
    print()
    print("Best Result -->")
    print(best)
    print("Other Results -->")
    for other in others:
        print(other)

def find_max_asymptotic_notation():
    print("---------------------------------------")
    print('Asymptotic_Notation for fing max')
    positive_int_generator = lambda n: datagen.integers(n, 0, 10000)
    best, others = big_o(find_max, positive_int_generator, n_repeats=100)
    print_report(best,others)

def sum_of_list_asymptotic_notation():
    print("---------------------------------------")
    print('Asymptotic_Notation for sum_of_list')
    positive_int_generator = lambda n: datagen.integers(n, 0, 10000)
    best, others = big_o(sum_of_list, positive_int_generator, n_repeats=100)
    print_report(best,others)

def merge_sort_asymototic_notation():
    print("---------------------------------------")
    print('Asymptotic_Notation for merge sort')
    positive_int_generator = lambda n: datagen.integers(n, 0, 10000)
    best, others = big_o(merge_sort, positive_int_generator, n_repeats=100)
    print_report(best,others)

def a_quadratic_algo_asymptotic_notation():
    print("---------------------------------------")
    print('Asymptotic_Notation for a_quadratic_algo')
    positive_int_generator = lambda n: datagen.integers(n, 0, 100)
    best, others = big_o(a_quadratic_algo, positive_int_generator, n_repeats=100)
    print_report(best,others)

def fibo_asymptotic_notation():
    print("---------------------------------------")
    print('Asymptotic_Notation for fibonacci')
    positive_int_generator = lambda n: datagen.n_(n)
    best, others = big_o(fibonacci, positive_int_generator, n_repeats=100)
    print_report(best,others)


def main():
    sum_of_list_asymptotic_notation()
    find_max_asymptotic_notation()
    
if __name__ == '__main__':
    main()