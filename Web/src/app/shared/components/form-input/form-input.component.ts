import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormInputConfig } from '@shared/models/form-input.config';
import { CustomErrorStateMatcher } from '@shared/utils/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
})
export class FormInputComponent implements OnInit {
  @Input() config!: FormInputConfig;
  // tslint:disable-next-line: no-input-rename
  @Output() formSubmit: EventEmitter<any> = new EventEmitter();

  matcher = new CustomErrorStateMatcher();

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.formSubmit.emit();
  }

  handleKeyDown(e: any): void {
    if (e.keyCode === 13) {
      this.onSubmit();
    }
  }
}
