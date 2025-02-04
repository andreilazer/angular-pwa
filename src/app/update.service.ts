import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class UpdateService {
  private swUpdate = inject(SwUpdate);
  private snackBar = inject(MatSnackBar);
  private available = this.swUpdate.versionUpdates.pipe(
    filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
    map(evt => ({
      type: 'UPDATE_AVAILABLE',
      current: evt.currentVersion,
      available: evt.latestVersion,
    })));

  subscribeToUpdates(pollingTime: number = 60) {
    this.available.subscribe(event => {
      console.log(
        '[App Shell Update] Update available: current version is',
        event.current,
        'available version is',
        event.available
      );
      let appData = event.available.appData as { version: string, message: string } || { version: '1.0', message: 'We are live!' };
      this.snackBar.open(
        `Newer version of the app is available. ${appData.version}: ${appData.message}`,
        'Refresh the page'
      ).onAction()
        .subscribe(() => {
          this.activateUpdate();
        });
    });

    if (this.swUpdate.isEnabled) {
      this.swUpdate.checkForUpdate();
      const updateInterval = interval(pollingTime * 1000); // check every 60 seconds
      updateInterval.subscribe(() => this.swUpdate.checkForUpdate());
    }
  }

  private activateUpdate() {
    this.swUpdate.activateUpdate().then(() => document.location.reload());
  }
}
