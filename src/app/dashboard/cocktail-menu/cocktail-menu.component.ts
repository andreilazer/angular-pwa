import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize } from 'rxjs/operators';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cocktail-menu',
  templateUrl: './cocktail-menu.component.html',
  styleUrls: ['./cocktail-menu.component.css'],
  imports: [
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    CocktailListComponent,
    CommonModule,
    MatButtonModule,
  ],
})
export class CocktailMenuComponent {
  categories = signal<any[]>([]);
  cocktails = signal<any[]>([]);
  isLoading = signal<boolean>(false);
  currentSection = signal<string>('');
  private httpClient = inject(HttpClient);

  getCategories() {
    this.httpClient
      .get<any>('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((result: any) =>
        this.categories.set(
          result.drinks.map((a: any) => ({
            name: a.strAlcoholic,
            id: a.strAlcoholic.replace(' ', '_'),
          }))
        )
      );
  }

  getCocktails(category: any) {
    this.isLoading.set(true);
    this.currentSection.set(category.name);
    this.httpClient
      .get<any>(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${category.id}`
      )
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe((result) => this.cocktails.set(result.drinks));
  }
}
