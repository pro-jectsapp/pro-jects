import { Component, ViewChild } from '@angular/core';
import { GithubService } from '../core/services/github.service';
import { ProjectService } from '../core/services/project.service';
import { SplitComponent } from 'angular-split';

@Component({
  selector: 'app-root',
  templateUrl: '../views/app/app.component.html',
  styleUrls: ['../views/app/app.component.styl'],
})
export class AppComponent {
  @ViewChild(SplitComponent) splitComponent: SplitComponent;

  constructor(public githubService: GithubService, public projectService: ProjectService) {}

  onColumnSelected(): void {
    this.splitComponent.setVisibleAreaSizes([0, 100]);
  }
}
