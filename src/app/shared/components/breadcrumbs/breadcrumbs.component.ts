import { Component, Input, OnInit } from '@angular/core';

import { ModulePage } from '@shared/models';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() item!: ModulePage;

  constructor() { }

  ngOnInit(): void {

  }

}
