import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { WorkorderEditComponent } from './workorder-edit.component';

@Injectable({
  providedIn: 'root'
})
export class WorkorderEditGuard implements CanDeactivate<WorkorderEditComponent> {
  canDeactivate(component: WorkorderEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.productForm.dirty) {
      const productName = component.productForm.get('productName').value || 'New Product';
      return confirm(`Navigate away and lose all changes to ${productName}?`);
    }
    return true;
  }
}
