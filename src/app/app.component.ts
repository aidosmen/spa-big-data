import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import { ItemsService } from './_core/services/items.service';
import { WorkerService } from './_core/services/worker.service';
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

  formControlArrayLength = new FormControl(2);
  formAdditionalId = new FormControl(null);

  constructor(
    private workerService: WorkerService,
    public itemService: ItemsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscription = this.workerService
      .receiveMessages()
      .subscribe((message) => {
        this.itemService.items = message;
      });

    this.formControlArrayLength.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.itemService.changeArraySize(value);
      });

    this.formAdditionalId.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        if (value) {
          this.itemService.changeIds(value);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
