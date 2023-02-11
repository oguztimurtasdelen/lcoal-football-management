const connection = require('../../functions/database').connectDatabase();

function getTeamsInGroupstages(req, res, next) {
  const groupstagesId = req.params.groupstagesid;
  var teamsingroupstagesList;
  var message;

  connection.query(
    "select * from view_teamsingroupstages where groupstagesid = ?",
    [groupstagesId],
    (error, result) => {
      if (!error) {
        teamsingroupstagesList = result;
      } else {
        message = error.sqlMessage;
        teamsingroupstagesList = [];
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Teams fetched successfully!',
        teamsingroupstagesList: teamsingroupstagesList
      });
    });
}

function getTeamsForGroupstages(req, res, next) {
  var teamsList;
  var message;
  connection.query(
    "select * from view_teamsforgroupstages",
    (error, result) => {
      if (!error) {
        teamsList = result;
      } else {
        message = error.sqlMessage;
        teamsList = [];
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Teams List fetched successfully!',
        teamsList: teamsList
      });
    }
  )
}

function createTeamsInGroupstages(req, res, next) {
  const groupstageId = req.params.groupstagesid;
  const teamsList = req.body;
  var message;
  var error = false;

  async function buildGroups() {
    try {
      await connection.query(
        "delete from teamsingroupstages where groupstagesid = ?",
        [groupstageId],
        (error, result) => {
          if (!error) {
            console.log("Query #1 - Deleting");
          } else {
            throw error;
          }
        }
      );

      for (let i = 0; i < teamsList.length; i++) {
        const element = teamsList[i];
        await connection.query(
          "insert into teamsingroupstages(groupstagesid, teamid, isexpelled, isreceded, orderno) values(?, ?, ?, ?, ?)",
          [
            groupstageId || element.groupstagesId,
            element.teamId,
            false,
            false,
            element.orderNo
          ],
          (error, result) => {
           if (!error) {
            console.log(result.insertId);
           } else {
            throw error;
           }
          }
        );
      }

    } catch (err) {
      console.log(err)
      connection.rollback(() => {
        error = true;
        message = err.message
      });
    } finally {
      res.status(200).json({
        error: error,
        message: message
      });
    }
  }

  buildGroups();
}

function updateTeamsForGroupstages(req, res, next) {
  const teamInfo = req.body;
  var message;

  console.log(teamInfo);

  connection.query(
    "update teamsingroupstages set isexpelled = ?, isreceded = ?, weekofexpelledorreceded = ?, explanation = ? where id = ?",
    [
      teamInfo.isExpelled,
      teamInfo.isReceded,
      teamInfo.weekofExpelledorReceded,
      teamInfo.explanation,
      teamInfo.id
    ],
    (error, result) => {
      if (error) {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message
      });
    }
  )

}


function deleteTeamsInGroupstages(req, res, next) {
  const groupstageId = req.params.groupstagesid;
  var message;

  console.log(groupstageId);

  connection.query(
    "delete from teamsingroupstages where groupstagesid = ?",
    [groupstageId],
    (error, result) => {
      if (!error) {
        console.log(result);
      } else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Teams deleted successfully!'
      });
    });
}

exports.getTeamsInGroupstages = getTeamsInGroupstages;
exports.getTeamsForGroupstages = getTeamsForGroupstages
exports.createTeamsInGroupstages = createTeamsInGroupstages;
exports.updateTeamsForGroupstages = updateTeamsForGroupstages;
exports.deleteTeamsInGroupstages = deleteTeamsInGroupstages;
