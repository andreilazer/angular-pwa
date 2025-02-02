import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent, map, merge, of } from 'rxjs';
import { WINDOW } from './window.service';

@Injectable({
  providedIn: 'root',
})
export class NetworkStateService {
  private window = inject(WINDOW);
  online = toSignal(
    merge(
      fromEvent(this.window, 'online').pipe(map(() => true)),
      fromEvent(this.window, 'offline').pipe(map(() => false)),
      of(navigator.onLine)
    )
  );
}
