import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushSubscriptionService {
  private pushSubscriptionUrl: string = "https://angularpwasoc-bvbwb8gjfuaqhpb7.westeurope-01.azurewebsites.net/api/PushSubscriptions";
  private httpClient = inject(HttpClient);

  addSubscriber(subscription: PushSubscription): Observable<any> {
    console.log('[Push Subscription Service] Adding subscriber');
    return this.httpClient.post(this.pushSubscriptionUrl, subscription);
  }

  deleteSubscriber(subscription: any): Observable<any> {
    console.log('[Push Subscription Service] Deleting subscriber');
    return this.httpClient.post(this.pushSubscriptionUrl + '/removeSubscription', subscription);
  }
}
