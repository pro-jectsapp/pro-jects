import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatIconModule } from '@angular/material/icon';
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
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent,
    ProjectViewComponent,
    MarkdownParsePipe,
    SafeHtmlPipe,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularSplitModule.forRoot(),
    BrowserAnimationsModule,
    MatIconModule,
    MonacoEditorModule.forRoot(),
    FormsModule,
  ],
  providers: [GithubService, ProjectService],
  bootstrap: [AppComponent],
})
export class AppModule {}
