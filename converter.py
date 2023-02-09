# build a function to transorm a number in binary
def binary(n):
    if n > 1:
        binary(n//2)
    print(n % 2, end = '')
    #build a main function to collect the input and call the binary function and display the result
def main():
    n = int(input("Enter a number: "))
    binary(n)
    print()
    #call the main function 
main()

# After the function display a joke
print("Why did the programmer quit his job?")
print("Because he didn't get arrays.")
