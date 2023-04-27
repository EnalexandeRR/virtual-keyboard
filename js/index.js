import props from './binds.js';

let currentLanguage = 'ru';
let currentCaseState = 'caseDown';
let allKeysArray = [];

const bodyContainer = document.createElement('div');
const header = document.createElement('h1');
const textArea = document.createElement('textarea');
const keyboardContainer = document.createElement('div');

bodyContainer.className = 'body-container';
header.className = 'header';
textArea.className = 'input-text-area';
keyboardContainer.className = 'keyboard-container';

function SwitchLanguage() {
  if (currentLanguage === 'ru') currentLanguage = 'en';
  else currentLanguage = 'ru';
}

function GenerateKeyboard() {
  // GENERATE ROWS
  Object.keys(props).forEach((rowName) => {
    const row = document.createElement('div');
    row.className = `keyboard-row ${rowName}`;

    // GENERATE KEYS
    Object.keys(props[rowName]).forEach((keyName) => {
      const key = document.createElement('div');
      key.className = `key ${keyName}`;

      // FOR EACH LANGUAGE =>
      Object.keys(props[rowName][keyName]).forEach((language) => {
        const langSpan = document.createElement('span');
        langSpan.className = `${language}`;
        if (language !== currentLanguage) langSpan.classList.add('hidden');

        // GENERATE KEY VALUES
        Object.keys(props[rowName][keyName][language]).forEach((caseValue) => {
          const keyValueSpan = document.createElement('span');
          keyValueSpan.className = caseValue;
          keyValueSpan.textContent = props[rowName][keyName][language][caseValue];
          if (caseValue !== currentCaseState) keyValueSpan.classList.add('hidden');
          langSpan.append(keyValueSpan);
        });

        key.append(langSpan);
      });
      allKeysArray.push(key);
      row.append(key);
    });

    keyboardContainer.append(row);
  });
}

GenerateKeyboard();
bodyContainer.append(header, textArea, keyboardContainer);
document.body.append(bodyContainer);

function RedrawKeys() {
  allKeysArray.forEach((key) => {
    key.childNodes.forEach((langSpan) => {
      langSpan.classList.contains(currentLanguage);
      if (langSpan.classList.contains(currentLanguage)) {
        langSpan.classList.remove('hidden');
      } else langSpan.classList.add('hidden');

      console.log();
    });
  });
}

document.addEventListener('keydown', (event) => {
  if (event.shiftKey) {
    currentCaseState = 'caseUp';
    SwitchLanguage();
    RedrawKeys();
  }
});
