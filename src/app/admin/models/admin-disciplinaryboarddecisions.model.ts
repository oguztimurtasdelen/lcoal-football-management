export interface DisciplinaryBoardDecisionModel {
    id: number,
    createdAt: Date,
    createdBy: number,
    updatedAt: Date,
    updatedBy: number,
    disciplinaryBoardFileId: number,
    caseNo: string,
    leagueId: number,
    teamId: number,
    fullName: string,
    licenseNo: string,
    belongingTo: string,
    penalType: string,
    duration: string,
    explanation: string,
}
