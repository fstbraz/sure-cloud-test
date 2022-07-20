import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DogService } from '@app/api/dog.service';
import { Dog } from '@app/api/interfaces/dog';
import {
  createComponentFactory,
  Spectator,
  SpyObject,
} from '@ngneat/spectator';
import { of, Subscription } from 'rxjs';
import { DogDashComponent } from './dog-dash.component';

describe('DogDashComponent', () => {
  let spectator: Spectator<DogDashComponent>;
  let dogService: SpyObject<DogService>;

  const dog: Dog = {
    link: 'doggo',
    date: new Date().toLocaleDateString('en-GB'),
    time: new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };

  const createComponent = createComponentFactory({
    component: DogDashComponent,
    mocks: [DogService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  });

  beforeEach(() => {
    spectator = createComponent();
    dogService = spectator.inject(DogService);
  });

  it('exists', () => {
    expect(spectator.component).toBeDefined();
  });

  it('should start the dog poll', () => {
    const stopPoolSpy = spyOn(spectator.component, 'stopDogPool');
    const subAddSpy = spyOn(Subscription.prototype, 'add');

    dogService.getImage.and.returnValue(of(dog));

    spectator.component.startDogPool();

    expect(stopPoolSpy).toHaveBeenCalled();
    expect(spectator.component.sub).toBeInstanceOf(Subscription);
    expect(subAddSpy).toHaveBeenCalled();
  });

  it('should stop the dog poll', () => {
    const subAddSpy = spyOn(Subscription.prototype, 'unsubscribe');

    spectator.component.sub = new Subscription();
    spectator.component.stopDogPool();

    expect(subAddSpy).toHaveBeenCalled();
  });

  it('should push to the dogsFavs', () => {
    spectator.component.dogImage$.next(dog);

    spectator.component.like();

    expect(spectator.component.dogFavs).toEqual([dog]);
  });

  it('should destroy the subscriptions on destroy', () => {
    const sub = spyOn(Subscription.prototype, 'unsubscribe');

    spectator.component.sub = new Subscription();
    spectator.component.ngOnDestroy();

    expect(sub).toHaveBeenCalledTimes(1);
  });
});
