




import {Location} from '@angular/common';
import {
  ANIMATION_MODULE_TYPE,
  ComponentRef,
  Inject,
  Injectable,
  InjectionToken,
  Injector,
  OnDestroy,
  Optional,
  SkipSelf,
  TemplateRef,
  Type,
  inject,
} from '@angular/core';

import {defer, Observable, Subject} from 'rxjs';
import {Dialog, DialogConfig} from '@angular/cdk/dialog';
import {startWith} from 'rxjs/operators';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogConfig, MatDialogContainer, MatDialogRef } from '@angular/material/dialog';
import { ComponentType, Overlay, OverlayContainer } from '@angular/cdk/overlay';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet, MatBottomSheetConfig, MatBottomSheetContainer, MatBottomSheetRef } from '@angular/material/bottom-sheet';
let uniqueId = 0;
@Injectable({
  providedIn: 'root'
})
export class CustomDialogService  {
  private readonly _openDialogsAtThisLevel: MatDialogRef<any>[] = [];
  private readonly _afterAllClosedAtThisLevel = new Subject<void>();
  private readonly _afterOpenedAtThisLevel = new Subject<MatDialogRef<any>>();
  protected _dialog: Dialog;
  protected dialogConfigClass = MatDialogConfig;

  private readonly _dialogRefConstructor: Type<MatDialogRef<any>>;
  private readonly _dialogContainerType: Type<MatDialogContainer>;
  private readonly _dialogDataToken: InjectionToken<any>;
  private _bottomSheetRefAtThisLevel: MatBottomSheetRef<any> | null = null;
  /** Keeps track of the currently-open dialogs. */
  get openDialogs(): MatDialogRef<any>[] {
    return this._parentDialog ? this._parentDialog.openDialogs : this._openDialogsAtThisLevel;
  }

  /** Stream that emits when a dialog has been opened. */
  get afterOpened(): Subject<MatDialogRef<any>> {
    return this._parentDialog ? this._parentDialog.afterOpened : this._afterOpenedAtThisLevel;
  }

  private _getAfterAllClosed(): Subject<void> {
    const parent = this._parentDialog;
    return parent ? parent._getAfterAllClosed() : this._afterAllClosedAtThisLevel;
  }

  /**
   * Stream that emits when all open dialog have finished closing.
   * Will emit on subscribe if there are no open dialogs to begin with.
   */
  readonly afterAllClosed: Observable<void> = defer(() =>
    this.openDialogs.length
      ? this._getAfterAllClosed()
      : this._getAfterAllClosed().pipe(startWith(undefined)),
  ) as Observable<any>;

  get _openedBottomSheetRef(): MatBottomSheetRef<any> | null {
    const parent = this._parentBottomSheet;
    return parent ? parent._openedBottomSheetRef : this._bottomSheetRefAtThisLevel;
  }

  set _openedBottomSheetRef(value: MatBottomSheetRef<any> | null) {
    if (this._parentBottomSheet) {
      this._parentBottomSheet._openedBottomSheetRef = value;
    } else {
      this._bottomSheetRefAtThisLevel = value;
    }
  }


  constructor(
    private _overlay: Overlay,
    injector: Injector,
    /**
     * @deprecated `_location` parameter to be removed.
     * @breaking-change 10.0.0
     */
    @Optional() location: Location,
    @Optional() @Inject(MAT_DIALOG_DEFAULT_OPTIONS) private _defaultOptions: MatDialogConfig,
    @Inject(MAT_DIALOG_SCROLL_STRATEGY) private _scrollStrategy: any,
    @Optional() @SkipSelf() private _parentDialog: CustomDialogService,
    @Optional() @SkipSelf() private _parentBottomSheet: MatBottomSheet,
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 15.0.0
     */
    _overlayContainer: OverlayContainer,
    /**
     * @deprecated No longer used. To be removed.
     * @breaking-change 14.0.0
     */
    @Optional()
    @Inject(ANIMATION_MODULE_TYPE)
    _animationMode?: 'NoopAnimations' | 'BrowserAnimations',
  ) {
    this._dialog = injector.get(Dialog);

    this._dialogRefConstructor = MatDialogRef;
    this._dialogContainerType = MatDialogContainer;
    this._dialogDataToken = MAT_DIALOG_DATA;
  }

