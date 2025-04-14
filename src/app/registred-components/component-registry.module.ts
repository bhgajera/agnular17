import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button/button.component';
import { LinkComponent } from './link/link.component';
import { ListComponent } from './list/list.component';
import { ComponentRegistryService } from './component-registry.service';

@NgModule({
  declarations: [ButtonComponent, LinkComponent, ListComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, LinkComponent, ListComponent],
  providers: [ComponentRegistryService]
})
export class ComponentRegisteryModule {
    constructor(componentRegistry: ComponentRegistryService) {
        componentRegistry.register('button', ButtonComponent);
        componentRegistry.register('link', LinkComponent);
        componentRegistry.register('list', ListComponent);
    }
}
