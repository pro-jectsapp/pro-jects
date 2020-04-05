import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';

import { token } from '../../../auth-token';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private octokit: Octokit;
  ghUser: any;

  constructor() {
    this.octokit = new Octokit({ auth: token, userAgent: '(pro)jects v.0.1.0' });
  }

  async checkUser(): Promise<void> {
    if (this.ghUser) {
      console.log(this.ghUser);
      return;
    } else {
      const res = await this.octokit.users.getAuthenticated();
      this.ghUser = res.data;
    }
  }

  async getUserProjects(): Promise<any> {
    await this.checkUser();
    const projects = await this.octokit.projects.listForUser({ username: this.ghUser.login });
    return projects.data;
  }

  async getProject(projectId: number): Promise<any> {
    await this.checkUser();
    const project = await this.octokit.projects.get({ project_id: projectId });
    return project.data;
  }
}
