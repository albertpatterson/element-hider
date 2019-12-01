const ELEMENT_HIDER_LIST_KEY = 'element-hider-list';
const ELEMENT_HIDER_LIST_TBODY_ID = 'element-hider-list-body';

const ELEMENT_HIDER_LIST_TBODY =
    document.getElementById(ELEMENT_HIDER_LIST_TBODY_ID)!;

function addElementHiderItem(item = {} as IElementHiderItem) {
  ELEMENT_HIDER_LIST_TBODY.appendChild(createElementHiderItem(item));
}

function createElementHiderListInputCell(
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

function createElementHiderListButtonCell() {
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

function isSettingValid(item: IElementHiderItem) {
  return item.domain && item.selector;
}

function createElementHiderItem(item = {} as IElementHiderItem):
    HTMLTableRowElement {
  const itemRow = document.createElement('tr');
  itemRow.className = 'element-hider-list-row';

  const {inputCell: domainCell, input: domainInput} =
      createElementHiderListInputCell(
          'element-hider-item-domain', 'input', item.domain);
  const {inputCell: selectorCell, input: selectorInput} =
      createElementHiderListInputCell(
          'element-hider-item-selector', 'input', item.selector);
  const {inputCell: regexpCell, input: regexpInput} =
      createElementHiderListInputCell(
          'element-hider-item-regexp', 'input', item.regexp);

  const {buttonCell, button, buttonText} = createElementHiderListButtonCell();

  itemRow.appendChild(domainCell);
  itemRow.appendChild(selectorCell);
  itemRow.appendChild(regexpCell);
  itemRow.appendChild(buttonCell);

  const removeItemHandler = (event: Event) => {
    const domain = domainInput.value;
    const selector = selectorInput.value;
    const regexp = regexpInput.value;

    removeElementHiderItemFromSettings({domain, selector, regexp});

    button.removeEventListener('click', removeItemHandler);
    itemRow.parentElement!.removeChild(itemRow);
  };

  const addItemHandler = (event: Event) => {
    const domain = domainInput.value;
    const selector = selectorInput.value;
    const regexp = regexpInput.value;

    addElementHiderItemToSettings({domain, selector, regexp});

    button.removeEventListener('click', addItemHandler);
    button.addEventListener('click', removeItemHandler);

    domainInput.disabled = true;
    selectorInput.disabled = true;
    regexpInput.disabled = true;
    buttonText.innerText = '-';

    addElementHiderItem();
  };

  if (isSettingValid(item)) {
    domainInput.disabled = true;
    selectorInput.disabled = true;
    regexpInput.disabled = true;
    buttonText.innerText = '-';
    button.addEventListener('click', removeItemHandler);
  } else {
    button.disabled = true;
    itemRow.addEventListener('input', (event: Event) => {
      const domain = domainInput.value;
      const selector = selectorInput.value;
      button.disabled = !isSettingValid({domain, selector});
    });

    button.addEventListener('click', addItemHandler);
  }

  return itemRow;
}

interface IElementHiderItem {
  domain?: string;
  selector?: string;
  regexp?: string;
}

function showElementHiderList(list: IElementHiderItem[]) {
  while (ELEMENT_HIDER_LIST_TBODY.firstChild) {
    ELEMENT_HIDER_LIST_TBODY.removeChild(ELEMENT_HIDER_LIST_TBODY.firstChild);
  }

  for (const item of list) {
    addElementHiderItem(item);
  }

  addElementHiderItem();
}

function getElementHiderListFromSettings(
    operation: (list: IElementHiderItem[]) => void) {
  chrome.storage.sync.get(
      [ELEMENT_HIDER_LIST_KEY],
      (settings: any) => {
        // tslint:disable-next-line: no-console
        console.log(settings);
        const list = settings && settings[ELEMENT_HIDER_LIST_KEY] || [];
        // tslint:disable-next-line: no-console
        console.log(list);
        operation(list);
      },
  );
}

function addElementHiderItemToSettings(item: IElementHiderItem) {
  getElementHiderListFromSettings((list: IElementHiderItem[]) => {
    chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: [...list, item]});
  });
}

function removeElementHiderItemFromSettings(removeItem: IElementHiderItem) {
  getElementHiderListFromSettings((list: IElementHiderItem[]) => {
    const filtered = list.filter(
        (item: IElementHiderItem) =>
            !(item.domain === removeItem.domain &&
              item.selector === removeItem.selector &&
              item.regexp === removeItem.regexp));

    chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: filtered});
  });
}

if (window.chrome) {
  getElementHiderListFromSettings(showElementHiderList);
  // chrome.storage.sync.set({[ELEMENT_HIDER_LIST_KEY]: []});
}
