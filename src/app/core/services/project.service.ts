import { Injectable } from '@angular/core';
import { GithubService } from './github.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  currentProject: any;

  constructor(private githubService: GithubService) {}

  async setCurrentProject(projectId: number): Promise<void> {
    this.currentProject = await this.githubService.getProject(projectId);
  }
}
