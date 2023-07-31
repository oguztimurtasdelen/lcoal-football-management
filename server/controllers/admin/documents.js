const queries = require("../../queries/admin/documents");
const connection = require("../../functions/database").connectDatabase();
const filesFunction = require("../../functions/files");

function getDocuments(req, res, next) {
  try {
    const category = req.params.category;
    var documentsList;
    var message;

    connection.query(queries.getDocuments, [category], (error, result) => {
      if (!error) {
        documentsList = result;
      } else {
        message = error.sqlMessage;
        documentsList = [];
      }

      res.status(200).json({
        documentsList: documentsList,
      });
    });
  } catch (error) {
    console.log(error);
  }
}

function createDocument(req, res, next) {
  try {
    const documentInfo = JSON.parse(req.body.documentInfo);
    const category = req.params.category;
    var documentId;
    var message;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const filePath = filesFunction.setFilePath(
        url,
        category,
        req.file.filename
      );
      documentInfo.filePath = filePath;
      documentInfo.fileName = req.file.filename;
      documentInfo.fileMimeType = req.file.mimetype;
      documentInfo.fileSize = req.file.size;
    } else {
      documentInfo.filePath = null;
      documentInfo.fileName = null;
      documentInfo.fileMimeType = null;
      documentInfo.fileSize = null;
    }

    connection.query(
      queries.createDocument,
      [
        documentInfo.createdAt,
        documentInfo.createdBy,
        documentInfo.updatedAt,
        documentInfo.updatedBy,
        documentInfo.documentName,
        documentInfo.fileName,
        documentInfo.fileMimeType,
        documentInfo.fileSize,
        documentInfo.filePath,
        category || documentInfo.category,
        documentInfo.orderNo,
      ],
      (error, result) => {
        if (!error) {
          documentId = result.insertId;
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
          documentId: documentId,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function updateDocument(req, res, next) {
  try {
    const documentInfo = JSON.parse(req.body.documentInfo);
    const category = req.params.category;
    const documentId = req.params.id;
    var message;

    if (!!req.file) {
      const url = req.protocol + "://" + req.get("host");
      const filePath = filesFunction.setFilePath(
        url,
        category,
        req.file.filename
      );
      documentInfo.filePath = filePath;
      documentInfo.fileName = req.file.filename;
      documentInfo.fileMimeType = req.file.mimetype;
      documentInfo.fileSize = req.file.size;
    } else {
      if (!documentInfo.filePath) {
        documentInfo.filePath = null;
        documentInfo.fileName = null;
        documentInfo.fileMimeType = null;
        documentInfo.fileSize = null;
      }
    }

    connection.query(
      queries.updateDocument,
      [
        documentInfo.createdAt,
        documentInfo.createdBy,
        documentInfo.updatedAt,
        documentInfo.updatedBy,
        documentInfo.documentName,
        documentInfo.fileName,
        documentInfo.fileMimeType,
        documentInfo.fileSize,
        documentInfo.filePath,
        category || documentInfo.category,
        documentInfo.orderNo,
        documentId || documentInfo.id,
      ],
      (error, result) => {
        if (!error) {
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

function deleteDocument(req, res, next) {
  try {
    const documentId = req.params.id;


    res.status(200).json({

    });
  } catch (error) {
    console.log(error);
  }
}

exports.getDocuments = getDocuments;
exports.createDocument = createDocument;
exports.updateDocument = updateDocument;
exports.deleteDocument = deleteDocument;
