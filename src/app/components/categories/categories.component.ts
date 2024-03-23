import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
//import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';




@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, RouterModule, MatButtonModule, MatDialogModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class Categories implements OnInit {
  constructor(private dialog: MatDialog, private router: Router, private cdf: ChangeDetectorRef) { }
  detailsArray: any = [];
  displayedColumns: string[] = ['Category Name', 'No. of words', 'Updated Date', 'Actions'];

  ngOnInit() {
    const detailsString = localStorage.getItem('category-details');
    if (detailsString) {
        const details: any[] = JSON.parse(detailsString);
        if (Array.isArray(details) && details?.length > 0) {
          this.detailsArray = details;
          this.detailsArray.forEach((category: any) => {
            category['id'] = category.id;
            category['Category Name'] = category.category;
            category['No. of words'] = category.words.length;
            category['Updated Date'] = new Date(category.updateDate).toLocaleDateString('en-US', {hour: 'numeric', minute: 'numeric', hour12: true, timeZone: 'Asia/Jerusalem'});
          });

          this.detailsArray.sort((a: { [x: string]: string; }, b: { [x: string]: string; }) => {
            const nameA = a['Category Name'].toUpperCase();
            const nameB = b['Category Name'].toUpperCase(); 
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          });
        }
      }
    }

  deleteCategory(category: any): void {
    const selectedCategory = this.detailsArray.find((cat: any) => cat['id'] === category['id']);
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: selectedCategory
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result)
        const index = this.detailsArray.findIndex((cat: any) => cat['id'] === selectedCategory.id);
        if (index !== -1) {
          this.detailsArray.splice(index, 1);
          this.detailsArray = [...this.detailsArray];
          this.cdf.markForCheck();
          localStorage.setItem('category-details', JSON.stringify(this.detailsArray));
        }
      }
    });
  }

  editCategory(category: any): void {
    this.router.navigate(['/add-category'], { queryParams: { id: category.id } });
  }

  navigate(): void {
    this.router.navigate([`/add-category`]);
  }

}