import {
    handleCors,
    handleBodyRequestParsing,
    handleCompression,
    addMorganLogging
  } from './common';
  import { handleAPIDocs } from './apiDocs';

  export default [handleCors, handleBodyRequestParsing, handleCompression, handleAPIDocs, addMorganLogging];
