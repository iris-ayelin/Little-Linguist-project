import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table'
import { MatIconModule } from '@angular/material/icon'
import { Category } from '../../shared/model/category';
import { Language } from '../../shared/model/language';
import { MatButtonModule } from '@angular/material/button';
import { TranslatedWord } from '../../shared/model/TranslatedWord';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  displayedColumns: string[] = ['categoryName', 'wordsCount', 'lastUpdated', 'actions'];
  category1 = new Category(1, "Fruits", Language.English, Language.Hebrew)
  category2 = new Category(2, "Animals", Language.English, Language.Hebrew)
  category3 = new Category(3, "Countries", Language.English, Language.Hebrew)

  categoryArray = [this.category1,this.category2,this.category3]

  constructor() {
    this.category1.words.push(new TranslatedWord("Apple", "תפוח"));
    this.category1.words.push(new TranslatedWord("Banana", "בננה"));
    this.category1.words.push(new TranslatedWord("Watermelon", "אבטיח"))

    this.category2.words.push(new TranslatedWord("Dog", "כלב"));
    this.category2.words.push(new TranslatedWord("Cat", "חתול"));
    this.category2.words.push(new TranslatedWord("Bird", "ציפור"))

    this.category3.words.push(new TranslatedWord("Israel", "ישראל"));
    this.category3.words.push(new TranslatedWord("Greece", "יוון"));
    this.category3.words.push(new TranslatedWord("Thailand", "תאילנד"))
  }

  getCurrentDate(): string {
    return new Date().toLocaleDateString();
  }
}
