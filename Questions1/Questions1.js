function findLongestSubstring(str) {
    const myMap = new Map();
    let start = 0;
    let maxLength = 0;
    let max_substring = "";
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        if (myMap.has(char) && myMap.get(char) >= start) {
            start = myMap.get(char) + 1;
        }
        myMap.set(char, i);
        const currentLength = i - start +1;
        if(currentLength > maxLength){
            maxLength = currentLength;
            max_substring = str.slice(start, i+1);
        }
    }
    return {
        length: maxLength,
        substring: max_substring
    };
}

const str = findLongestSubstring("pwwkew");
console.log(str);
