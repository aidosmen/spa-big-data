import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_core/shared.module';
import { TimerComponent } from './timer.component';

const exportedElems = [TimerComponent];

@NgModule({
  declarations: [exportedElems],
  imports: [CommonModule, FormsModule, SharedModule, ReactiveFormsModule],
  exports: [exportedElems],
})
export class TimerModule {}
