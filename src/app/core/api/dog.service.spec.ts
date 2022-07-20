import { environment } from '@app/environment';
import { DogService } from './dog.service';
import { Dog } from './interfaces/dog';

import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
} from '@ngneat/spectator';

describe('DogService', () => {
  let spectator: SpectatorHttp<DogService>;

  const createHttp = createHttpFactory({
    service: DogService,
  });

  beforeEach(() => (spectator = createHttp()));

  it('exists', () => {
    expect(spectator.service).toBeDefined();
  });

  it('should get the dog', () => {
    let dog: Dog | undefined;
    spectator.service.getImage().subscribe((result) => {
      dog = result;
    });

    const request = spectator.expectOne(
      environment.API_URL + '/breeds/image/random',
      HttpMethod.GET
    );

    request.flush({ message: 'test message' });

    expect(dog).toEqual({
      link: 'test message',
      date: new Date().toLocaleDateString('en-GB'),
      time: new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  });
});
