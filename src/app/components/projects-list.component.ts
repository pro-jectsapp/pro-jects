import { Component, OnInit } from '@angular/core';
import { GithubService } from '../core/services/github.service';
import { ProjectService } from '../core/services/project.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: '../views/projects-list/projects-list.component.html',
  styleUrls: ['../views/projects-list/projects-list.component.styl'],
})
export class ProjectsListComponent implements OnInit {
  userProjects: any[] = [];
  orgProjects: any[] = [];

  constructor(private githubService: GithubService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.githubService.getUserProjects().then((projects) => {
      this.userProjects = projects;
    });
  }

  onProjectClicked(projectId): void {
    this.projectService.setCurrentProject(projectId);
  }
}
