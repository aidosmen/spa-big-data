// src/app/worker.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

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

  constructor() {
    this.worker = new Worker(new URL('./data.worker', import.meta.url));
  }

  postMessage(message: Item): void {
    this.worker.postMessage(message);
  }

  postMessages(messages: Item[]): void {
    const messagesWithId = messages.map((item) => ({
      ...item,
      id: uuidv4(),
      int: Math.floor(Math.random() * 1000000) + 1,
      float: parseFloat((Math.random() + Math.random() * 10).toFixed(18)),
    }));
    this.worker.postMessage(messagesWithId);
  }

  receiveMessages(): Observable<Item[]> {
    return new Observable<Item[]>((observer) => {
      this.worker.addEventListener('message', (event) => {
        observer.next(event.data);
      });
    });
  }
}
