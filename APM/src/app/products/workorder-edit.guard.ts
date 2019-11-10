import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

import { WorkorderEditComponent } from './workorder-edit.component';

@Injectable({
  providedIn: 'root'
})
export class WorkorderEditGuard implements CanDeactivate<WorkorderEditComponent> {
  canDeactivate(component: WorkorderEditComponent): Observable<boolean> | Promise<boolean> | boolean {
    if (component.workorderForm.dirty) {
      const workorderName = component.workorderForm.get('workorderName').value || 'New Product';
      return confirm(`Navigate away and lose all changes to ${workorderName}?`);
    }
    return true;
  }
}
