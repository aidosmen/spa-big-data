import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  forwardRef,
} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  template: `
    <div class="form-group">
      <label>{{ labelName }}</label>
      <input
        [type]="type"
        #inputRef
        [formControl]="formControl"
        (change)="onInputChange()"
      />
    </div>
  `,
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent {
  @ViewChild('input', { static: true })
  inputRef!: ElementRef<HTMLInputElement>;

  @Input() labelName?: string;
  @Input() formControl!: FormControl;
  @Input() max: number = 0;
  @Input() type: string = 'number';

  onChange: any = () => {};
  onTouch: any = () => {};

  constructor(public elementRef: ElementRef, protected renderer: Renderer2) {}

  writeValue(value: any): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onInputChange() {
    this.onChange(this.formControl.value);
    this.onTouch();
  }
}
