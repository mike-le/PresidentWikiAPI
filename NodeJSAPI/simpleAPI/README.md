Description:
The solution is designed as a simple Express/Node API utilizing multiple Tries to efficiently store data for multiple fields and optimize prefix lookups. There is a separate Trie for the fields brandName, categoryName, titleName in order to provide quick access to product data for the three endpoints. In addition, a fourth Trie was used to process each individual word in all titles in order to adequately process data for the third endpoint ('api/products/keywords'). 

Time/Space Complexity Analysis:
By preprocessing the product data into a Map and multiple Tries, the runtime complexity of each endpoint is reduced to O(N*M), where n = character count and m = average length of each word. Since the product data is converted into a map, the size of the Tries are neglible and the space complexity would be the size of the map.  However, this could be inefficient since in-memory capacity could be limited. A possible solution to improve space considations is to include a cache to store only a set amount of product data that is used most frequently. The cache would continue to update and if the necessary data is not stored there, the server would read from the source file (if it was not stored locally, otherwise this would not be an issue).

simpleAPI Execution:
- Reads command line arguments for file path
- Reads from file and creates a "HashMap" of all product data
- For each product, add data to each respective Trie
- Server intiates after these steps are completed

Steps to run simpleAPI:
- Navigate to the simpleAPI directory in Terminal/Command Prompt
- Run 'npm install' to install necessary modules
- Run 'node index.js $filepath' replacing $filepath with the intended data source.
- Allow simpleAPI to preprocess data before the server starts

