words_file = open('wordlist.txt')
print("export const VALIDGUESSES6 = [")
for word in words_file.read().split('\n'):
    word = word.strip()
    if word.isalpha() and len(word) == 6:
        print('  "%s",' % word.lower())
print("];")