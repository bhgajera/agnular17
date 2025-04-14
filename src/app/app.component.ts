import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAComponent } from './dialog-a/dialog-a.component';
import { CustomDialogBottomSheetService } from './services/custom.dialog.bottomsheet';
import printJS from "print-js";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular17';
  constructor(private customDialogService: CustomDialogBottomSheetService) {}
  openDialog(): void {
    console.log('test');
    const dialogRef = this.customDialogService.open(DialogAComponent, {
      data: {name: 'renbow', animal: 'Dog'},
    });
    
    
     // Optionally, listen to `afterClosed`
     dialogRef.afterClosed().subscribe(result => {
       console.log('Closed with result:', result);
     });
  }

  printPDF() {
   
    console.log('test');
  }
}

