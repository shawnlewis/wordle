words_file = open('count_1w.txt')

valid = set((s.strip() for s in open('words.txt').read().split('\n')))

print("export const WORDS = [")
count = 0
for word in words_file.read().split('\n'):
    word = word.strip().split()[0]
    if word in valid and word.isalpha() and len(word) == 6:
        print('  "%s",' % word.lower())
        count += 1
    if count > 2500:
        break
print("];")
