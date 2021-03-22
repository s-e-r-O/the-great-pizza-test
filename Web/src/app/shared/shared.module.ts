import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './modules/material/material.module';
@NgModule({
  declarations: [],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [ReactiveFormsModule, MaterialModule],
})
export class SharedModule {}
