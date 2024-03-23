import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatTableModule, MatInputModule, MatIconModule, MatButtonModule, FormsModule],

  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnInit {

  constructor(private route: ActivatedRoute,private router: Router) { }
  model: any = {
    Target: 'Hebrew',
    Origin: 'English'
  };
  tableData: any[] = [];
  displayedColumns: string[] = ['Origin', 'Target', 'Actions'];
  detailStorage: any[] = [];
  categoryDetails: any;
  updateMode = false;
  deleteSelectedElement(element: any) {
    const index = this.tableData.findIndex(item => item === element);
    if (index !== -1) {
      this.tableData.splice(index, 1);
      this.tableData = [...this.tableData];

    }
  }

  ngOnInit() {
    const detailsString = localStorage.getItem('category-details');

    if (detailsString) {
        const details: any[] = JSON.parse(detailsString);

        if (Array.isArray(details) && details.length > 0) {
          details.forEach(element => {
            this.detailStorage.push(element);
          });

          this.route.queryParams.subscribe(params => {
            const categoryId = params['id'];
            if (categoryId) {
              this.categoryDetails = this.detailStorage?.find(category => category.id == categoryId);
              this.updateMode = true;
              const { id, category, origin, target } = this.categoryDetails
              this.model.Id = id;
              this.model.Name = category;
              this.model.Origin = origin;
              this.model.Target = target
              this.tableData = this.categoryDetails.words;
              this.tableData = [...this.tableData];

            }
          });
        }
      }
    }

  save() {
    if (this.updateMode) {
      const index = this.detailStorage?.findIndex(category => category.id == this.model.Id);
      if (index > -1) {
        this.detailStorage[index].category = this.model.Name;
        this.detailStorage[index].origin = this.model.Origin;
        this.detailStorage[index].target = this.model.Target;
        this.detailStorage[index].words = this.tableData;
        this.detailStorage[index].updateDate =new Date() ;

      }
    } else {
      const payload = {
        id: Math.floor(Math.random() * 1000000),
        category: this.model.Name,
        origin: this.model.Origin,
        target: this.model.Target,
        words: this.tableData,
        updateDate:new Date()
      }
      this.detailStorage.push(payload)
    }
    localStorage.setItem('category-details', JSON.stringify(this.detailStorage));
    this.router.navigate([`/management-mode`]);

  }

  addWords(): void {
    this.tableData.push({ 'Origin': '', 'Target': '' });
    this.tableData = [...this.tableData];
  }

  saveData(element: any) {
    const index = this.tableData.findIndex(item => item === element);
    this.tableData[index] = element;


  }
}
