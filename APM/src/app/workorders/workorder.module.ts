import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { WorkorderData } from './data';

import { ProductListComponent } from './ProductExample/product-list.component';
import { WorkorderListComponent } from './List/workorder-list.component';

import { ProductDetailComponent } from './ProductExample/product-detail.component';
import { WorkorderDetailComponent } from './Detail/workorder-detail.component';

import { ProductEditComponent } from './ProductExample/product-edit.component';
import { WorkorderEditComponent } from './Edit/workorder-edit.component';

import { ProductEditGuard } from './ProductExample/product-edit.guard';
import { WorkorderEditGuard } from './Edit/workorder-edit.guard';


@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(WorkorderData, {delay: 1500}),
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
export class WorkorderModule { }
