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

function createUpdateActiveHandler(
    urlPrefixInput: HTMLInputElement, selectorInput: HTMLInputElement,
    regExpSrcInput: HTMLInputElement, activeCheckbox: HTMLInputElement) {
  return () => {
    const urlPrefix = urlPrefixInput.value;
    const selector = selectorInput.value;
    const regExpSrc = regExpSrcInput.value;
    const checked = activeCheckbox.checked;

    const oldIdentifier = {
      regExpSrc,
      selector,
      urlPrefix,
    };
    const newSetting = {
      active: checked,
      identifier: oldIdentifier,
    };

    storage.updateElementHiderItemToSettings(newSetting, newSetting);
  };
}

function createRemoveItemHandler(
    urlPrefixInput: HTMLInputElement, selectorInput: HTMLInputElement,
    regExpSrcInput: HTMLInputElement, activeCheckbox: HTMLInputElement,
    button: HTMLButtonElement, itemRow: HTMLTableRowElement) {
  const handler = () => {
    const urlPrefix = urlPrefixInput.value;
    const selector = selectorInput.value;
    const regExpSrc = regExpSrcInput.value;

    storage.removeElementHiderItemFromSettings(
        {urlPrefix, selector, regExpSrc});

    button.removeEventListener('click', handler);
    itemRow.parentElement!.removeChild(itemRow);
  };

  return handler;
}

function createAddItemHandler(
    urlPrefixInput: HTMLInputElement, selectorInput: HTMLInputElement,
    regExpSrcInput: HTMLInputElement, activeCheckbox: HTMLInputElement,
    button: HTMLButtonElement, buttonText: HTMLElement,
    itemRow: HTMLTableRowElement, removeItemHandler: () => void) {
  const handle = () => {
    const urlPrefix = urlPrefixInput.value;
    const selector = selectorInput.value;
    const regExpSrc = regExpSrcInput.value;
    const active = activeCheckbox.checked;

    storage.addElementHiderItemToSettings(
        {identifier: {urlPrefix, selector, regExpSrc}, active});

    button.removeEventListener('click', handle);
    button.addEventListener('click', removeItemHandler);

    urlPrefixInput.disabled = true;
    selectorInput.disabled = true;
    regExpSrcInput.disabled = true;
    buttonText.innerText = '-';

    addElementIdentifierSettingItem();
  };
  return handle;
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

  const {inputCell: regExpSrcCell, input: regExpSrcInput} =
      createElementIdentifierInputCell(
          'element-hider-item-regexp', 'input', identifier.regExpSrc);

  const {inputCell: activeCell, input: activeCheckbox} =
      createElementIdentifierInputCell('element-hider-item-regexp', 'checkbox');
  activeCheckbox.checked = setting.active !== false;
  activeCheckbox.addEventListener(
      'change',
      createUpdateActiveHandler(
          urlPrefixInput, selectorInput, regExpSrcInput, activeCheckbox));

  const {buttonCell, button, buttonText} = createElementHiderListButtonCell();

  itemRow.appendChild(domainCell);
  itemRow.appendChild(selectorCell);
  itemRow.appendChild(regExpSrcCell);
  itemRow.appendChild(activeCell);
  itemRow.appendChild(buttonCell);

  const removeItemHandler = createRemoveItemHandler(
      urlPrefixInput, selectorInput, regExpSrcInput, activeCheckbox, button,
      itemRow);

  const addItemHandler = createAddItemHandler(
      urlPrefixInput, selectorInput, regExpSrcInput, activeCheckbox, button,
      buttonText, itemRow, removeItemHandler);

  if (utils.isSettingValid(identifier)) {
    urlPrefixInput.disabled = true;
    selectorInput.disabled = true;
    regExpSrcInput.disabled = true;
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
