export type TInput = {
  type: string,
  placeholder: string,
  name: string,
  onInput?: (value: string, e: Event) => void,
  onValidate?: (element: HTMLInputElement | null) => boolean,
  value?: string,
  styleType?: string,
};
