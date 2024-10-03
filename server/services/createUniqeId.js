function createUniqueWord(word1, word2) {
  // Sort the words alphabetically
  const sortedWords = [word1, word2].sort();

  // Concatenate the sorted words
  const uniqueWord = sortedWords.join("-"); // Use a separator like '-' to combine them

  return uniqueWord;
}
module.exports = createUniqueWord;
