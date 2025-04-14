import { AfterContentInit, Component, ContentChild, TemplateRef, ViewChild } from '@angular/core';
import { CustomTemplateDirective } from '../directives/custom-template.directive';

@Component({
  selector: 'plr-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrl: './page-layout.component.scss'
})
export class PlrPageLayoutComponent implements AfterContentInit {
  // @ContentChild('searchTemplateRef', { read: TemplateRef })
  // pageSearchTpl!: TemplateRef<any>;
  // @ContentChild('customSearch', { read: TemplateRef })
  // customSearch!: TemplateRef<any>;
  @ContentChild(CustomTemplateDirective)
  templateDirective!: CustomTemplateDirective;

  ngAfterContentInit() {
    console.log('GrandChild: templateDirective', this.templateDirective);
  }
}
