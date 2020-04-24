const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let allEmployeesInfo = [];

const enterEmployeeInfo = () => {
    //Ask Common Questions:
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'role',
                message: 'Select an Employee type you wish to enter:',
                choices: [
                'Manager',
                'Engineer',
                'Intern'
                ]
            },
            {
                type: 'input',
                name: 'name',
                message: 'What is this employee\'s name?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is this employee\'s id?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is this employee\'s email?'
            },
        ])
        .then(commonAnswers => {
            const { role } = commonAnswers;
        switch(role) {
            case 'Manager':
                additionalQuestions(role, "officeNumber", "What is the Manager's office number?", commonAnswers);
            break;
            case 'Engineer':
                additionalQuestions(role, "github", "What is the Engineer's Github profile username?", commonAnswers);
            break;
            case 'Intern':
                additionalQuestions(role, "school", "Where does the Intern go to school?", commonAnswers);
            break;
        }
    });
}
  
const additionalQuestions = (role, inputType, messageText, commonAnswers) => {
    // Ask additional questions:
    inquirer
        .prompt([
            {
                type: 'input',
                name: inputType,
                message: messageText
            }
        ])
        .then(answers => {

            let answer;

            for (let key in answers) {
                answer = answers[key];
            }

            const { name, id, email } = commonAnswers;
            let employee;
            
            switch(role) {
                case 'Manager':
                    employee = new Manager(name, id, email, answer);
                break;
                case 'Engineer':
                    employee = new Engineer(name, id, email, answer);
                break;
                case 'Intern':
                    employee = new Intern(name, id, email, answer);
                break;
            }
            allEmployeesInfo.push(employee);
            askForAnotherEntry();
        });

}

const askForAnotherEntry = () => {
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'new_entry',
                message: 'Would you like to enter another employee?'
            }
        ])
        .then(answer => {
            if (answer.new_entry === true) {
                enterEmployeeInfo();
            }
            else {
                const html = render(allEmployeesInfo);
                writeHTMLtoFile(html);
            }
        });
}

const writeHTMLtoFile = (html) => {

    fs.writeFile(outputPath, html, function(err) {

        if (err) {
          return console.log(err);
        }
      
        console.log("Data successfully written to team.html file.");
      
    });

};

enterEmployeeInfo();