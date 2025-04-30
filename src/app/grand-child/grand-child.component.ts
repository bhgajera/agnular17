import { AfterContentInit, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { CustomTemplateDirective } from '../custom-template.directive';

@Component({
  selector: 'app-grand-child',
  templateUrl: './grand-child.component.html',
  styleUrl: './grand-child.component.scss'
})
export class GrandChildComponent  implements AfterContentInit{
  @ContentChild('templateForGrandchild',{descendants:true}) templateForGrandchild!: TemplateRef<any>;

  ngAfterContentInit() {
    console.log('Template received in grandchild:', !!this.templateForGrandchild);
  }
}
