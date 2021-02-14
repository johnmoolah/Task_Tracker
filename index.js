const inquirer = require('inquirer');
const fs = require('fs');
// const path = require("path");

const jsonPath = __dirname + '/tasks.json';
let tasks = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

console.log(tasks)
