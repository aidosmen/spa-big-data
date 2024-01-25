import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DataDisplayComponent } from './data-display.component';

const exportedElems = DataDisplayComponent;

@NgModule({
  declarations: [exportedElems],
  imports: [CommonModule],
  exports: [exportedElems],
})
export class DataDisplayModule {}
