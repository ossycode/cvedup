export interface FormProps {
  validateForm: (value: boolean) => void;
  formRef: React.RefObject<HTMLFormElement>;
}

export interface DateDetails {
  month: number;
  year: number;
}
