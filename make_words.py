words_file = open('words.txt')
print("export const WORDS = [")
for word in words_file.read().split('\n'):
    word = word.strip()
    if word.isalpha() and len(word) == 6:
        print('  "%s",' % word.lower())
print("];")