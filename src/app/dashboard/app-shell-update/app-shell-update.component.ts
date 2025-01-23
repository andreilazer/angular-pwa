import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
// Import SwUpdate here

@Component({
  selector: 'app-shell-update',
  templateUrl: './app-shell-update.component.html',
  styleUrls: ['./app-shell-update.component.css'],
  imports: [MatIconModule, MatCardModule, MatButtonModule]
})
export class AppShellUpdateComponent implements OnInit {
  public snackBar = inject(MatSnackBar);

  ngOnInit() {
    this.subscribeForUpdates();
  }

  subscribeForUpdates() {
    // Code to subscribe for updates
  }

  activateUpdate() {
    this.snackBar.open('To be implemented','close',{ duration: 2000 });
    console.log('[App Shell Update] activateUpdate started');
    // Code to activate the update
  }

  checkForUpdate() {
    this.snackBar.open('To be implemented', 'close', { duration: 2000 });
    console.log('[App Shell Update] checkForUpdate started');
    // Code to explicitly check for the updates
  }

  openLog() {
    window.open('/ngsw/state');
  }
}
