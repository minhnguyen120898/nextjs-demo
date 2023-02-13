import { Buffer } from 'buffer';

const encodeBase64 = (data: string) => Buffer.from(data).toString('base64');
const decodeBase64 = (data: string) => Buffer.from(data, 'base64').toString();

const getBaseString = (content: string) => content.slice(0, -8);
const setBaseInfor = (baseContent: string, baseSecret: string, secretKey: string) => {
  const LENGTH_BASE_CONTENT = 64;
  if (!secretKey) {
    return { baseContent, baseSecret };
  }
  const length = secretKey.length;
  const indexStart = length - LENGTH_BASE_CONTENT;
  return {
    baseContent: secretKey.substring(indexStart + 2, length - 1),
    baseSecret: secretKey.substring(1, indexStart),
  };
};
const isNumber = (index: number) => (index >= 48 && index <= 57);
const isLetter = (index: number) => ((index >= 65 && index <= 90) || (index >= 97 && index <= 122));
const getRandomInt = (max: number) => Math.floor(Math.random() * Math.floor(max));

export const encode = (content: string) => {
  const { baseContent, baseSecret } = setBaseInfor("", "", process.env.clientKey || "");
  let newContent = 'E';
  const baseString = getBaseString(baseSecret);
  const baseNumber = baseString;
  let character;
  let characterBaseString;
  let characterBaseNumber;
  let indexContent = 0;
  let indexBase = 0;
  let indexNumber = 0;
  let number;
  let mod;
  let div;
  const lengthContent = content.length;
  const lengthBaseString = baseString.length;
  const lengthNumber = baseNumber.length;
  const lengthBaseContent = baseContent.length;

  let numberRandom;
  let numberInsert;
  let minPosition;
  let symbolRandom;
  let count = 0;

  numberRandom = 97 + getRandomInt(25);
  numberInsert = 65 + getRandomInt(25);
  symbolRandom = String.fromCharCode(numberRandom) + String.fromCharCode(numberInsert);
  numberRandom = 1 + getRandomInt(9);
  minPosition = Math.min(lengthContent, 20);
  numberInsert = Math.floor(getRandomInt(minPosition) / 2);
  while (indexContent < lengthContent) {
    character = content.charCodeAt(indexContent);
    if (character >= 32 && character <= 126) {
      characterBaseString = baseString.charCodeAt(indexBase);
      characterBaseNumber = baseNumber.charCodeAt(indexNumber);
      number = character + characterBaseString + characterBaseNumber + numberRandom;
      mod = number % lengthBaseContent;
      div = Math.floor(number / lengthBaseContent);
      newContent += div + baseContent.charAt(mod);
      if (count == numberInsert)
        newContent += symbolRandom + numberRandom.toString();
      count++;
    } else {
      newContent += String.fromCharCode(character);
    }
    indexContent++;
    indexBase = (indexBase + 1) % lengthBaseString;
    indexNumber = (indexNumber + 1) % lengthNumber;
  }
  if (content !== decode(newContent)) {
    throw Error("There was an error! Please contact administrator!!!");
  }
  return newContent;
}

export const decode = (content: string) => {
  const { baseContent, baseSecret } = setBaseInfor("", "", process.env.clientKey || "");
  let newContent = '';
  const baseString = getBaseString(baseSecret);
  const baseNumber = baseString;
  let character;
  let characterBaseString;
  let characterBaseNumber;
  let indexContent = 1;
  let indexBase = 0;
  let indexNumber = 0;
  let number;
  let mod;
  let div;
  const lengthContent = content.length;
  const lengthBaseString = baseString.length;
  const lengthNumber = baseNumber.length;
  const lengthBaseContent = baseContent.length;
  let numberRandom = 0;
  let countLetter = 0;
  let indexRandom = 0;
  let isFindRandom = false;

  while (indexContent < lengthContent) {
    div = 0;
    character = content.charCodeAt(indexContent);
    if (!isFindRandom) {
      indexContent++;
      if (isLetter(character)) {
        countLetter++;
        if (countLetter >= 2 && indexContent < lengthContent && isNumber(content.charCodeAt(indexContent))) {
          numberRandom = content.charCodeAt(indexContent) - 48;
          indexRandom = indexContent - 2;
          indexContent = 1;
          isFindRandom = true;
        }
      } else {
        countLetter = 0;
      }
      continue;
    } else if (indexContent >= indexRandom && indexContent <= indexRandom + 2) {
      indexContent++;
      continue;
    }

    if (isNumber(character)) {
      div = character - 48;
      indexContent++;
      character = content.charCodeAt(indexContent);
    }

    mod = baseContent.indexOf(String.fromCharCode(character));

    if (mod >= 0) {
      number = div * lengthBaseContent + mod;
      characterBaseString = baseString.charCodeAt(indexBase);
      characterBaseNumber = baseNumber.charCodeAt(indexNumber);
      character = (number - characterBaseString - characterBaseNumber - numberRandom);
    }

    newContent += String.fromCharCode(character);
    indexContent++;
    indexBase = (indexBase + 1) % lengthBaseString;
    indexNumber = (indexNumber + 1) % lengthNumber;
  }

  return newContent;
}