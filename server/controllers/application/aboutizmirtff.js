const queries = require("../../queries/application/aboutizmirtff");

const connection = require("../../functions/database.js").connectDatabase();

function getAboutContent(req, res, next) {
  try {
    var aboutContent;
    var message;

    connection.query(
      queries.getAboutContent,
      (error, result) => {
        if (!error) {
          aboutContent = result[0];
        } else {
          message = error.sqlMessage;
        }

        res.status(200).json({
          aboutContent: aboutContent,
        });
      }
    );
  } catch (error) {
    console.log(error);
  }
}

exports.getAboutContent = getAboutContent;
