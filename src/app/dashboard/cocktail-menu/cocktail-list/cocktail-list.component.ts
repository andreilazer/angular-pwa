import { Component, computed, input, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css'],
  imports: [MatCardModule, MatPaginatorModule]
})
export class CocktailListComponent {
  cocktails = input<any[]>([]);
  title = input<string>('Cocktails');
  page = signal<PageEvent>({ pageIndex: 0, pageSize: 5, length: 0 });

  currentPage = computed(() => {
    const page = this.page();
    return this.cocktails().slice((page.pageIndex) * page.pageSize, (page.pageIndex + 1) * 5);
  });
}