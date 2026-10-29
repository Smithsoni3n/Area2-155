words = ["cat", "apple", "sun", "mountain", "sky"]
long_words = []

for word in words:
    if len(word) > 3:
        long_words.append(word)

print(long_words)