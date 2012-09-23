
/*
 * GET search results.
 */

var MockData = require('../MockData.js');

exports.list = function(req, res){

  var query = req.query.q;
  var search_result = {
    title: '$earch Result',
    query: query,
    results: [
      { level: 'Beginner',
        tuts: [MockData.tuts[0]]
      },
      { level: 'Intermediate',
        tuts: [MockData.tuts[1]]
      },
      { level: 'Advanced',
        tuts: [MockData.tuts[2]]
      }
    ]
  }

  res.render('search', search_result);
};
