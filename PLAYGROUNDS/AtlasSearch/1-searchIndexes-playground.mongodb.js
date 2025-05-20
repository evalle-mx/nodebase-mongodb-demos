// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// The current database to use.
use("sample_mflix");

const indexName = "plot_IDX";
const textToSearch = "space";
const searchingField = "plot";

// db.movies.findOne(); //TEST Connectivity only

// db.movies.aggregate([{ $listSearchIndexes: {} }]); //Obtain a detailed list of Search Indexes

db.movies.aggregate([
  { $listSearchIndexes: {} },
  { $project: { _id: 0, name: 1, type: 1, status: 1 } }, //To obtain basic info list
]);

// db.movies.dropSearchIndex("plot_title_idx");

/* CREATE a search index in Atlas Search, use createSearchIndex() inside the MongoDB Shell to index the plot field, which is a string. */
// db.movies.createSearchIndex("plot_IDX", {
//   mappings: {
//     fields: {
//       plot: {
//         type: "string",
//       },
//     },
//   },
// });

/* QUERY: Here we use the $search stage with the index that we created on the plot field.
It should return all the documents where textToSearch is included on the path/field (plot)
 */
// db.movies.aggregate([
//   {
//     $search: {
//       index: indexName,
//       text: {
//         query: textToSearch,
//         path: searchingField,
//       },
//     },
//   },
//   {
//     $project: {
//       title: 1,
//       year: 1,
//       plot: 1,
//       _id: 0,
//     },
//   },
// ]);

/* QUERY: Summary of search results, using $searchMeta stage at the beginning 
of aggregation pipeline to add count field */
// db.movies.aggregate([
//   {
//     $searchMeta: {
//       index: indexName,
//       text: {
//         query: textToSearch,
//         path: searchingField,
//       },
//       count: {
//         type: "total",
//       },
//     },
//   },
// ]);
