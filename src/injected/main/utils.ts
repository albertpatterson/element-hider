import {IElementIdentierSetting, IElementIdentifier} from '../../shared/types';

// import {IValidElementHiderItem} from '../../shared/types';

const ELEMENT_HIDER_HIDDEN_CLASS = 'element-hider-hidden';

// export function getArticles(): HTMLElement[] {
//   return [].slice.call(document.querySelectorAll('article'));
// }

// export function isEditorsPick(article: HTMLElement): boolean {
//   if (!article) {
//     return false;
//   }
//   const innerText = article.innerText;
//   const editorsPrefix = 'editors‘ pick';
//   const prefix = innerText.slice(0, editorsPrefix.length).toLowerCase();
//   return prefix === editorsPrefix;
// }

export function showAllHiddenElements() {
  const hiddenElements =
      Array.from(document.getElementsByClassName(ELEMENT_HIDER_HIDDEN_CLASS));
  for (const hiddenElement of hiddenElements) {
    hiddenElement.classList.remove(ELEMENT_HIDER_HIDDEN_CLASS);
  }
}

export function hideAllMatches(settings: IElementIdentierSetting[]) {
  const pageSettings = getIdentifiersForPage(settings);
  hideAllPageMatches(pageSettings);
}

function getIdentifiersForPage(settings: IElementIdentierSetting[]):
    IElementIdentifier[] {
  const url = document.location.href;
  return settings
      .filter(
          (setting) =>
              setting.active && url.startsWith(setting.identifier.urlPrefix))
      .map((setting) => setting.identifier);
}

function hideAllPageMatches(pageIdentifiers: IElementIdentifier[]) {
  for (const pageIdentifier of pageIdentifiers) {
    hidePageMatches(pageIdentifier);
  }
}

function hidePageMatches(pageSetting: IElementIdentifier) {
  const matchedElements =
      Array.from(document.querySelectorAll(pageSetting.selector)) as
      HTMLElement[];
  for (const matchedElement of matchedElements) {
    const regexpMatch = !(pageSetting.regExpSrc) ||
        new RegExp(pageSetting.regExpSrc).test(matchedElement.innerText);
    if (regexpMatch) {
      matchedElement.classList.add(ELEMENT_HIDER_HIDDEN_CLASS);
    }
  }
}

export function throttle(fcn: () => void, delay: number) {
  let ready = true;
  let cleanup: number|null;

  return () => {
    if (cleanup) {
      clearInterval(cleanup);
      cleanup = null;
    }
    if (!ready) {
      cleanup = window.setTimeout(fcn, delay);
      return;
    }
    fcn();
    ready = false;
    setTimeout(() => {
      ready = true;
    }, delay);
  };
}
