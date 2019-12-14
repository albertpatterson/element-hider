export type Browser = any;

// export interface IElementHiderItem {
//   urlPrefix?: string;
//   selector?: string;
//   regexp?: string;
//   active?: boolean;
// }

// export interface IValidElementHiderItem {
//   urlPrefix: string;
//   selector: string;
//   active: boolean;
//   regexp?: string;
// }

// export interface IElementIdentifier {
//   urlPrefix: string;
//   selector: string;
//   regexp?: string;
// }

export interface IElementIdentifier {
  urlPrefix: string;
  selector: string;
  regExpSrc?: string;
}

export interface IElementIdentierSetting {
  identifier: IElementIdentifier;
  active: boolean;
}
