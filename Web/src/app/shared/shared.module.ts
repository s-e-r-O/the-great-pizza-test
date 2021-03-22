import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/modules/material/material.module';
import { FormInputComponent } from './components';
import { CardImageHeaderComponent } from './components/card-image-header/card-image-header.component';
@NgModule({
  declarations: [FormInputComponent, CardImageHeaderComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [
    FormInputComponent,
    CardImageHeaderComponent,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class SharedModule {}
