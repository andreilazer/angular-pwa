import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { NetworkStateService } from './network-state.service';
import { WINDOW } from './window.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    MatSidenavModule,
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private breakPointObserver = inject(BreakpointObserver);
  networkState = inject(NetworkStateService);
  isHandset = toSignal(this.breakPointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches)), { requireSync: true });
  
  
  private _window = inject(WINDOW);
  private installPromptEvent: any;
  isInstallVisible = false;

  constructor() {
    this.prepareInstallButton();
  }

  private prepareInstallButton() {
    this._window.addEventListener('beforeinstallprompt', event => {
      // Prevent Chrome <= 67 from automatically showing the prompt
      event.preventDefault();
      // Stash the event so it can be triggered later.
      this.installPromptEvent = event;
      // Update the install UI to notify the user app can be installed
      this.isInstallVisible = true;
    });
  }

  install() {
    this.isInstallVisible = false;
    // Show the modal add to home screen dialog
    this.installPromptEvent.prompt();
    // Wait for the user to respond to the prompt
    this.installPromptEvent.userChoice.then((choice:any) => {
      if (choice.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      // Clear the saved prompt since it can't be used again
      this.installPromptEvent = null;
    });
  }

}
