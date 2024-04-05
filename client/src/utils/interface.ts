import { secondaryLanguagesList } from "./constants";

export interface FormProps {
  validateForm: (value: boolean) => void;
  formRef: React.RefObject<HTMLFormElement>;
}

export interface DateDetails {
  month: number;
  year: number;
}

export interface DraggableItem {
  id: string;
  text: string;
}

export type OptionType = (typeof secondaryLanguagesList)[0];
