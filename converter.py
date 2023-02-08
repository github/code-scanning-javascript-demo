# build a function to convert numbers to binary
def convertToBinary(n):
   if n > 1:
       convertToBinary(n//2)
   print(n % 2,end = '')
   #build a main function to collect user input and call the convertToBinary function
def main():
    dec = int(input("Enter a decimal number: "))
    convertToBinary(dec)
    print()
    #call the main function 
if __name__ == '__main__':
    main()
    