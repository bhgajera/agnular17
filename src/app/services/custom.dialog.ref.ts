import { MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Observable, of } from 'rxjs';

export class CustomDialogRef<T = any, R = any> {
  private ref: MatDialogRef<T, R> | MatBottomSheetRef<T, R>;

  constructor(ref: MatDialogRef<T, R> | MatBottomSheetRef<T, R>) {
    this.ref = ref;
  }

  // Close or dismiss based on type
  close(result?: R): void {
    if (this.ref instanceof MatDialogRef) {
      this.ref.close(result);
    } else if (this.ref instanceof MatBottomSheetRef) {
      this.ref.dismiss(result);
    }
  }

  // Unified afterClosed observable
  afterClosed(): Observable<R | undefined> {
    return this.ref instanceof MatDialogRef
      ? this.ref.afterClosed()
      : this.ref instanceof MatBottomSheetRef
      ? this.ref.afterDismissed()
      : of(undefined);
  }
}
