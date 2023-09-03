import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { DisciplinaryBoardFileModel } from "../models/admin-disciplinaryboardfiles.model";
import { globalFunctions } from "../../functions/global.function";

@Injectable({ providedIn: 'root' })
export class DisciplinaryBoardFilesService {

  private disciplinaryBoardFileList: DisciplinaryBoardFileModel[] = [];
  private disciplinaryBoardFileListSub = new Subject<DisciplinaryBoardFileModel[]>();

  constructor(
    private http: HttpClient,
    private globalFunctions: globalFunctions
    ) {}

  getDisciplinaryBoardFiles(seasonId: number, caseType: string) {
    this.http
      .get<{ data: DisciplinaryBoardFileModel[] }>(
        'http://localhost:3000/admin/disiplin-kurulu-dosyalari/' + seasonId + '/' + caseType
      )
      .subscribe({
        next: (data) => {
          this.disciplinaryBoardFileList = data.data;
          this.disciplinaryBoardFileList.length > 0 ? this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]) : this.disciplinaryBoardFileListSub.next([]);
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  getDisciplinaryBoardFilesUpdateListener() {
    return this.disciplinaryBoardFileListSub.asObservable();
  }

  createDisciplinaryBoardFile(disciplinaryBoardFileInfo: DisciplinaryBoardFileModel) {
    this.http
      .post<{ data: DisciplinaryBoardFileModel }>(
        'http://localhost:3000/admin/disiplin-kurulu-dosyalari', disciplinaryBoardFileInfo
      )
      .subscribe({
        next: (data) => {
          this.disciplinaryBoardFileList.push(data.data);
          this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
          this.globalFunctions.showSnackBar("system.success.create");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  updateDisciplinaryBoardFile(disciplinaryBoardFileInfo: DisciplinaryBoardFileModel) {
    this.http
      .put<{ data: DisciplinaryBoardFileModel }>(
        'http://localhost:3000/admin/disiplin-kurulu-dosyalari/' + disciplinaryBoardFileInfo.id, disciplinaryBoardFileInfo
      )
      .subscribe({
        next: (data) => {
          this.disciplinaryBoardFileList.forEach((item, i) => {
            if (item.id == disciplinaryBoardFileInfo.id) {
              this.disciplinaryBoardFileList[i] = data.data;
            }
          });
          this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
          this.globalFunctions.showSnackBar("system.success.update");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }

  deleteDisciplinaryBoardFile(disciplinaryBoardFileId: number) {
    this.http
      .delete<{ }>(
        'http://localhost:3000/admin/disiplin-kurulu-dosyalari/' + disciplinaryBoardFileId
      )
      .subscribe({
        next: (data) => {
          const filteredDisciplinaryBoardFileList = this.disciplinaryBoardFileList.filter(file => file.id !== disciplinaryBoardFileId);
          this.disciplinaryBoardFileList = filteredDisciplinaryBoardFileList;
          this.disciplinaryBoardFileListSub.next([...this.disciplinaryBoardFileList]);
          this.globalFunctions.showSnackBar("system.success.delete");
        },
        error: (error) => {
          this.globalFunctions.showSnackBar(error);
        }
      });
  }
}
