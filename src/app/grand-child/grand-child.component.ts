import { AfterContentInit, Component, ContentChild, TemplateRef } from '@angular/core';
import { CustomTemplateDirective } from '../custom-template.directive';

@Component({
  selector: 'app-grandchild',
  templateUrl: './grand-child.component.html',
  styleUrl: './grand-child.component.scss'
})
export class GrandChildComponent  implements AfterContentInit{
  @ContentChild(CustomTemplateDirective)
  templateDirective!: CustomTemplateDirective;

  ngAfterContentInit() {
    console.log('GrandChild: templateDirective', this.templateDirective);
  }
}
