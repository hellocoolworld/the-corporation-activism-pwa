import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

/**
 * @class SubscriptionsService
 * handle subscriptions https://github.com/angular/angularfire/issues/1459
 */
@Injectable({
  providedIn: 'root'
})
export class SubscriptionsService {
  public subscriptions: Subscription[] = [];
  constructor() {}

  public forceSubscriptionDestroy(): void {
    for (const sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }
}
