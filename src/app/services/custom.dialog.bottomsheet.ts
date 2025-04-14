import { Injectable, Injector, TemplateRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Platform } from '@angular/cdk/platform';
import { Observable } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CustomDialogRef } from './custom.dialog.ref';
import { MAT_CUSTOM_DIALOG_DATA } from './custom-dialog-data.token';
@Injectable({
  providedIn: 'root',
})
export class CustomDialogBottomSheetService {
  private dialog: MatDialog | undefined;
  private bottomSheet: MatBottomSheet | undefined;
  private activeDialogRef: CustomDialogRef<any, any> | undefined;

  constructor(private injector: Injector, private platform: Platform, private breakpointObserver: BreakpointObserver) {}

  open<T, D = any, R = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    data?: D
  ): CustomDialogRef<T, R> {
    const isMobile = this.breakpointObserver.isMatched(Breakpoints.Handset);

    if (isMobile) {
      // Lazy load MatBottomSheet only if on mobile
      const customInjector = Injector.create({
        providers: [
          {
            provide: MAT_CUSTOM_DIALOG_DATA,
            useValue: data
          }
        ],
      
      });
      this.bottomSheet = this.bottomSheet || this.injector.get(MatBottomSheet);
      const ref = this.bottomSheet.open(componentOrTemplateRef as ComponentType<T>,{data,  injector:customInjector} as any) as MatBottomSheetRef<T, R>;
      return new CustomDialogRef(ref);
    } else {

      const dialogConfig: MatDialogConfig = {
        data,
        injector: Injector.create({
          providers: [
            {
              provide: MAT_CUSTOM_DIALOG_DATA,
              useValue: data
            }
          ],
        }),
      };
      // Lazy load MatDialog only if on desktop
      this.dialog = this.dialog || this.injector.get(MatDialog);
      const ref = this.dialog.open(componentOrTemplateRef, {...dialogConfig}) as MatDialogRef<T, R>;
      return new CustomDialogRef(ref);
    }
  }

  closeActiveDialog(): void {
    if (this.activeDialogRef) {
      this.activeDialogRef.close();
      this.activeDialogRef = undefined;
    }
  }

  getActiveDialogRef(): CustomDialogRef<any, any> | undefined {
    return this.activeDialogRef;
  }
}
