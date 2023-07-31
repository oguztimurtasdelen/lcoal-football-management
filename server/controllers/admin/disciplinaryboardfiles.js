const querydisciplinaryboardfiles = require('../../queries/querydisciplinaryboardfiles');
const connection = require('../../functions/database').
connectDatabase();

function getDisciplinaryBoardFiles(req, res, next) {
    var disciplinaryBoardFileList;
    var message;
    const seasonId = req.params.seasonid;
    const caseType = req.params.casetype;

    connection.query(
        querydisciplinaryboarddecisions.getDisciplinaryBoardFiles,
        [
            seasonId,
            caseType
        ],
        (error, result) => {
            if (!error) {
                disciplinaryBoardFileList = result;
            } else {
                disciplinaryBoardFileList = [];
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board Files fetched successfully!',
                disciplinaryBoardFileList: disciplinaryBoardFileList
            });
        }
    );
}

function createDisciplinaryBoardFile(req, res, next) {
    const disciplinaryBoardFileInfo = req.body;
    var message;
    var disciplinaryBoardFileId;

    connection.query(
        querydisciplinaryboardfiles.createDisciplinaryBoardFile,
        [
            disciplinaryBoardFileInfo.createdAt,
            disciplinaryBoardFileInfo.createdBy,
            disciplinaryBoardFileInfo.updatedAt,
            disciplinaryBoardFileInfo.updatedBy,
            disciplinaryBoardFileInfo.seasonId,
            disciplinaryBoardFileInfo.caseNo,
            disciplinaryBoardFileInfo.caseDate,
            disciplinaryBoardFileInfo.caseType,
            disciplinaryBoardFileInfo.title,
            disciplinaryBoardFileInfo.participants,
            disciplinaryBoardFileInfo.explanation
        ],
        (error, result) => {
            if (!error) {
                disciplinaryBoardFileId = result.insertId;
            } else {
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board File added successfully!',
                disciplinaryBoardFileId: disciplinaryBoardFileId
            });
        }
    );
}

function updateDisciplinaryBoardFile(req, res, next) {
    const disciplinaryBoardFileInfo = req.body;
    var disciplinaryBoardFileId = req.params.id;
    var message;

    connection.query(
        querydisciplinaryboardfiles.updateDisciplinaryBoardFile,
        [
            disciplinaryBoardFileInfo.createdAt,
            disciplinaryBoardFileInfo.createdBy,
            disciplinaryBoardFileInfo.updatedAt,
            disciplinaryBoardFileInfo.updatedBy,
            disciplinaryBoardFileInfo.seasonId,
            disciplinaryBoardFileInfo.caseNo,
            disciplinaryBoardFileInfo.caseDate,
            disciplinaryBoardFileInfo.caseType,
            disciplinaryBoardFileInfo.title,
            disciplinaryBoardFileInfo.participants,
            disciplinaryBoardFileInfo.explanation,
            disciplinaryBoardFileId || disciplinaryBoardFileInfo.id
        ],
        (error, result) => {
            if (!error) {

            } else {
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board File updated successfully!'
            });
        }
    );
}

function deleteDisciplinaryBoardFile(req, res, next) {
    var disciplinaryBoardFileId = req.params.id;
    var message;

    connection.query(
        querydisciplinaryboardfiles.deleteDisciplinaryBoardFile,
        [
            disciplinaryBoardFileId
        ],
        (error, result) => {
            if (!error) {

            } else {
                message = error.sqlMessage;
            }

            res.status(200).json({
                error: !!error,
                message: message || 'Disciplinary Board File delete successfully!'
            });
        }
    );
}

exports.getDisciplinaryBoardFiles = getDisciplinaryBoardFiles;
exports.createDisciplinaryBoardFile = createDisciplinaryBoardFile;
exports.updateDisciplinaryBoardFile = updateDisciplinaryBoardFile;
exports.deleteDisciplinaryBoardFile = deleteDisciplinaryBoardFile;
