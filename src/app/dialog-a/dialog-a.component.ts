import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CustomDialogRef } from '../services/custom.dialog.ref';
import { CustomDialogBottomSheetService } from '../services/custom.dialog.bottomsheet';
import { MAT_CUSTOM_DIALOG_DATA } from '../services/custom-dialog-data.token';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-dialog-a',
  templateUrl: './dialog-a.component.html',
  styleUrl: './dialog-a.component.scss'
})
export class DialogAComponent {
  private dialogRef: CustomDialogRef<any, any>;

  constructor(private customDialogService: CustomDialogBottomSheetService,
    @Inject(MAT_CUSTOM_DIALOG_DATA) public data: DialogData

  ) {
    this.dialogRef = this.customDialogService.getActiveDialogRef()!;
    console.log('data :', data);
  }

  onNoClick(): void {
    this.dialogRef.close(); // Close the dialog or bottom sheet
  }
}
