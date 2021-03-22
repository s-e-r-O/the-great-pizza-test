import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ContentLayoutComponent } from './components/content-layout/content-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, ContentLayoutComponent],
  imports: [CommonModule, RouterModule.forChild([])],
})
export class LayoutModule {}
