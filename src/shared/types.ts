export type Browser = any;

export interface IElementIdentifier {
  urlPrefix: string;
  selector: string;
  regExpSrc?: string;
}

export interface IElementIdentierSetting {
  identifier: IElementIdentifier;
  active: boolean;
}
