"use strict";
const bodyContainer = document.createElement("div");
const header = document.createElement("h1");
const textArea = document.createElement("textarea");
const keyboardContainer = document.createElement("div");

bodyContainer.className = "body-container";
header.className = "header";
textArea.className = "input-text-area";
keyboardContainer.className = "keyboard-container";

bodyContainer.append(header, textArea, keyboardContainer);

document.body.append(bodyContainer);
