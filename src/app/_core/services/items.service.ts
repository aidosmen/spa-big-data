import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Item, WorkerService } from './worker.service';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  _items?: Item[];

  get items(): Item[] {
    return this._items || [];
  }

  set items(items: Item[]) {
    this._items = items;
  }

  constructor(private workerService: WorkerService) {}

  async addItem() {
    await this.delay(0);
    this.items = [...this.items, this.createItem()];
    this.workerService.postMessages(this.items);
  }

  async changeArraySize(e: number | null) {
    if (e) {
      const batchSize = 100000000;
      for (let i = 0; i < e; i += batchSize) {
        const end = Math.min(i + batchSize, e);
        const newArray = Array.from({ length: end - i }, (_, index) =>
          this.createItem()
        );
        await this.delay(0);
        const messagesWithId = newArray.map((item) => this.createItem());
        this.workerService.postMessages(messagesWithId);
      }
    }
  }

  async changeIds(value: string) {
    await this.delay(0);
    this.items = [...this.items].map((el) => ({ ...el, id: value }));
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private createItem() {
    return {
      id: uuidv4(),
      int: Math.floor(Math.random() * 1000000) + 1,
      float: parseFloat((Math.random() * 1000000).toFixed(18)),
      color: this.getRandomColor(),
      child: {
        id: uuidv4(),
        color: this.getRandomColor(),
      },
    };
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
}
