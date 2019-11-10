import { Component, OnInit } from '@angular/core';

import { Workorder } from './workorder';
import { WorkorderService } from './workorder.service';

@Component({
  templateUrl: './workorder-list.component.html',
  styleUrls: ['./workorder-list.component.css']
})
export class WorkorderListComponent implements OnInit {
  pageTitle = 'Workorder List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;
  errorMessage = '';

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredWorkorders = this.listFilter ? this.performFilter(this.listFilter) : this.workorders;
  }

  filteredWorkorders: Workorder[] = [];
  workorders: Workorder[] = [];

  constructor(private workorderService: WorkorderService) { }

  performFilter(filterBy: string): Workorder[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.workorders.filter((workorder: Workorder) =>
      workorder.workorderName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.workorderService.getWorkorders().subscribe({
      next: workorders => {
        this.workorders = workorders;
        this.filteredWorkorders = this.workorders;
      },
      error: err => this.errorMessage = err
    });
  }
}
