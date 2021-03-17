import { Component, Input } from '@angular/core';

import { ModulePage } from '@core/models';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  @Input() item: ModulePage = { module: '', page: '' };
}
