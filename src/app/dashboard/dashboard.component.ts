import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card'
import { CocktailMenuComponent } from './cocktail-menu/cocktail-menu.component';
import { AppShellUpdateComponent } from './app-shell-update/app-shell-update.component';
import { PushSubscriptionComponent } from './push-subscription/push-subscription.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [MatTabsModule, MatCardModule, CocktailMenuComponent, AppShellUpdateComponent, PushSubscriptionComponent]
})
export class DashboardComponent {
}
