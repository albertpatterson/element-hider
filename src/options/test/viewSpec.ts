import 'mocha';

import {expect} from 'chai';

import {Storage} from '../../shared/storage';
import {IElementIdentierSetting, IElementIdentifier} from '../../shared/types';
import * as view from '../main/view';

describe('Options View: ', () => {
  let tableFixture: HTMLTableElement;
  let tableFixtureBody: HTMLTableSectionElement;
  let storage: Storage;
  let addElementHiderItemToSettingsCalls: IElementIdentierSetting[];
  let removeElementHiderItemFromSettingsCalls: IElementIdentifier[];

  function setupTemplate() {
    tableFixture = document.createElement('table');

    tableFixtureBody = document.createElement('tbody');
    tableFixtureBody.id = view.ELEMENT_HIDER_LIST_TBODY_ID;

    tableFixture.appendChild(tableFixtureBody);

    document.body.appendChild(tableFixture);
  }

  function teardownTemplate() {
    document.body.removeChild(tableFixture);
  }

  beforeEach(() => {
    setupTemplate();

    addElementHiderItemToSettingsCalls = [];
    removeElementHiderItemFromSettingsCalls = [];

    storage = {
      addElementHiderItemToSettings: (item: IElementIdentierSetting) => {
        addElementHiderItemToSettingsCalls.push(item);
      },
      removeElementHiderItemFromSettings: (removeItem: IElementIdentifier) => {
        removeElementHiderItemFromSettingsCalls.push(removeItem);
      },
    } as Storage;
  });

  afterEach(() => {
    teardownTemplate();
  });

  describe('showElementHiderList', () => {
    it('adds entried to settings list', () => {
      const mockSettings = [
        {
          active: false,
          identifier: {
            regExpSrc: 'reg-exp-1',
            selector: 'test-selector-1',
            urlPrefix: 'test-url-prefix-1',
          },
        },
        {
          active: true,
          identifier: {
            regExpSrc: 'reg-exp-2',
            selector: 'test-selector-2',
            urlPrefix: 'test-url-prefix-2',
          },
        },
      ];

      expect(document.getElementsByClassName(view.ELEMENT_HIDER_LIST_ROW_CLASS)
                 .length)
          .to.equal(0);

      view.showElementHiderList(tableFixtureBody, storage, mockSettings);

      // two items from the settings + 1 blank
      expect(document.getElementsByClassName(view.ELEMENT_HIDER_LIST_ROW_CLASS)
                 .length)
          .to.equal(3);
    });

    it('adds valid entries', () => {
      view.showElementHiderList(tableFixtureBody, storage, []);
      const urlPrefixInputs = document.getElementsByClassName(
          view.ELEMENT_HIDER_LIST_URL_PREFIX_CLASS);
      const selectorInputs = document.getElementsByClassName(
          view.ELEMENT_HIDER_LIST_SELECTOR_CLASS);
      const addRemoveButtons =
          document.getElementsByClassName(view.ELEMENT_HIDER_LIST_BUTTON_CLASS);
      const addRemoveButtonTexts = document.getElementsByClassName(
          view.ELEMENT_HIDER_LIST_BUTTON_TEXT_CLASS);

      expect(urlPrefixInputs.length).to.equal(1);
      expect(selectorInputs.length).to.equal(1);
      expect(addRemoveButtons.length).to.equal(1);
      expect(addRemoveButtonTexts.length).to.equal(1);

      const urlPrefixInput = urlPrefixInputs[0] as HTMLInputElement;
      const selectorInput = selectorInputs[0] as HTMLInputElement;
      const addRemoveButton = addRemoveButtons[0] as HTMLButtonElement;
      const addRemoveButtonText = addRemoveButtonTexts[0] as HTMLElement;

      expect(urlPrefixInput.value).to.equal('');
      expect(selectorInput.value).to.equal('');
      expect(addRemoveButton.disabled).to.be.true;
      expect(addRemoveButtonText.innerText).to.equal('+');

      urlPrefixInput.value = 'testing';
      selectorInput.value = 'testing';

      expect(urlPrefixInput.value).to.equal('testing');
      expect(selectorInput.value).to.equal('testing');

      selectorInput.dispatchEvent(new Event('input', {bubbles: true}));
      expect(addRemoveButton.disabled).to.be.false;

      addRemoveButton.dispatchEvent(new Event('click'));
      expect(addElementHiderItemToSettingsCalls.length).to.equal(1);
      expect(addElementHiderItemToSettingsCalls).eqls([{
        active: true,
        identifier: {
          regExpSrc: '',
          selector: 'testing',
          urlPrefix: 'testing',
        },
      }]);
      expect(addRemoveButtonText.innerText).to.equal('-');
    });

    it('removes entries', () => {
      const mockSettings = [
        {
          active: false,
          identifier: {
            regExpSrc: 'reg-exp-1',
            selector: 'test-selector-1',
            urlPrefix: 'test-url-prefix-1',
          },
        },
        {
          active: true,
          identifier: {
            regExpSrc: 'reg-exp-2',
            selector: 'test-selector-2',
            urlPrefix: 'test-url-prefix-2',
          },
        },
      ];

      view.showElementHiderList(tableFixtureBody, storage, mockSettings);
      const urlPrefixInputs = document.getElementsByClassName(
          view.ELEMENT_HIDER_LIST_URL_PREFIX_CLASS);
      const selectorInputs = document.getElementsByClassName(
          view.ELEMENT_HIDER_LIST_SELECTOR_CLASS);
      const addRemoveButtons =
          document.getElementsByClassName(view.ELEMENT_HIDER_LIST_BUTTON_CLASS);
      const addRemoveButtonTexts = document.getElementsByClassName(
          view.ELEMENT_HIDER_LIST_BUTTON_TEXT_CLASS);

      expect(urlPrefixInputs.length).to.equal(3);
      expect(selectorInputs.length).to.equal(3);
      expect(addRemoveButtons.length).to.equal(3);
      expect(addRemoveButtonTexts.length).to.equal(3);

      const addRemoveButton0 = addRemoveButtons[0] as HTMLButtonElement;
      const addRemoveButtonText0 = addRemoveButtonTexts[0] as HTMLElement;

      expect(addRemoveButton0.disabled).to.be.false;
      expect(addRemoveButtonText0.innerText).to.equal('-');

      addRemoveButton0.dispatchEvent(new Event('click'));
      expect(removeElementHiderItemFromSettingsCalls).to.eql([{
        regExpSrc: 'reg-exp-1',
        selector: 'test-selector-1',
        urlPrefix: 'test-url-prefix-1',
      }]);

      expect(urlPrefixInputs.length).to.equal(2);
      expect(selectorInputs.length).to.equal(2);
      expect(addRemoveButtons.length).to.equal(2);
      expect(addRemoveButtonTexts.length).to.equal(2);
    });
  });
});
