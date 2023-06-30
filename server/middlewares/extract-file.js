const multer = require("multer");

const MIME_TYPE_MAP = {
  "text/csv": "csv", // CSV
  "application/msword": "doc", // DOC
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx", //DOCX
  "application/pdf": "pdf", //PDF
  "application/vnd.ms-powerpoint": "ppt", // PPT
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": "pptx", //PPTX
  "text/plain": "txt", // TXT
  "application/vnd.ms-excel": "xls", //XLS
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx" //XLSX
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    const cbFunctions = {
      'BELGELER': () => {
        cb(error, "server/files/documents");
      },
      'TALIMATLAR': () => {
        cb(error, "server/files/instructions");
      },
      'LISANSFORMLARI': () => {
        cb(error, "server/files/license-forms");
      },
      'AMATORLIGSTATULERI': () => {
        cb(error, "server/files/statuses");
      },
      'AKTARMADOSYALARI': () => {
        cb(error, "server/files/template-files")
      }
    };

    const category = req.params.category;
    if (category in cbFunctions) {
      cbFunctions[category]();
    } else {
      cb(error, "server/files");
    }

  },
  filename: (req, file, cb) => {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const fileName = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    //const ext = MIME_TYPE_MAP[file.mimetype];
    //cb(null, fileName + "-" + Date.now() + "." + ext);
    cb(null, Date.now() + "-" + fileName);
  }
});

module.exports = multer({ storage: storage, limits: {fieldSize: 10 * 1024 * 1024} }).single("file");
