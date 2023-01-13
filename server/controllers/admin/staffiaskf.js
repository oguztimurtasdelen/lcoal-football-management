const connection = require('../../functions/database.js').connectDatabase();

function getStaffList(req, res, next) {
  var staffList;
  var message;
  connection.query(
    "select * from view_staffiaskf", (error, result) => {
      if (!error) {
        staffList = result;
      }
      else {
        message = error.sqlMessage;
      }

      res.status(200).json({
        error: !!error,
        message: message || 'Staff fetched successfully!',
        staffList: staffList
      });
    });
}


function createStaff(req, res, next) {
  const staffInfo = req.body;
  console.log(staffInfo);
  var message;
  var staffId;
  connection.query(
    "insert into staffiaskf(title, fullname, phone, email, profileimage, isvisible, orderno) values(?, ?, ?, ?, ?, ?, ?)",
    [staffInfo.title, staffInfo.fullName, staffInfo.phone, staffInfo.email, staffInfo.profileImage, staffInfo.isVisible, staffInfo.orderNo],
    (error, result) => {
      if (!error) {
        staffId = result.insertId;
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'New Staff created successfully!',
        staffId: staffId
      });
  });

}

function updateStaff(req, res, next) {
  const staffInfo = req.body;
  console.log(staffInfo);
  var message;
  connection.query(
    "update staffiaskf set title = ?, fullname = ?, phone = ?, email = ?, profileimage = ?, isvisible = ?, orderno = ? where id = ?",
    [staffInfo.title, staffInfo.fullName, staffInfo.phone, staffInfo.email, staffInfo.profileImage, staffInfo.isVisible, staffInfo.orderNo, staffInfo.id],
    (error, result) => {
      if (!error) {
        console.log(result);
      } else {
        message = error.sqlMessage;
      }
      res.status(200).json({
        error: !!error,
        message: message || 'Staff updated successfully!',
      });
  });
}

function deleteStaff(req, res, next) {
  console.log(req.params.id)
  res.status(200).json({
    error: false,
    message: 'Staff deleted successfuly!'
  })
}


exports.getStaffList = getStaffList;
exports.createStaff = createStaff;
exports.updateStaff = updateStaff;
exports.deleteStaff = deleteStaff;
