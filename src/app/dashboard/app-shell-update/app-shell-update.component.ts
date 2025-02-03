import { ApplicationRef, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { WINDOW } from '../../window.service';
import { concat, filter, first, interval, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-shell-update',
  templateUrl: './app-shell-update.component.html',
  styleUrls: ['./app-shell-update.component.css'],
  imports: [MatIconModule, MatCardModule, MatButtonModule]
})
export class AppShellUpdateComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  private swUpdate = inject(SwUpdate);
  private window = inject(WINDOW);
  private appRef = inject(ApplicationRef);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
  }

  subscribeForUpdates() {
    this.swUpdate.versionUpdates.pipe(
      filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      })),
      takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        console.log(
          '[App Shell Update] Update available: current version is',
          event.current,
          'available version is',
          event.available
        );
        this.snackBar.open(
          'Newer version of the app is available.',
          'Refresh the page'
        ).onAction()
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.activateUpdate();
          });
      });
  }

  activateUpdate() {
    console.log('[App Shell Update] activateUpdate started');
    this.swUpdate
      .activateUpdate()
      .then(() => {
        console.log('[App Shell Update] activateUpdate completed');
        this.window.location.reload();
      })
      .catch(err => {
        console.error(err);
      });
  }

  checkForUpdate() {
    console.log('[App Shell Update] checkForUpdate started');
    this.swUpdate
      .checkForUpdate()
      .then(() => {
        console.log('[App Shell Update] checkForUpdate completed');
      })
      .catch(err => {
        console.error(err);
      });
  }

  openLog() {
    this.window.open('/ngsw/state');
  }
}
