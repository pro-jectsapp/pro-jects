import { Injectable } from '@angular/core';
import { Octokit } from '@octokit/rest';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class GithubService {
  private octokit: Octokit;
  private allProjects: any[];
  ghUser: any;

  constructor(private authService: AuthService) {
    if (authService.isLoggedIn()) {
      this.octokit = new Octokit({ auth: authService.getUser(), userAgent: '(pro)jects v.0.1.0' });
    }

    this.authService.loggedIn.subscribe(() => {
      if (this.authService.isLoggedIn()) {
        this.octokit = new Octokit({
          auth: authService.getUser(),
          userAgent: '(pro)jects v.0.1.0',
        });
      }
    });

    this.authService.loggedOut.subscribe(() => {
      if (!this.authService.isLoggedIn()) {
        this.octokit = undefined;
      }
    });
  }

  async checkUser(): Promise<boolean> {
    if (this.octokit) {
      if (this.ghUser) {
        return true;
      } else {
        let res;
        try {
          res = await this.octokit.users.getAuthenticated();
        } catch (err) {
          this.authService.logoutUser();
          return false;
        }
        this.ghUser = res.data;
        return true;
      }
    }
    return false;
  }

  async getUserProjects(): Promise<any> {
    if (await this.checkUser()) {
      const projects = await this.octokit.projects.listForUser({ username: this.ghUser.login });
      this.allProjects = projects.data;
      return projects.data;
    } else {
      throw new Error('User not logged in');
    }
  }

  async getProject(projectId: number): Promise<any> {
    if (await this.checkUser()) {
      return (
        this.allProjects.find(data => data.id === projectId) ||
        (await this.octokit.projects.get({ project_id: projectId })).data
      );
    } else {
      throw new Error('User not logged in');
    }
  }

  async getProjectColumns(projectId: number): Promise<any> {
    if (await this.checkUser()) {
      return (
        await this.octokit.projects.listColumns({
          project_id: projectId,
          headers: {
            'If-None-Match': '',
          },
        })
      ).data;
    } else {
      throw new Error('User not logged in');
    }
  }

  async getColumnCards(columnId: number): Promise<any> {
    if (await this.checkUser()) {
      return (
        await this.octokit.projects.listCards({
          column_id: columnId,
          headers: {
            'If-None-Match': '',
          },
        })
      ).data;
    } else {
      throw new Error('User not logged in');
    }
  }

  async moveCard(cardId, pos): Promise<void> {
    if (await this.checkUser()) {
      await this.octokit.projects.moveCard({ card_id: cardId, position: pos });
    } else {
      throw new Error('User not logged in');
    }
  }

  async saveCard(cardId, note): Promise<void> {
    if (await this.checkUser()) {
      await this.octokit.projects.updateCard({ card_id: cardId, note });
    } else {
      throw new Error('User not logged in');
    }
  }

  async deleteCard(cardId): Promise<void> {
    if (await this.checkUser()) {
      await this.octokit.projects.deleteCard({ card_id: cardId });
    } else {
      throw new Error('User not logged in');
    }
  }

  async createColumn(projectId, name): Promise<void> {
    if (await this.checkUser()) {
      await this.octokit.projects.createColumn({ project_id: projectId, name });
    }
  }

  async createCard(columnId, note): Promise<void> {
    if (await this.checkUser()) {
      await this.octokit.projects.createCard({ column_id: columnId, note });
    } else {
      throw new Error('User not logged in');
    }
  }

  async deleteColumn(columnId): Promise<void> {
    if (await this.checkUser()) {
      await this.octokit.projects.deleteColumn({ column_id: columnId });
    } else {
      throw new Error('User not logged in');
    }
  }
}
