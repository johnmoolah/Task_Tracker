const inquirer = require('inquirer');
const fs = require('fs');

const jsonPath = __dirname + '/tasks.json';
let tasks = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

function run() {
    inquirer.prompt([
        {
            name: 'action',
            type: 'list',
            message: 'What do you want to do?',
            choices:[ "show tasks", "add task", "remove task", "mark as completed"]
        },
        {
            name: 'new',
            type: 'input',
            message: 'What is your new task?',
            when: (answers => {
                return answers.action === 'add task'
            })
        }, 
        {
            name: 'dedicated',
            type: 'input',
            message: 'Which task?',
            when: (answers) => {
                return answers.action === 'remove task' || answers.action === "mark as completed"
            },
            choices: function () {
                let i, ids = [];
                for (i = 0; i < tasks.length;i++) {
                    ids.push(i);
                }
                return ids;
            }
        }
    ]).then (answers => {
        switch (answers.action) {
            case 'show tasks':
                console.table(tasks);
                break;
    
            case 'remove task':
                tasks.splice(answers.dedicated,1);
                console.table(tasks);
                break;
    
            case 'add task':
                tasks.push({
                    title: answers.new,
                    done: false
                });
                console.table(tasks);
                break;
            case 'mark as completed':
                tasks[answers.dedicated].done = true;
                console.table(tasks);
                break;
        };
        function writeFileSync(){
            fs.writeFileSync(jsonPath, JSON.stringify(tasks));
        }
        })};
    run()
