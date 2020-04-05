import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularSplitModule } from 'angular-split';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { ProjectsListComponent } from './components/projects-list.component';
import { GithubService } from './core/services/github.service';
import { ProjectService } from './core/services/project.service';
import { ProjectViewComponent } from './components/project-view.component';

@NgModule({
  declarations: [AppComponent, ProjectsListComponent, ProjectViewComponent],
  imports: [BrowserModule, AppRoutingModule, AngularSplitModule.forRoot()],
  providers: [GithubService, ProjectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
