import { Component, ContentChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrl: './child.component.scss'
})
export class ChildComponent {
  @ContentChild('myTemplate', { static: false }) template!: TemplateRef<any>;

  ngAfterContentInit() {
    // Optional: Check if template exists
    if (!this.template) {
      console.warn('Template not found in ChildComponent');
    }
  }
}
