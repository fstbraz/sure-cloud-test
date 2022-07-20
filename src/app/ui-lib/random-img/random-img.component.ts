import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-random-img',
  templateUrl: './random-img.component.html',
  styleUrls: ['./random-img.component.scss'],
})
export class RandomImgComponent {
  @Input() image$!: BehaviorSubject<any>;
  @Output() startPool = new EventEmitter<void>();
  @Output() stopPool = new EventEmitter<void>();
  @Output() like = new EventEmitter<void>();
}
