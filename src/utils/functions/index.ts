/**
 * convert a string into array where all words which can be converted to number will be converted otherwise it will and a null
 * @param text string to be converted into array
 * @returns array of numbers or nulls
 */
export const stringToArray = (text: string): Array<number | null> => {
  text.trim();
  const wordsArr = text.match(/\b(\w+)\b/g);
  const resultArray: Array<number | null> = [];
  wordsArr?.map((word) => {
    if (
      isNaN(+word) &&
      (word.toLowerCase() === "null" || word.toLowerCase() === "n")
    ) {
      resultArray.push(null);
    } else {
      if (!isNaN(+word)) {
        resultArray.push(+word);
      }
    }
  });
  return resultArray;
};

/**
 * concat strings of codes into a single string
 * @param array array of strings of a code
 * @returns single string containing all code fragment
 */
export const getCodeFromArray = (array: Array<string>): string => {
  let resultString = "";
  array.forEach((data) => {
    resultString += " " + data + " ";
  });
  return resultString;
};
