#1. Reverse a String
def reverse(s):
    return s[::-1]

text = "Hello World"
print(reverse(text))

#2. Palindrome
def palindrome(s):
    return s == s[::-1]

s = input("Enter string: ")
print(palindrome(s))

#3. Largest Number
def largest(a, b, c):
    return max(a, b, c)

print(largest(10, 25, 15))

#4. Remove Duplicates
def remove_duplicates(a):
    return list(set(a))
print(remove_duplicates([1,2,2,3,3,4]))

#5. Missing Number
def missing(a, n):
    return n*(n+1)//2 - sum(a)
print(missing([1,2,3,5], 5))

#6. Character Frequency
def frequency(s):
    return {x: s.count(x) for x in set(s)}
print(frequency("hello"))

#7. first non-repeating character
def first_non_repeat(s):
    for x in s:
        if s.count(x) == 1:
            return x
print(first_non_repeat("swiss"))

#8. merge sorted arrays
def merge(a, b):
    return sorted(a + b)
print(merge([1, 3, 5], [2, 4, 6]))

#9. Common Elements
def common(a, b):
    return list(set(a) & set(b))
print(common([1,2,3], [2,3,4]))

#10. Stack
def stack():
    a = [10,20,30]
    a.pop()
    return a
print(stack())

#11. Queue
def queue():
    a = [10,20,30]
    a.pop(0)
    return a
print(queue())

#12. Max subarray sums
def max_sum(a):
    current = total = a[0]
    for x in a[1:]:
        current = max(x, current + x)
        total = max(total, current)
    return total
print(max_sum([-2, 1, -3, 4, -1, 2, 1, -5]))

#13 sort_without_builtin
def sort(a):
    for i in range(len(a)):
        for j in range(i + 1, len(a)):
            if a[i] > a[j]:
                a[i], a[j] = a[j], a[i]
    return a
print(sort([5, 2, 8, 1, 3]))

#14. count vowels
def vowels(s):
    return sum(1 for x in s if x in "aeiou")
print(vowels("hello world"))

#15.Factorial
def factorial(n):
    result = 1
    for i in range(1, n + 1):
        result *= i
    return result
print(factorial(5))