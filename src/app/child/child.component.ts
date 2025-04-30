import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {
  @ContentChild('templateForChild',{descendants:true}) templateForChild!: TemplateRef<any>;
}
