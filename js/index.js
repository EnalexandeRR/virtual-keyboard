import props from './binds.js';

let currentLanguage = 'ru';
let currentCaseState = 'caseDown';
const allKeysArray = [];

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
      langSpan.childNodes.forEach((langSpanValue) => {
        if (langSpanValue.classList.contains(currentCaseState)) {
          langSpanValue.classList.remove('hidden');
        } else langSpanValue.classList.add('hidden');
      });
    });
  });
}

function SwitchCaseState(key, isKeydown) {
  if (key === 'Shift' && isKeydown === true) {
    if (currentCaseState === 'caseDown') currentCaseState = 'caseUp';
    else if (currentCaseState === 'caps') currentCaseState = 'shiftCaps';
  }
  if (key === 'Shift' && isKeydown === false) {
    if (currentCaseState === 'caseUp') currentCaseState = 'caseDown';
    else if (currentCaseState === 'shiftCaps') currentCaseState = 'caps';
  }
  if (key === 'CapsLock' && isKeydown === true) {
    if (currentCaseState === 'caseDown') currentCaseState = 'caps';
    else if (currentCaseState === 'caseUp') currentCaseState = 'shiftCaps';
    else if (currentCaseState === 'caps') currentCaseState = 'caseDown';
    else if (currentCaseState === 'shiftCaps') currentCaseState = 'caseUp';
  }
}

function HandleKeyClickEvent(event, isFromRealKeyboard) {
  let keyParent;
  if (isFromRealKeyboard === false) {
    keyParent = event.target.closest('.key');
  } else if (isFromRealKeyboard === true) {
    allKeysArray.forEach((key) => {
      if (key.classList.contains(`${event.code}`)) {
        keyParent = key;
      }
    });
  }
  if (keyParent) {
    keyParent.childNodes.forEach((element) => {
      if (element.classList.contains('hidden') === false) {
        element.childNodes.forEach((span) => {
          if (span.classList.contains('hidden') === false) {
            // TODO: here should be function that prints character in textArea
            console.log(span.textContent);
          }
        });
      }
    });
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift' || event.key === 'CapsLock') {
    SwitchCaseState(event.key, true);
    RedrawKeys();
  }
  if (event.altKey && event.ctrlKey) {
    SwitchLanguage();
    RedrawKeys();
  }
  const btn = document.querySelector(`.${event.code}`);
  if (btn) {
    btn.classList.add('active');
    HandleKeyClickEvent(event, true);
  }
});

document.addEventListener('keyup', (event) => {
  const btn = document.querySelector(`.${event.code}`);
  if (btn) btn.classList.remove('active');

  if (event.key === 'Shift') {
    SwitchCaseState(event.key, false);
    RedrawKeys();
  }
});

keyboardContainer.addEventListener('mousedown', (event) => {
  HandleKeyClickEvent(event, false);
});
