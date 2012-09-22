
/*
 * GET search results.
 */

exports.list = function(req, res){

  var query = req.query.q;
  var tut = {
          title: 'NodeJS web basic',
          id: 10,
          createdBy: 'Hung Doan',
          desc: "In this tutorial I will run you through the process setting up an Express.js app and making it do what a basic website might do. You will learn the basics of routes, views, Jade templates, Stylus CSS engine, handling POST and GET requests.",
          stat: {
            likes: 103,
            shares: 50,
            views: 1042
          },
          acquires: [
            'expressjs-basic',
            'nodejs-basic',
            'javascript',
          ]
        };

  var search_result = {
    title: '$earch Result',
    query: query,
    results: [
      { level: 'Beginner',
        tuts: [tut, tut, tut]
      },
      { level: 'Intermediate',
        tuts: [tut, tut]
      },
      { level: 'Advanced',
        tuts: [tut, tut, tut]
      }
    ]
  }

  res.render('search', search_result);
};
