import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import { Item, WorkerService } from './_core/services/worker.service';
import { SharedModule } from './_core/shared.module';
import { DataDisplayModule } from './data-display/data-display.module';
import { TimerModule } from './timer/timer.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    DataDisplayModule,
    TimerModule,
    SharedModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'test';
  private subscription?: Subscription;
  data?: Item[];

  formControlArrayLength = new FormControl(2);

  constructor(private workerService: WorkerService) {}

  ngOnInit(): void {
    this.workerService.postMessages([
      {
        id: '1',
        int: 2,
        float: 3,
        color: 'red',
        child: {
          id: '1',
          color: 'yellow',
        },
      },
      {
        id: '2',
        int: 3,
        float: 3,
        color: 'yellow',
        child: {
          id: '1',
          color: 'green',
        },
      },
    ]);

    this.subscription = this.workerService
      .receiveMessages()
      .subscribe((message) => {
        this.data = message.slice(-10);
      });

    this.formControlArrayLength.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.changeArraySize(value);
      });
  }

  async changeArraySize(e: number | null) {
    if (e) {
      const batchSize = 100000000;
      for (let i = 0; i < e; i += batchSize) {
        const end = Math.min(i + batchSize, e);
        const newArray = Array.from({ length: end - i }, (_, index) => {
          return {
            id: String(index + 1),
            int: Math.floor(Math.random() * 1000000) + 1,
            float: parseFloat((Math.random() * 1000000).toFixed(18)),
            color: this.getRandomColor(),
            child: {
              id: String(index + 1),
              color: this.getRandomColor(),
            },
          };
        });
        console.log('NEW ARRAY ', newArray);
        await this.delay(0);
        this.workerService.postMessages(newArray);
      }
    }
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
