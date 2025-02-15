import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { SeasonsModel } from "../models/application-seasons.model";

import { globalFunctions } from "../../functions/global.function";

import { environment } from "../../../environments/environment";

@Injectable({providedIn: 'root'})
export class SeasonsService {
  private seasonsList: SeasonsModel[] = [];
  private seasonsListSub = new Subject<SeasonsModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
  ) {}

  getSeasons() {
    this.http
      .get<{data: SeasonsModel[]}>(
        environment.serverUrl + "seasons"
      )
      .subscribe({
        next: (data) => {
          this.seasonsList = data.data;
          this.seasonsListSub.next([...this.seasonsList]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getSeasonsListUpdateListener() {
    return this.seasonsListSub.asObservable();
  }
}
