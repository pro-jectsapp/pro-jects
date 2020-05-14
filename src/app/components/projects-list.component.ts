import { Component, OnInit } from '@angular/core';
import { GithubService } from '../core/services/github.service';
import { ProjectService } from '../core/services/project.service';
import { FavService } from '../core/services/fav.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: '../views/projects-list/projects-list.component.html',
  styleUrls: ['../views/projects-list/projects-list.component.styl'],
})
export class ProjectsListComponent implements OnInit {
  userProjects: any[] = [];

  constructor(
    private githubService: GithubService,
    private projectService: ProjectService,
    public favService: FavService,
  ) {}

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(): void {
    this.githubService.getUserProjects().then(projects => {
      this.userProjects = projects;
      this.favService.getFavProjects();
    });
  }

  onProjectClicked(projectId): void {
    this.projectService.setCurrentProject(projectId);
  }

  favProject(projectId): void {
    this.favService.addFavProject(this.userProjects.find(proj => proj.id === projectId));
  }

  removeFavProject(projectId): void {
    this.favService.removeFavProject(projectId);
  }
}