  /**
   * Opens a modal dialog containing the given component.
   * @param component Type of the component to load into the dialog.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  open<T, D = any, R = any>(
    component: ComponentType<T>,
    config?: MatDialogConfig<D>,
  ): MatDialogRef<T, R>;

  /**
   * Opens a modal dialog containing the given template.
   * @param template TemplateRef to instantiate as the dialog content.
   * @param config Extra configuration options.
   * @returns Reference to the newly-opened dialog.
   */
  open<T, D = any, R = any>(
    template: TemplateRef<T>,
    config?: MatDialogConfig<D>,
  ): MatDialogRef<T, R>;

  open<T, D = any, R = any>(
    template: ComponentType<T> | TemplateRef<T>,
    config?: MatDialogConfig<D>,
  ): MatDialogRef<T, R>;

  open<T, D = any, R = any>(
    componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    config?: MatDialogConfig<D>,
  ): MatDialogRef<T, R> {
    let dialogRef: MatDialogRef<T, R>;
    config = {...(this._defaultOptions || new MatDialogConfig()), ...config};
    config.id = config.id || `mat-mdc-dialog-${uniqueId++}`;
    config.scrollStrategy = config.scrollStrategy || this._scrollStrategy();

    const cdkRef = this._dialog.open<R, D, T>(componentOrTemplateRef, {
      ...config,
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
      // Disable closing since we need to sync it up to the animation ourselves.
      disableClose: true,
      // Disable closing on destroy, because this service cleans up its open dialogs as well.
      // We want to do the cleanup here, rather than the CDK service, because the CDK destroys
      // the dialogs immediately whereas we want it to wait for the animations to finish.
      closeOnDestroy: false,
      // Disable closing on detachments so that we can sync up the animation.
      // The Material dialog ref handles this manually.
      closeOnOverlayDetachments: false,
      container: {
        type: this._dialogContainerType,
        providers: () => [
          // Provide our config as the CDK config as well since it has the same interface as the
          // CDK one, but it contains the actual values passed in by the user for things like
          // `disableClose` which we disable for the CDK dialog since we handle it ourselves.
          {provide: this.dialogConfigClass, useValue: config},
          {provide: DialogConfig, useValue: config},
        ],
      },
      templateContext: () => ({dialogRef}),
      providers: (ref, cdkConfig, dialogContainer) => {
        dialogRef = new this._dialogRefConstructor(ref, config, dialogContainer);
        dialogRef.updatePosition(config?.position);
        return [
          {provide: this._dialogContainerType, useValue: dialogContainer},
          {provide: this._dialogDataToken, useValue: cdkConfig.data},
          {provide: this._dialogRefConstructor, useValue: dialogRef},
        ];
      },
    });

    // This can't be assigned in the `providers` callback, because
    // the instance hasn't been assigned to the CDK ref yet.
    (dialogRef! as {componentRef: ComponentRef<T>}).componentRef = cdkRef.componentRef!;
    dialogRef!.componentInstance = cdkRef.componentInstance!;

    this.openDialogs.push(dialogRef!);
    this.afterOpened.next(dialogRef!);

    dialogRef!.afterClosed().subscribe(() => {
      const index = this.openDialogs.indexOf(dialogRef);

      if (index > -1) {
        this.openDialogs.splice(index, 1);

        if (!this.openDialogs.length) {
          this._getAfterAllClosed().next();
        }
      }
    });

    return dialogRef!;
  }




 



  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll(): void {
    this._closeDialogs(this.openDialogs);
  }

  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id: string): MatDialogRef<any> | undefined {
    return this.openDialogs.find(dialog => dialog.id === id);
  }

  dismiss<R = any>(result?: R): void {
    if (this._openedBottomSheetRef) {
      this._openedBottomSheetRef.dismiss(result);
    }
  }

  ngOnDestroy() {
    // Only close the dialogs at this level on destroy
    // since the parent service may still be active.
    this._closeDialogs(this._openDialogsAtThisLevel);
    this._afterAllClosedAtThisLevel.complete();
    this._afterOpenedAtThisLevel.complete();

    if (this._bottomSheetRefAtThisLevel) {
      this._bottomSheetRefAtThisLevel.dismiss();
    }
  }

  private _closeDialogs(dialogs: MatDialogRef<any>[]) {
    let i = dialogs.length;

    while (i--) {
      dialogs[i].close();
    }
  }
}
