const fs = require('fs'); 
import { mergeTypes, mergeResolvers } from "merge-graphql-schemas";


//Every resolvers.js file must contain const name resolvers

var resolverFilesInFolder = function(dir, resolverFilelist)
{
  //read current directory files and folder names
    var files = fs.readdirSync(dir);

    files.forEach(function(file) {

      //if folder then recursively call with new files/folders in that folder
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        resolverFilelist = resolverFilesInFolder(dir + '/' + file, resolverFilelist);
      }
        //otherwise if it is not directory and file name is resolvers.js and it is not current working file (index.js) then this condition
      else {
        if(file !== "index.js" && file === "resolvers.js")
        {
          const temp = require(dir + '/' + file);
          resolverFilelist.push(temp.resolvers);
        }
      }
    });

    return resolverFilelist;
}

//Every schema.js file must contain const name schema
var schemaFilesInFolder = function(dir, schemaFilelist)
{
    var files = fs.readdirSync(dir);

    files.forEach(function(file) {
      
      if (fs.statSync(dir + '/' + file).isDirectory()) {
        schemaFilelist = schemaFilesInFolder(dir + '/' + file, schemaFilelist);
      }
      else {
        if(file === "schema.js" && file !== "index.js")
        {
          const temp = require(dir + '/' + file);
          schemaFilelist.push(temp.schema);
        }
      }
    });

    return schemaFilelist;
}

//Load Mock Resolvers
var mockResolverFilesInFolder = function(dir, mockResolverFilelist)
{
    var files = fs.readdirSync(dir);

    files.forEach(function(file) {

      if (fs.statSync(dir + '/' + file).isDirectory()) {
        mockResolverFilelist = mockResolverFilesInFolder(dir + '/' + file, mockResolverFilelist);
      }
      else {
        if(file !== "index.js" && file === "mockResolvers.js")
        {
          const temp = require(dir + '/' + file);
          mockResolverFilelist.push(temp.resolvers);
        }
      }
    });

    return mockResolverFilelist;
}


 var schemaFilelist = [];
 schemaFilesInFolder(__dirname, schemaFilelist);

var resolverFilelist = [];
resolverFilesInFolder(__dirname, resolverFilelist);

var mockResolverFilelist = [];
mockResolverFilesInFolder(__dirname, mockResolverFilelist);

//merge resolvers and schema because there can be only one query
const resolvers = mergeResolvers(resolverFilelist);
const schema = mergeTypes(schemaFilelist);
const mockResolvers = mergeResolvers(mockResolverFilelist);

module.exports = {resolvers, schema, mockResolvers};