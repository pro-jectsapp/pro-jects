import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest/dist-web';

import { token } from '../../../auth-token';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private octokit: Octokit;
  private allProjects: any[];
  ghUser: any;

  constructor() {
    this.octokit = new Octokit({ auth: token, userAgent: '(pro)jects v.0.1.0' });
  }

  async checkUser(): Promise<void> {
    if (this.ghUser) {
      return;
    } else {
      const res = await this.octokit.users.getAuthenticated();
      this.ghUser = res.data;
    }
  }

  async getUserProjects(): Promise<any> {
    await this.checkUser();
    const projects = await this.octokit.projects.listForUser({ username: this.ghUser.login });
    this.allProjects = projects.data;
    return projects.data;
  }

  async getProject(projectId: number): Promise<any> {
    await this.checkUser();
    return (
      this.allProjects.find(data => data.id === projectId) ||
      (await this.octokit.projects.get({ project_id: projectId })).data
    );
  }

  async getProjectColumns(projectId: number): Promise<any> {
    await this.checkUser();
    return (
      await this.octokit.projects.listColumns({
        project_id: projectId,
        headers: {
          'If-None-Match': '',
        },
      })
    ).data;
  }

  async getColumnCards(columnId: number): Promise<any> {
    await this.checkUser();
    return (
      await this.octokit.projects.listCards({
        column_id: columnId,
        headers: {
          'If-None-Match': '',
        },
      })
    ).data;
  }

  async moveCard(cardId, pos): Promise<void> {
    await this.checkUser();
    await this.octokit.projects.moveCard({ card_id: cardId, position: pos });
  }

  async saveCard(cardId, note): Promise<void> {
    await this.checkUser();
    await this.octokit.projects.updateCard({ card_id: cardId, note });
  }
}
