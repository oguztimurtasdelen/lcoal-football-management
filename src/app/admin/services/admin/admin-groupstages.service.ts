import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { GroupStagesModel } from "../../models/admin-groupstages.model";

@Injectable({providedIn: 'root'})
export class GroupStagesService {
  private groupstageList: GroupStagesModel[] = [];
  private groupstageListSub = new Subject<GroupStagesModel[]>();

  constructor(private http: HttpClient) {}

  getGroupstages(leagueId: number) {
    try {
      this.http
        .get<{error: boolean, message: string, groupstageList: GroupStagesModel[]}>(
          'http://localhost:3000/admin/gruplar/' + leagueId
        )
        .subscribe((data) => {
          if (!data.error) {
            this.groupstageList = data.groupstageList;
            this.groupstageListSub.next([...this.groupstageList]);
          } else {
            console.log(data.message);
          }
        });
    } catch (error) {
      console.log(error)
    }
  }

  getGroupStageListUpdateListener() {
    return this.groupstageListSub.asObservable();
  }

  createGroupStage(groupstageInfo: GroupStagesModel) {
    try {
      this.http
        .post<{error: boolean, message: string, groupstageId: number}>(
          'http://localhost:3000/admin/gruplar', groupstageInfo
        )
        .subscribe((data) => {
          if (!data.error) {
            /*
            groupstageInfo.id = data.groupstageId;
            this.groupstageList.push(groupstageInfo);
            this.groupstageListSub.next([...this.groupstageList]);
            */
          } else {
            console.log(data.message);
          }
        });

    } catch (error) {
      console.log(error);
    }
  }

  updateGroupStage(groupstageInfo: GroupStagesModel) {
    try {
      this.http
        .put<{error: boolean, message: string}>(
          'http://localhost:3000/admin/gruplar/' + groupstageInfo.id, groupstageInfo
        )
        .subscribe((data) => {
          if (!data.error) {
            /*
            this.groupstageList.forEach((item, i) => {
              if (item.id == groupstageInfo.id) {
                this.groupstageList[i] = groupstageInfo;
                if (item.leagueId !== groupstageInfo.leagueId) {
                  const filteredGroupstageList = this.groupstageList.filter(group => group.leagueId !== groupstageInfo.leagueId);
                  this.groupstageList = filteredGroupstageList;
                }
              }
            });

            this.groupstageListSub.next([...this.groupstageList]);
            */
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error)
    }
  }

  deleteGroupStage(groupstageId: number) {
    try {
      this.http
        .delete<{error: boolean, message: string}>(
          'http://localhost:3000/admin/gruplar/' + groupstageId
        )
        .subscribe((data) => {
          if (!data.error) {
            const filteredGroupstageList = this.groupstageList.filter(group => group.id !== groupstageId);
            this.groupstageList = filteredGroupstageList;
            this.groupstageListSub.next([...this.groupstageList]);
          } else {
            console.log(data.message);
          }
        })
    } catch (error) {
      console.log(error);
    }
  }
}
