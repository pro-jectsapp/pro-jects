import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from '../core/services/github.service';
import { ProjectService } from '../core/services/project.service';
import { SplitComponent } from 'angular-split';
import { AuthService } from '../core/services/auth.service';
import axios from 'axios';

@Component({
  selector: 'app-root',
  templateUrl: '../views/app/app.component.html',
  styleUrls: ['../views/app/app.component.styl'],
})
export class AppComponent implements OnInit {
  @ViewChild(SplitComponent) splitComponent: SplitComponent;

  constructor(
    public githubService: GithubService,
    public projectService: ProjectService,
    public authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(map => {
      if (map.code && map.code.length === 20) {
        axios.get(`https://pro-jects.now.sh/api/authorize?code=${map.code}`).then(res => {
          if (res.data.access_token) {
            this.authService.setUser(res.data.access_token);
          }

          window.location.href = '/';
        });
      }
    });
  }

  onColumnSelected(): void {
    this.splitComponent.setVisibleAreaSizes([0, 100]);
  }

  logout(): void {
    this.authService.logoutUser();
  }
}
