// src/app/timer.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, interval, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private timerIntervalSubject: BehaviorSubject<number> =
    new BehaviorSubject<number>(1000);
  timerInterval$: Observable<number> = this.timerIntervalSubject.asObservable();
  private timerSubscription: any;

  constructor() {}

  startTimer(): void {
    this.timerSubscription = interval(
      this.timerIntervalSubject.value
    ).subscribe(() => {
      this.emitTick();
    });
  }

  stopTimer(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  updateInterval(newInterval: number): void {
    this.timerIntervalSubject.next(newInterval);
    this.stopTimer();
    this.startTimer();
  }

  private emitTick(): void {
    console.log('Tick');
  }
}
