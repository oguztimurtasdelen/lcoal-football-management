import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { Subscription } from 'rxjs';
import { Router } from "@angular/router";

import { FixtureModel } from "../../models/application-fixture.model";
import { FixtureService } from "../../services/application-fixtures.service";

import { globalFunctions } from "../../../functions/global.function";

@Component({
  selector: 'app-application-fixture-by-week',
  templateUrl: './fixture-by-week.component.html',
  styleUrls: ['../../../app.component.css', './fixture-by-week.component.css']
})
export class ApplicationFixtureByWeek implements OnInit, OnDestroy {
  toolbarTitle = "HAFTANIN KARŞILAŞMALARI";
  isLoading: boolean = false;
  fixtureList: FixtureModel[] = [];
  private fixtureListSub: Subscription;

  constructor(
    private fixtureService: FixtureService,
    private globalFunctions: globalFunctions,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fixtureListSub = this.fixtureService.getFixtureUpdateListener()
      .subscribe({
        next: (data: FixtureModel[]) => {
          if (data.length > 0) {
            this.fixtureList = data;
          } else {
            this.fixtureList = [];
          }
        }
      });
  }

  getFontAwesomeIcon(_icon: string): any {
    return this.globalFunctions.getFontAwesomeIcon(_icon);
  }

  getMatchDate(_date: Date): string {
    return this.globalFunctions.getLocalDateTime(_date);
  }

  getMatchStatus(status: string): string {
    return this.globalFunctions.getMatchStatusValue(status);
  }

  getMatchStatusClass(status: string): string {
    return this.globalFunctions.getMatchStatusClass(status);
  }

  showStadiumDetails(_stadiumId: number) {
    if (_stadiumId !== null) {
      this.router.navigate(['/sahalar/detaylar', _stadiumId]);
    } else {
      this.globalFunctions.showSnackBar('application.error.stadium.notfound');
    }

  }

  showTeamDetails(_teamId: number) {
    if (_teamId !== null) {
      this.router.navigate(['/takimlar/detaylar', _teamId]);
    } else {
      this.globalFunctions.showSnackBar('application.error.team.notfound');
    }

  }

  ngOnDestroy(): void {
    this.fixtureListSub.unsubscribe();
  }
}
