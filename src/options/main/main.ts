// const windowAny = window as any;
const valueCheckbox =
    document.getElementById('value-button') as HTMLInputElement;
const VALUE_KEY = 'element-hider-value';

if (window.chrome && valueCheckbox) {
  chrome.storage.sync.get(
      [VALUE_KEY],
      (result: any) => {
        // tslint:disable-next-line: no-console
        console.log(result);
        // tslint:disable-next-line: no-console
        console.log(result && result[VALUE_KEY]);
        valueCheckbox.checked = result && result[VALUE_KEY];
      },
  );

  valueCheckbox.addEventListener(
      'change',
      () => {
        const setting = {} as any;
        setting[VALUE_KEY] = valueCheckbox.checked;
        // tslint:disable-next-line: no-console
        console.log(setting);
        chrome.storage.sync.set(setting);
      },
  );
}
