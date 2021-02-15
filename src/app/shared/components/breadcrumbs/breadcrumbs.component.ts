import { Component, Input, OnInit } from '@angular/core';

import { ModulePage } from '@shared/models/route';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  @Input() item?: ModulePage | null;

  constructor() { }

  ngOnInit(): void {

  }

}
