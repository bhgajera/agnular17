import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, QueryList, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss'
})
export class DialogContentComponent implements AfterViewInit, AfterContentInit  {
  
  // @ContentChild('dialogControl', { static: false }) dialogContend!: ElementRef;
  // @ContentChild('.customContent', { static: false }) content: ElementRef | undefined;
  // @ContentChild('customContent', { static: false }) content1: ElementRef | undefined;
  // @ContentChildren('card-title') title: QueryList<ElementRef> | undefined;
  // @ContentChildren('card-body') body: QueryList<ElementRef> | undefined;
  @ContentChild('my-class') childElement: ElementRef | undefined;
  @ContentChild('cardTitle', { static: false }) cardTitle: ElementRef | undefined;
  ngAfterViewInit(): void {
    console.log('card title',this.cardTitle);
    // Ensure content is projected before accessing
   // console.log(this.dialogContend);  // This should now work correctly
  }

  ngAfterContentInit(): void {
    // if (this.content) {
    //   console.log('Projected content:', this.content.nativeElement.textContent);
    // }
    // if (this.title && this.title.length > 0) {
    //   console.log('Projected title content:', this.title.first.nativeElement.textContent);
    // }
    // if (this.body && this.body.length > 0) {
    //   console.log('Projected body content:', this.body.first.nativeElement.textContent);
    // }
    // // Ensure content is projected before accessing
    // console.log(this.dialogContend);  // This should now work correctly
    console.log('child Element',this.childElement);
    console.log('card title',this.cardTitle);
  }
}
