import { Routes } from '@angular/router';
import { Categories } from './components/categories/categories.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';

export const routes: Routes = [
    { path: "management-mode", component: Categories },
    { path: "add-category", component: AddCategoryComponent },
    { path: "", redirectTo: "/management-mode", pathMatch: "full" },

];
