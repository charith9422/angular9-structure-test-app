import { BrowserModule } from "@angular/platform-browser";
import { NgModule, APP_INITIALIZER } from "@angular/core";

import { AppComponent } from "./app.component";
import { InitialService } from "./services/initial.service";
import { ConfigurationService } from './services/configuration.service';
import { HttpClientModule } from '@angular/common/http';
import { MatchesComponent } from './matches/matches.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent, MatchesComponent],
  imports: [BrowserModule,HttpClientModule,BrowserAnimationsModule,NgxSpinnerModule, AppRoutingModule],
  providers: [
    InitialService,
    {
    
      provide: APP_INITIALIZER,
      useFactory: ConfigLoader,
      deps: [InitialService],
      multi: true
    },
    ConfigurationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

export function ConfigLoader(configService: InitialService) {
  return () => configService.load("../assets/configuration.json");
}
