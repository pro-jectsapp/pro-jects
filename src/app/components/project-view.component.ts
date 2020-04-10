import { Component } from '@angular/core';
import { ProjectService } from '../core/services/project.service';

@Component({
  selector: 'app-project-view',
  templateUrl: '../views/project-view/project-view.component.html',
  styleUrls: ['../views/project-view/project-view.component.styl'],
})
export class ProjectViewComponent {
  constructor(public projectService: ProjectService) {}
}
