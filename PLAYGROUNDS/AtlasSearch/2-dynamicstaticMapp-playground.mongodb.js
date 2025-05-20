// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("sample_mflix");

db.movies.findOne(); //TEST Connectivity only
// db.movies.aggregate([{ $listSearchIndexes: {} }]); //Obtain a detailed list of Search Indexes

// db.movies.aggregate([
//   { $listSearchIndexes: {} },
//   { $project: { _id: 0, name: 1, type: 1, status: 1 } }, //To obtain basic info list
// ]);

// db.movies.dropSearchIndex("plot_title_idx");

//_______________  LESSON 2: Dynamic and Static mappings ______________________  */
/* Create an Atlas Search Index With Static Mapping (Via CLI:) 
$ atlas clusters search indexes create --clusterName <CLUSTERNAME> -f /app/<search_index_def>.json 
{
  "name": "plot_title_idx",
  "collectionName": "movies",
  "database": "sample_mflix",
  "mappings": {
    "dynamic":false,
    "fields":{
      "plot":{
        "type":"string"
      },
      "title":{
        "type":"string"
      }
    }
  }
}  
// */

/*  CREATE Compound Search Index With Static Mapping plot-title */
// db.movies.createSearchIndex("plot_title_idx", {
//   mappings: {
//     dynamic: false,
//     fields: {
//       plot: {
//         type: "string",
//       },
//       title: {
//         type: "string",
//       },
//     },
//   },
// });

/* QUERY: where the title includes the query token */
// db.movies.aggregate([
//   {
//     $search: {
//       index: "plot_title_idx",
//       text: {
//         query: "The Lion King",
//         path: "title",
//       },
//     },
//   },
//   {
//     $project: {
//       title: 1,
//       year: 1,
//       plot: 1,
//     },
//   },
//   {
//     $limit: 1,
//   },
// ]);

/* CREATE an Atlas Search Index With Dynamic Mapping (Via CLI:) 
 $ atlas clusters search indexes create --clusterName <CLUSTERNAME> -f /app/<search_index_def>.json */
// {
//   "name": "example",
//   "collectionName": "myCollection",
//   "database": "myDb",
//   "searchAnalyzer": "<analyzer name>",
//   "analyzer": "<analyzer name>",
//   "mappings": {
//     "dynamic": true,
//   }
// }

// db.movies.createSearchIndex("movies_dynamic_idx", {
//   mappings: {
//     dynamic: true,
//   },
// });

/* QUERY: Movies where Tom Hanks is on path (cast field) [dynamically indexed] */
// db.movies.aggregate([
//   {
//     $search: {
//       index: "movies_dynamic_idx",
//       text: {
//         query: "Tom Hanks",
//         path: "cast",
//       },
//     },
//   },
//   { $project: { title: 1, plot: 1, cast: 1, _id: 0 } },
//   { $limit: 5 },
// ]);

/* CREATE: Indexing Known and Unknown Fields (subdocuments) */
// {
//   "name": "example",
//   "collectionName": "myCollection",
//   "database": "myDb",
//   "mappings": {
//     "dynamic": false,
//     "fields": {
//       "known_field": {
//         "type": "string"
//       },
//       "unknown_subdocument_field": {
//         "dynamic": true,
//         "type": "document"
//       }
//     }
//   }
// }

// db.movies.createSearchIndex("title_tomatoes_index", {
//   mappings: {
//     dynamic: false,
//     fields: {
//       title: {
//         type: "string",
//       },
//       tomatoes: {
//         dynamic: true,
//         type: "document",
//       },
//     },
//   },
// });

/* QUERY: find movies with a tomatoes viewer rating of 4 or greater */
// db.movies.aggregate([
//   {
//     $search: {
//       index: "title_tomatoes_index",
//       range: {
//         path: "tomatoes.viewer.rating",
//         gte: 4,
//       },
//     },
//   },
//   {
//     $project: {
//       title: 1,
//       "tomatoes.viewer.rating": 1,
//       _id: 0,
//     },
//   },
//   { $limit: 5 },
// ]);
