function Node(data) {
    this.data = data;
    this.isWord = false;
    this.children = {};
    this.count = 0;
}

class Trie { 
    constructor() {
        this.root = new Node('');
    }

    // Inserts a word into the trie at O(k)
    add(word) {
        if(!this.root || !word) {
            return null;
        }

        let node = this.root;

        for(let i=0; i<word.length; i++){
            let letter = word.charAt(i);
            let child = node.children[letter];
            if(!child) {
                child = new Node(letter);
                node.children[letter] = child;
            }
            node = child;
        }

        node.isWord = true;
        node.count += 1;
    };

    // Returns all words with prefix
    getPrefix(prefix) {
        let node = this.root;
        let res = [];
        
        if(!prefix) {
            return false;
        }

        for(let i=0; i < prefix.length; i++) {
            let letter = prefix.charAt(i);
            let child = node.children[letter];
            if(child) {
                node = child;
            } else {
                return res;
            }
        }
        
        if(node.isWord){
            res.push(prefix)
        }

        this.getWords(node, prefix, res);

        return res;
    };

    // Returns all valid words below passed in node
    getWords(node, word, res){
        if(!node || !word) {
            return res;
        }

        for(var child in node.children) {
            word += child;
            if (node.children[child].isWord) {
                res.push(word);
            }
            this.getWords(node.children[child], word, res);
            word = word.substring(0, word.length - 1);
        }

        return res;
    }

    // Returns count of word if it exists
    getCount(word) {
        if(!this.root || !word) {
            return null;
        }

        let node = this.root;
        let count = 0;

        for(let i=0; i < word.length; i++) {
            let letter = word.charAt(i);
            let child = node.children[letter];
            if(child) {
                node = child;
            } else {
                return count;
            }
        }

        if(node.isWord){
            return node.count;
        }
    }
}

module.exports = Trie;