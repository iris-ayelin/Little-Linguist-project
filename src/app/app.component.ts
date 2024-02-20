import { Component } from '@angular/core';
import { HeaderComponent } from "./components/header/header.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { FooterComponent } from "./components/footer/footer.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [HeaderComponent, CategoriesComponent, FooterComponent]
})
export class AppComponent {

}