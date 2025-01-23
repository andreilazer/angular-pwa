import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

// Import SwPush here

@Component({
  selector: 'push-subscription',
  templateUrl: './push-subscription.component.html',
  styleUrls: ['./push-subscription.component.css'],
  imports: [MatCardModule, MatIconModule, MatButtonModule]
})
export class PushSubscriptionComponent {

  private snackBarDuration: number = 2000;

  public snackBar = inject(MatSnackBar);

  subscribeToPush() {
    this.snackBar.open('To be implemented', 'close', { duration: this.snackBarDuration });
    // Code to subscribe user to the Push notifications
  }

  unsubscribeFromPush() {
    this.snackBar.open('To be implemented', 'close', { duration: this.snackBarDuration });
    // Code to unsubscribe user from the Push notifications
  }
}
