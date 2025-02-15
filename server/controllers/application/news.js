const queries = require("../../queries/application/news");
//const connection = require('../../functions/database.js').connectDatabase();
const connection = require('../../functions/database.js');
const crypto = require('../../functions/crypto');
const errorService = require('../../services/error-service.js');

function getNews(req, res, next) {
  var newsList = [];
  var newsCount = 0;
  const paginationPageSize = +req.query.paginationPageSize;
  const paginationCurrentPage = +req.query.paginationCurrentPage;
  var _resStatus = 200;
  var _error = false;
  var _message = null;


  const newsListPromise = new Promise(async (resolve, reject) => {
    connection.query(
      queries.getNews,
      [
        paginationPageSize,
        (paginationCurrentPage - 1) * paginationPageSize
      ],
      (error, result) => {
        if (!error) {
          newsList = result;
          resolve();
        } else {
          reject(error);
        }
      });
  });

  const newsCountPromise = new Promise(async (resolve, reject) => {
    connection.query(
      queries.getNewsCount,
      (error, result) => {
        if(!error){
          newsCount = result[0].count;
          resolve();
        }else{
          resolve(error);
        }
      });
  });

  Promise.all([newsListPromise, newsCountPromise])
    .then(() => {

    })
    .catch((error) => {
      errorService.handleError(
        errorService.errors.DATABASE_ERROR.code,
        errorService.errors.DATABASE_ERROR.message,
        error.sqlMessage
      );

      _error = true;
      _resStatus = errorService.errors.DATABASE_ERROR.code;
      _message = errorService.errors.DATABASE_ERROR.message;
    })
    .finally(() => {
      const _newsList = crypto.encryptData({newsList: newsList, newsCount: newsCount});

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _newsList,
      });
    });


}

function getNewsById(req, res, next) {
  var news;
  var newsId = req.params.id;
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getNewsById,
    [newsId],
    (error, result) => {
      if (!error) {
        news = result[0];
      } else {
        errorService.handleError(
          errorService.errors.DATABASE_ERROR.code,
          errorService.errors.DATABASE_ERROR.message,
          error.sqlMessage
        );

        _error = true;
        _resStatus = errorService.errors.DATABASE_ERROR.code;
        _message = errorService.errors.DATABASE_ERROR.message;
      }

      const _news = crypto.encryptData(news);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _news,
      });
    }
  );
}

function getNewsForSlider(req, res, next) {
  var newsList = [];
  var _resStatus = 200;
  var _error = false;
  var _message = null;

  connection.query(
    queries.getNewsForSlider,
    (error, result) => {
      if (!error) {
        newsList = result;
      } else {
        errorService.handleError(
          errorService.errors.DATABASE_ERROR.code,
          errorService.errors.DATABASE_ERROR.message,
          error.sqlMessage
        );

        _error = true;
        _resStatus = errorService.errors.DATABASE_ERROR.code;
        _message = errorService.errors.DATABASE_ERROR.message;
      }

      const _newsList = crypto.encryptData(newsList);

      res.status(_resStatus).json({
        error: _error,
        message: _message,
        data: _newsList,
      });
    }
  );
}

exports.getNews = getNews;
exports.getNewsById = getNewsById;
exports.getNewsForSlider = getNewsForSlider;
