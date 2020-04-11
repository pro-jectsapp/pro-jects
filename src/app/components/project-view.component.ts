import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../core/services/project.service';
import marked from 'marked';

@Component({
  selector: 'app-project-view',
  templateUrl: '../views/project-view/project-view.component.html',
  styleUrls: ['../views/project-view/project-view.component.styl'],
})
export class ProjectViewComponent implements OnInit {
  selectedColumn: any;

  constructor(public projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.projectChanged.subscribe(() => {
      console.log(this.projectService.currentProject);
    });
    console.log(marked('dupa'));
  }

  onColumnClicked(column): void {
    this.selectedColumn = column;
  }
}
