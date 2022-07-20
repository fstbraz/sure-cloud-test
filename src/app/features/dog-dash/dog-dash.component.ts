import { Component, OnDestroy } from '@angular/core';
import { DogService } from '@app/api/dog.service';
import { Dog } from '@app/api/interfaces/dog';
import { BehaviorSubject, Subscription } from 'rxjs';
import { delay, repeat } from 'rxjs/operators';

@Component({
  selector: 'app-dog-dash',
  templateUrl: './dog-dash.component.html',
  styleUrls: ['./dog-dash.component.scss'],
})
export class DogDashComponent implements OnDestroy {
  dogImage$ = new BehaviorSubject<Dog | null>(null);
  dogFavs: Dog[] = [];
  sub!: Subscription;

  constructor(private dogService: DogService) {}

  startDogPool() {
    this.stopDogPool();

    this.sub = new Subscription();
    this.sub.add(
      this.dogService
        .getImage()
        .pipe(delay(3000), repeat())
        .subscribe((image: Dog) => this.dogImage$.next(image))
    );
  }

  stopDogPool() {
    this.sub?.unsubscribe();
  }

  like() {
    const isAlreadyFav = this.dogFavs.find(
      (dog) => dog.link === this.dogImage$.value?.link
    );

    if (this.dogImage$.value && !isAlreadyFav) {
      this.dogFavs.push(this.dogImage$.value);
    }
  }

  ngOnDestroy() {
    this.stopDogPool();
  }
}
