type AttrType = Record<string, string>;

export interface Ibutton {
  text: string,
  attr: AttrType,
  onClick?: (e: MouseEvent) => void,
  onBlur?: () => void,
}
