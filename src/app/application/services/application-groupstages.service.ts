import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";

import { GroupStagesModel } from "../models/application-groupstages.model";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class GroupStagesService {
  private groupstageList: GroupStagesModel[] = [];
  private groupstageListSub = new Subject<GroupStagesModel[]>();
  private weekSequence: Array<number>[] = [];
  private weekSequenceSub = new Subject<Array<number>[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getGroupstages(leagueId: number) {
    this.http
      .get<{data: GroupStagesModel[]}>(
        environment.serverUrl + "groupstages/" + leagueId
      )
      .subscribe({
        next: (data) => {
          this.groupstageList = data.data;
          this.groupstageListSub.next([...this.groupstageList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getGroupStageListUpdateListener() {
    return this.groupstageListSub.asObservable();
  }

  getGroupWeeks(groupstageId: number) {
    this.http
      .get<{data: Array<number>[]}>(
        environment.serverUrl + "groupstages/hafta-siralamasi/" + groupstageId
      )
      .subscribe({
        next: (data) => {
          this.weekSequence = data.data;
          this.weekSequenceSub.next([...this.weekSequence]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getGroupWeeksUpdateListener() {
    return this.weekSequenceSub.asObservable();
  }

  getPlayedLastMatchWeek(_groupstageId: number): Observable<any> {
    return this.http.get<{data: number}>(
      environment.serverUrl + "groupstages/son-musabaka-haftasi/" + _groupstageId
      );
  }
}
