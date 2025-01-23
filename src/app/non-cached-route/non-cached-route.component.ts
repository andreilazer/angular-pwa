import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-non-cached-route',
  templateUrl: './non-cached-route.component.html',
  styleUrls: ['./non-cached-route.component.css'],
  imports: [MatCardModule]
})
export class NonCachedRouteComponent {}