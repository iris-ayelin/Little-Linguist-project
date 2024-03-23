import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogRef,MatDialogActions,MatDialogContent,MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,],
  templateUrl: './confirmation-dialog.component.html',
  styleUrl: './confirmation-dialog.component.css'
})
export class ConfirmationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) { 
    console.log(this.data)
  }
  onClick(isConfirm:boolean){
    this.dialogRef.close(isConfirm);

  }

}
