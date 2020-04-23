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

    console.log(JSON.stringify(allEmployeesInfo, null, '  '));
    // Write code to use inquirer to gather information about the development team members,
    // and to create objects for each team member (using the correct classes as blueprints!)
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
        switch(commonAnswers.role) {
            case 'Manager':
                addManager(commonAnswers);
            break;
            case 'Engineer':
                addEngineer(commonAnswers);
            break;
            case 'Intern':
                addIntern(commonAnswers);
            break;
        }
    });
}
  
const addManager = commonAnswers => {
    //ask manager related questions
    // console.log(`Employee: ${answers.employee}`);
    // console.log(`name: ${answers.name}`);
    // console.log(`id: ${answers.id}`);
    // console.log(`email: ${answers.email}`);

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is the Manager\'s office number?'
            }
        ])
        .then(internAnswers => {
            const { officeNumber } = internAnswers;
            const { name, id, email } = commonAnswers;
            const employee = new Manager(name, id, email, officeNumber);
            allEmployeesInfo.push(employee);
            askForAnotherEntry();
        });
    
}

const addEngineer = commonAnswers => {
    //ask engineer related questions
    // console.log(`Employee: ${answers.employee}`);
    // console.log(`name: ${answers.name}`);
    // console.log(`id: ${answers.id}`);
    // console.log(`email: ${answers.email}`);

    inquirer
    .prompt([
        {
            type: 'input',
            name: 'github',
            message: 'What is the Engineer\'s Github profile username?'
        }
      ])
    .then(engineerAnswers => {
        const { github } = engineerAnswers;
        const { name, id, email } = commonAnswers;
        const employee = new Engineer(name, id, email, github);
        allEmployeesInfo.push(employee);
        askForAnotherEntry();
    });

}

const addIntern = commonAnswers => {
    //ask intern related questions
    // console.log(`Employee: ${answers.employee}`);
    // console.log(`name: ${answers.name}`);
    // console.log(`id: ${answers.id}`);
    // console.log(`email: ${answers.email}`);

    inquirer
    .prompt([
        {
            type: 'input',
            name: 'school',
            message: 'Where does the Intern go to school?'
        }
      ])
    .then(internAnswers => {
        const { school } = internAnswers;
        const { name, id, email } = commonAnswers;
        const employee = new Intern(name, id, email, school);
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

    fs.writeFile("output/team.html", html, function(err) {

        if (err) {
          return console.log(err);
        }
      
        console.log("Data successfully written to team.html file.");
      
    });

};

enterEmployeeInfo();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above to target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
