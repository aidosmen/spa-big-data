// src/app/data-display/data-display.component.ts

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Item } from '../_core/services/worker.service';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataDisplayComponent {
  @Input() data?: Item[] = [];

  trackItemById(index: number, item: Item): any {
    return item.id;
  }
}
