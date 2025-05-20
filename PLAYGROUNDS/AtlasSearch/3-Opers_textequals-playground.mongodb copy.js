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

/* _________________  LESSON 3: $search operators: text and equals  ______________________  */
/* Creates an index for Date field */
// db.movies.createSearchIndex("released_index", {
//   mappings: {
//     fields: {
//       released: {
//         type: "date",
//       },
//     },
//   },
// });
/* Creates an index for Date field */
// db.movies.createSearchIndex("released_multi_type", {
//   mappings: {
//     fields: {
//       released: [
//         {
//           type: "date",
//         },
//         {
//           type: "string",
//         },
//       ],
//     },
//   },
// });

// const searchIndex = "released_multi_type"; //released_index | released_multi_type
// /* Consume the Search index with release date as either date or string: */
// db.movies.aggregate([
//   {
//     $search: {
//       index: searchIndex,
//       compound: {
//         should: [
//           { text: { query: "1999-03-31", path: "released" } },
//           { equals: { value: new Date("1999-03-31"), path: "released" } },
//         ],
//       },
//     },
//   },
//   { $project: { _id: 0, title: 1, released: 1 } },
// ]);
