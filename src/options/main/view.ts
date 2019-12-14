import * as storage from '../../shared/storage';
import {IElementIdentierSetting, IElementIdentifier} from '../../shared/types';
import * as utils from './utils';

const ELEMENT_HIDER_LIST_TBODY_ID = 'element-hider-list-body';

const ELEMENT_HIDER_LIST_TBODY =
    document.getElementById(ELEMENT_HIDER_LIST_TBODY_ID)!;

export function addElementIdentifierSettingItem(
    item = {} as IElementIdentierSetting) {
  ELEMENT_HIDER_LIST_TBODY.appendChild(
      createElementIdentifierSettingItem(item));
}

export function createElementIdentifierInputCell(
    inputClassName = '', inputType = 'text', value?: string) {
  const inputCell = document.createElement('td');
  inputCell.className = 'element-hider-list-input-cell';

  const input = document.createElement('input');
  input.className = inputClassName;
  input.type = inputType;

  if (value) {
    input.value = value;
  }

  inputCell.appendChild(input);
  return {inputCell, input};
}

export function createElementHiderListButtonCell() {
  const buttonCell = document.createElement('td');
  buttonCell.className = 'element-hider-list-button-cell';

  const button = document.createElement('button');
  button.className = 'element-hider-list-button';
  buttonCell.appendChild(button);

  const buttonText = document.createElement('span');
  buttonText.className = 'element-hider-list-button-text';
  buttonText.innerText = '+';
  button.appendChild(buttonText);

  return {buttonCell, button, buttonText};
}

export function createElementIdentifierSettingItem(
    setting = {} as IElementIdentierSetting): HTMLTableRowElement {
  const identifier = setting.identifier || {} as IElementIdentifier;

  const itemRow = document.createElement('tr');
  itemRow.className = 'element-hider-list-row';

  const {inputCell: domainCell, input: urlPrefixInput} =
      createElementIdentifierInputCell(
          'element-hider-item-domain', 'input', identifier.urlPrefix);
  const {inputCell: selectorCell, input: selectorInput} =
      createElementIdentifierInputCell(
          'element-hider-item-selector', 'input', identifier.selector);

  const regexpSting = identifier.regExpSrc;
  // tslint:disable-next-line: no-console
  console.log('identifier', identifier);
  // tslint:disable-next-line: no-console
  console.log('identifier.regexp', identifier.regExpSrc);
  // tslint:disable-next-line: no-console
  console.log('regexpSting', regexpSting);
  const {inputCell: regexpCell, input: regexpInput} =
      createElementIdentifierInputCell(
          'element-hider-item-regexp', 'input', regexpSting);
  const {inputCell: activeCell, input: activeCheckbox} =
      createElementIdentifierInputCell('element-hider-item-regexp', 'checkbox');
  activeCheckbox.checked = setting.active !== false;

  const {buttonCell, button, buttonText} = createElementHiderListButtonCell();

  itemRow.appendChild(domainCell);
  itemRow.appendChild(selectorCell);
  itemRow.appendChild(regexpCell);
  itemRow.appendChild(activeCell);
  itemRow.appendChild(buttonCell);

  const toggleActiveHandler = (event: Event) => {
    const urlPrefix = urlPrefixInput.value;
    const selector = selectorInput.value;
    const regexp = regexpInput.value;
    const checked = activeCheckbox.checked;

    // storage.toggleSettingActive({urlPrefix, selector, regexp}, checked);
  };
  activeCheckbox.addEventListener('changed', toggleActiveHandler);

  const removeItemHandler = (event: Event) => {
    const urlPrefix = urlPrefixInput.value;
    const selector = selectorInput.value;
    const regexp = regexpInput.value;

    storage.removeElementHiderItemFromSettings(
        {urlPrefix, selector, regExpSrc: regexp});

    button.removeEventListener('click', removeItemHandler);
    itemRow.parentElement!.removeChild(itemRow);
  };

  const addItemHandler = (event: Event) => {
    const urlPrefix = urlPrefixInput.value;
    const selector = selectorInput.value;
    const regexp = regexpInput.value;
    const active = activeCheckbox.checked;

    storage.addElementHiderItemToSettings(
        {identifier: {urlPrefix, selector, regExpSrc: regexp}, active});

    button.removeEventListener('click', addItemHandler);
    button.addEventListener('click', removeItemHandler);

    urlPrefixInput.disabled = true;
    selectorInput.disabled = true;
    regexpInput.disabled = true;
    buttonText.innerText = '-';

    addElementIdentifierSettingItem();
  };

  if (utils.isSettingValid(identifier)) {
    urlPrefixInput.disabled = true;
    selectorInput.disabled = true;
    regexpInput.disabled = true;
    buttonText.innerText = '-';
    button.addEventListener('click', removeItemHandler);
  } else {
    button.disabled = true;
    itemRow.addEventListener('input', (event: Event) => {
      const urlPrefix = urlPrefixInput.value;
      const selector = selectorInput.value;
      button.disabled = !utils.isSettingValid({urlPrefix, selector});
    });

    button.addEventListener('click', addItemHandler);
  }

  return itemRow;
}

export function showElementHiderList(
    elementIdentifierSettings: IElementIdentierSetting[]) {
  while (ELEMENT_HIDER_LIST_TBODY.firstChild) {
    ELEMENT_HIDER_LIST_TBODY.removeChild(ELEMENT_HIDER_LIST_TBODY.firstChild);
  }

  for (const item of elementIdentifierSettings) {
    addElementIdentifierSettingItem(item);
  }

  addElementIdentifierSettingItem();
}
