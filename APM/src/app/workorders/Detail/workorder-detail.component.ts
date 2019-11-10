import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Workorder } from '../Models/workorder';
import { WorkorderService } from '../Services/workorder.service';

@Component({
  templateUrl: './workorder-detail.component.html',
  styleUrls: ['./workorder-detail.component.css']
})
export class WorkorderDetailComponent implements OnInit {
  pageTitle = 'Workorder Detail';
  errorMessage = '';
  workorder: Workorder | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private workorderService: WorkorderService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getWorkorder(id);
    }
  }

  getWorkorder(id: number) {
    this.workorderService.getWorkorder(id).subscribe({
      next: workorder => this.workorder = workorder,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/workorders']);
  }

}
