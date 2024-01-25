import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';

const exportedElements = [InputComponent];

@NgModule({
  declarations: [exportedElements],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [exportedElements],
})
export class SharedModule {}
