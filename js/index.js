import props from './binds.js';

const bodyContainer = document.createElement('div');
const header = document.createElement('h1');
const textArea = document.createElement('textarea');
const keyboardContainer = document.createElement('div');

bodyContainer.className = 'body-container';
header.className = 'header';
textArea.className = 'input-text-area';
keyboardContainer.className = 'keyboard-container';

function GenerateKeyboard() {
  Object.keys(props).forEach((rowName) => {
    const row = document.createElement('div');
    row.className = `keyboard-row ${rowName}`;

    Object.keys(props[rowName]).forEach((keyName) => {
      const key = document.createElement('div');
      key.className = `key ${keyName}`;

      Object.keys(props[rowName][keyName]).forEach((language) => {
        // console.log(props[rowName][keyName][language]);
        const langSpan = document.createElement('span');
        langSpan.className = `${language}`;

        Object.keys(props[rowName][keyName][language]).forEach((shiftValue) => {
          const keyValueSpan = document.createElement('span');
          keyValueSpan.className = shiftValue;
          keyValueSpan.textContent = props[rowName][keyName][language][shiftValue];

          langSpan.append(keyValueSpan);
        });

        key.append(langSpan);
      });

      row.append(key);
    });

    keyboardContainer.append(row);
  });
}

GenerateKeyboard();
bodyContainer.append(header, textArea, keyboardContainer);

document.body.append(bodyContainer);
