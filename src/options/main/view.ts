// import * as storage from '../../shared/storage';
import {Storage} from '../../shared/storage';
import {IElementIdentierSetting, IElementIdentifier} from '../../shared/types';
import * as utils from './utils';

export const ELEMENT_HIDER_LIST_TBODY_ID = 'element-hider-list-body';
export const ELEMENT_HIDER_LIST_ROW_CLASS = 'element-hider-list-row';
export const ELEMENT_HIDER_LIST_URL_PREFIX_CLASS = 'element-hider-item-domain';
export const ELEMENT_HIDER_LIST_SELECTOR_CLASS = 'element-hider-item-selector';
export const ELEMENT_HIDER_LIST_REG_EXP_SRC_CLASS = 'element-hider-item-regexp';
export const ELEMENT_HIDER_LIST_ACTIVE_CLASS = 'element-hider-item-active';
export const ELEMENT_HIDER_LIST_BUTTON_CLASS = 'element-hider-list-button';
export const ELEMENT_HIDER_LIST_BUTTON_TEXT_CLASS =
    'element-hider-list-button-text';

export function addElementIdentifierSettingItem(
    tbody: HTMLTableSectionElement, storage: Storage,
    item = {} as IElementIdentierSetting) {
  tbody.appendChild(createElementIdentifierSettingItem(tbody, storage, item));
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
  button.className = ELEMENT_HIDER_LIST_BUTTON_CLASS;
  buttonCell.appendChild(button);

  const buttonText = document.createElement('span');
  buttonText.className = ELEMENT_HIDER_LIST_BUTTON_TEXT_CLASS;
  buttonText.innerText = '+';
  button.appendChild(buttonText);

  return {buttonCell, button, buttonText};
}

function createUpdateActiveHandler(
    storage: Storage, urlPrefixInput: HTMLInputElement,
    selectorInput: HTMLInputElement, regExpSrcInput: HTMLInputElement,
    activeCheckbox: HTMLInputElement) {
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
    storage: Storage, urlPrefixInput: HTMLInputElement,
    selectorInput: HTMLInputElement, regExpSrcInput: HTMLInputElement,
    activeCheckbox: HTMLInputElement, button: HTMLButtonElement,
    itemRow: HTMLTableRowElement) {
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
    storage: Storage, tbody: HTMLTableSectionElement,
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

    addElementIdentifierSettingItem(tbody, storage);
  };
  return handle;
}

export function createElementIdentifierSettingItem(
    tbody: HTMLTableSectionElement, storage: Storage,
    setting = {} as IElementIdentierSetting): HTMLTableRowElement {
  const identifier = setting.identifier || {} as IElementIdentifier;

  const itemRow = document.createElement('tr');
  itemRow.className = ELEMENT_HIDER_LIST_ROW_CLASS;

  const {inputCell: domainCell, input: urlPrefixInput} =
      createElementIdentifierInputCell(
          ELEMENT_HIDER_LIST_URL_PREFIX_CLASS, 'input', identifier.urlPrefix);
  const {inputCell: selectorCell, input: selectorInput} =
      createElementIdentifierInputCell(
          ELEMENT_HIDER_LIST_SELECTOR_CLASS, 'input', identifier.selector);

  const {inputCell: regExpSrcCell, input: regExpSrcInput} =
      createElementIdentifierInputCell(
          ELEMENT_HIDER_LIST_REG_EXP_SRC_CLASS, 'input', identifier.regExpSrc);

  const {inputCell: activeCell, input: activeCheckbox} =
      createElementIdentifierInputCell(
          ELEMENT_HIDER_LIST_ACTIVE_CLASS, 'checkbox');
  activeCheckbox.checked = setting.active !== false;
  activeCheckbox.addEventListener(
      'change',
      createUpdateActiveHandler(
          storage, urlPrefixInput, selectorInput, regExpSrcInput,
          activeCheckbox));

  const {buttonCell, button, buttonText} = createElementHiderListButtonCell();

  itemRow.appendChild(domainCell);
  itemRow.appendChild(selectorCell);
  itemRow.appendChild(regExpSrcCell);
  itemRow.appendChild(activeCell);
  itemRow.appendChild(buttonCell);

  const removeItemHandler = createRemoveItemHandler(
      storage, urlPrefixInput, selectorInput, regExpSrcInput, activeCheckbox,
      button, itemRow);

  const addItemHandler = createAddItemHandler(
      storage, tbody, urlPrefixInput, selectorInput, regExpSrcInput,
      activeCheckbox, button, buttonText, itemRow, removeItemHandler);

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
    tbody: HTMLTableSectionElement, storage: Storage,
    elementIdentifierSettings: IElementIdentierSetting[]) {
  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  for (const item of elementIdentifierSettings) {
    addElementIdentifierSettingItem(tbody, storage, item);
  }

  addElementIdentifierSettingItem(tbody, storage);
}
