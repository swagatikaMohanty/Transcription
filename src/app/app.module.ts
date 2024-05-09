import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { transcribeBrokerService } from 'src/Services/transcribe.broker';
import { HttpClientModule } from '@angular/common/http';
import { SummaryBrokerService } from 'src/Services/summary.broker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule 
  ],
  providers: [transcribeBrokerService,SummaryBrokerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
