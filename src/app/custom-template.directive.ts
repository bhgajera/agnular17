// custom-template.directive.ts
import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[customTemplate]'
})
export class CustomTemplateDirective {
  constructor(public templateRef: TemplateRef<any>) {}
}
