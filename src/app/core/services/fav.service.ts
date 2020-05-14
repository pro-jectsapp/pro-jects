import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavService {
  public favProjects: any[] = [];

  addFavProject(project: any): void {
    this.getFavProjects();
    if (!this.favProjects.find(proj => proj.id === project.id)) {
      this.favProjects.push(project);
      localStorage.setItem('favProjects', JSON.stringify(this.favProjects));
    }
  }

  getFavProjects() {
    this.favProjects = JSON.parse(localStorage.getItem('favProjects')) || [];
  }

  removeFavProject(projectId: number): void {
    this.getFavProjects();
    const index = this.favProjects.findIndex(proj => proj.id === projectId);
    if (typeof index === 'number') {
      this.favProjects.splice(index, 1);
      localStorage.setItem('favProjects', JSON.stringify(this.favProjects));
    }
  }
}
