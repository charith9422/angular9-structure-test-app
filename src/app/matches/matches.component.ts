import { Component, OnInit } from "@angular/core";
/* import { HttpClient } from "@angular/common/http";
import { InitialService } from "../services/initial.service";
import { ConfigurationService } from "../services/configuration.service"; */
import { Match } from "./match";
import { MatchesService } from "./matches.service";
import { map, toArray } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Matches } from './matches';

@Component({
  selector: "app-matches",
  templateUrl: "./matches.component.html",
  styleUrls: ["./matches.component.css"]
})
export class MatchesComponent implements OnInit {
  constructor(private matchesServices:MatchesService,private spinner: NgxSpinnerService) {}

  matches: Matches = [];

  ngOnInit(): void {
    this.spinner.show();
    this.getMatchDetails();
  }

  getMatchDetails() {
    
    this.matchesServices.getMatches().subscribe(res =>{
      console.log(res)
      this.matches = res
      //debugger
      this.spinner.hide();
    })
  }
}
