import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { WorkorderData } from './data';

import { ProductListComponent } from './product-list.component';
import { WorkorderListComponent } from './workorder-list.component';

import { ProductDetailComponent } from './product-detail.component';
import { WorkorderDetailComponent } from './workorder-detail.component';

import { ProductEditComponent } from './product-edit.component';
import { WorkorderEditComponent } from './workorder-edit.component';

import { ProductEditGuard } from './product-edit.guard';
import { WorkorderEditGuard } from './workorder-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(WorkorderData),
    RouterModule.forChild([
      { path: 'products', component: ProductListComponent },
      { path: 'workorders', component: WorkorderListComponent },
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'workorders/:id', component: WorkorderDetailComponent },
      {
        path: 'products/:id/edit',
        canDeactivate: [ProductEditGuard],
        component: ProductEditComponent
      },
      {
        path: 'workorders/:id/edit',
        canDeactivate: [WorkorderEditGuard],
        component: WorkorderEditComponent
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    WorkorderListComponent,
    ProductDetailComponent,
    WorkorderDetailComponent,
    ProductEditComponent,
    WorkorderEditComponent
  ]
})
export class ProductModule { }
