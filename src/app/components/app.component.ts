import { Component, OnInit } from '@angular/core';
import { GithubService } from '../core/services/github.service';
import { ProjectService } from '../core/services/project.service';

@Component({
  selector: 'app-root',
  templateUrl: '../views/app/app.component.html',
  styleUrls: ['../views/app/app.component.styl'],
})
export class AppComponent implements OnInit {
  user: any;

  constructor(public githubService: GithubService, public projectService: ProjectService) {}

  ngOnInit(): void {
    this.githubService.checkUser();
  }
}
