import { FormControl } from '@angular/forms';

export interface FormInputConfig {
  formControl: FormControl;
  icon?: string;
  iconColor?: string;
  label: string;
  placeholder: string;
  submitMessage: string;
  errorMessagesHTML: {
    errorId: string;
    message: (payload: any) => string;
  }[];
}
