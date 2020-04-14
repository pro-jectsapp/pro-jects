import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularSplitModule } from 'angular-split';
import { MonacoEditorModule } from 'ngx-monaco-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { ProjectsListComponent } from './components/projects-list.component';
import { GithubService } from './core/services/github.service';
import { ProjectService } from './core/services/project.service';
import { ProjectViewComponent } from './components/project-view.component';
import { MarkdownParsePipe } from './core/utils/markdown-parse.pipe';
import { SafeHtmlPipe } from './core/utils/safe-html.pipe';
import { CardComponent } from './components/card.component';
import { AuthService } from './core/services/auth.service';
import { LoginComponent } from './components/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    ProjectViewComponent,
    MarkdownParsePipe,
    SafeHtmlPipe,
    CardComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSplitModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
    MatProgressSpinnerModule,
  ],
  providers: [GithubService, ProjectService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
