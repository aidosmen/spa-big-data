// src/app/worker.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Item {
  id: string;
  int: number;
  float: number;
  color: string;
  child: {
    id: string;
    color: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class WorkerService {
  private worker: Worker;
  items: Item[] = [];

  constructor() {
    this.worker = new Worker(new URL('src/data.worker', import.meta.url));
  }

  postMessages(messages: Item[]): void {
    this.worker.postMessage(messages);
  }

  receiveMessages(): Observable<Item[]> {
    return new Observable<Item[]>((observer) => {
      this.worker.addEventListener('message', (event) => {
        observer.next(event.data);
      });
    });
  }
}
