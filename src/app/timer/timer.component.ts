import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { TimerService } from '../_core/services/timer.service';

@Component({
  selector: 'app-timer',
  template: `
    <app-input labelName="Timer, ms" [formControl]="form"></app-input>
  `,
  styleUrl: './timer.component.scss',
})
export class TimerComponent implements OnInit {
  form = new FormControl<number>(300);

  constructor(private timerService: TimerService) {}

  ngOnInit(): void {
    this.form.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.timerService.updateInterval(value || 0);
    });
  }
}
