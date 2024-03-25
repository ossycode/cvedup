export interface FormProps {
  validateForm: (value: boolean) => void;
  formRef: React.RefObject<HTMLFormElement>;
}
