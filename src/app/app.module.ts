import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';

import { NgxResizableModule } from '@3dgenomes/ngx-resizable';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NgxResizableModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
