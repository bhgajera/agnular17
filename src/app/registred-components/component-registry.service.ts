import { Injectable, ComponentFactoryResolver, Injector } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { LinkComponent } from './link/link.component';
import { ListComponent } from './list/list.component';

@Injectable({
  providedIn: 'root',
})
export class ComponentRegistryService {
  private components: Map<string, any> = new Map();

  constructor() {
    // Register components
   
  }

  register(name: string, component: any) {
    this.components.set(name, component);
  }

  getComponent(name: string) {
    return this.components.get(name);
  }
}
