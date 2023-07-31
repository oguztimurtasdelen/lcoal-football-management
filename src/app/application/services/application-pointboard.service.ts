import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject, Observable } from "rxjs";
import { concatMap, map } from "rxjs/operators";

import { PointBoardModel } from "../models/application-pointboard.model";

import { GroupStagesService } from "../services/application-groupstages.service";

import { globalFunctions } from "../../functions/global.function";

@Injectable({providedIn: 'root'})
export class PointBoardService {
  private pointBoardList: PointBoardModel[] = [];
  private pointBoardListSub = new Subject<PointBoardModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions,
    private groupstageService: GroupStagesService
  ) {}

  getPointBoard(_groupstageId: number, _matchWeek: number) {
    try {

      if (_matchWeek == null) {
        this.groupstageService.getPlayedLastMatchWeek(_groupstageId)
          .subscribe({
            next: (data) => {
              _matchWeek = data.matchWeek;
              this.getCurrentPointBoard(_groupstageId, _matchWeek)
                .subscribe((data) => {
                  this.pointBoardList = data.pointBoard;
                  this.pointBoardListSub.next([...this.pointBoardList]);
                });
            },
            error: (error) => {
              this.globalFunctions.showSnackBar('server.error');
            }
          });
      } else {
        this.getCurrentPointBoard(_groupstageId, _matchWeek)
          .subscribe({
            next: (data) => {
              this.pointBoardList = data.pointBoard;
              this.pointBoardListSub.next([...this.pointBoardList]);
            },
            error: (error) => {
              this.globalFunctions.showSnackBar('server.error');
            }
          });
      }
    } catch (error) {
      this.globalFunctions.showSnackBar('system.error');
    }
  }

  getPointBoardUpdateListener() {
    return this.pointBoardListSub.asObservable();
  }

  getCurrentPointBoard(_groupstageId: number, _matchWeek: number): Observable<any> {
    return this.http.get<{pointBoard: PointBoardModel[]}>(
      'http://localhost:3000/puan-tablosu/' + _groupstageId + '/' + _matchWeek
      );
  }
}
