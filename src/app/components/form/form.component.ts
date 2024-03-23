import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormComponent {

}
