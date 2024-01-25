import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TimerService } from '../_core/services/timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  form = new FormControl<number>(300);

  constructor(private timerService: TimerService) {}

  updateInterval(): void {
    this.timerService.updateInterval(3);
  }
}
