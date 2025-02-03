import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwPush } from '@angular/service-worker';
import { PushSubscriptionService } from '../../push-subscription.service';
import { take } from 'rxjs';

@Component({
  selector: 'push-subscription',
  templateUrl: './push-subscription.component.html',
  styleUrls: ['./push-subscription.component.css'],
  imports: [MatCardModule, MatIconModule, MatButtonModule]
})
export class PushSubscriptionComponent {

  private snackBarDuration: number = 2000;
  private snackBar = inject(MatSnackBar);
  private swPush = inject(SwPush);
  private subscriptionService = inject(PushSubscriptionService);

  subscribeToPush() {
    this.swPush
      .requestSubscription({
        serverPublicKey: "BGyS3wgajPLef0e9B5MsSfj4CnbqQdZOc7CMmhd5ebVzD2X2HO2aomJQG-JH-fJ9qd-RG_pieo0KNI-aPgBy7J4"
      })
      .then(pushSubscription => {
        this.subscriptionService.addSubscriber(pushSubscription).subscribe(
          {
            next: res => {
              console.log('[Push Subscription] Add subscriber request answer', res);
              this.snackBar.open('Now you are subscribed', 'OK', { duration: this.snackBarDuration });
            },
            error: err => {
              console.log('[Push Subscription] Add subscriber request failed', err);
            }
          }
        );
      })
      .catch(err => {
        console.error(err);
      });
  }

  unsubscribeFromPush() {
    // Get active subscription
    this.swPush.subscription.pipe(take(1)).subscribe(pushSubscription => {
      console.log('[Push Subscription] pushSubscription', pushSubscription);
      // Delete the subscription on the backend
      this.subscriptionService.deleteSubscriber(pushSubscription).subscribe(
        {
          next: res => {
            console.log('[Push Subscription] Delete subscriber request answer', res);
            this.snackBar.open('Now you are unsubscribed', '', { duration: this.snackBarDuration });
            // Unsubscribe current client (browser)
            pushSubscription!
              .unsubscribe()
              .then(success => {
                console.log('[Push Subscription] Unsubscribing successful', success);
              })
              .catch(err => {
                console.log('[Push Subscription] Unsubscribing failed', err);
              });
          },
          error: err => {
            console.log('[Push Subscription] Delete subscription request failed', err);
          }
        }
      );
    });
  }
}
