import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { ComponentRegistryService } from '../registred-components/component-registry.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']  // <-- Corrected here
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true }) container!: ViewContainerRef;

  constructor(private registryService: ComponentRegistryService) {}

  ngAfterViewInit() {
    this.loadComponent('button');  // Load component after view initialization
  }

  loadComponent(componentName: string) {
    const component = this.registryService.getComponent(componentName);
    if (component) {
      const componentRef = this.container.createComponent(component);
    }
  }
}
