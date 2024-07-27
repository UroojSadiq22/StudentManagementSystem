#! /user/bin/env node

import inquirer from "inquirer"
import chalk from "chalk"

class Student{
    static counter = 10000
    id:number
    name:string
    course:string[]
    balance:number = 100
    
    constructor(name: string){
        this.id = Student.counter++
        this.name = name
        this.course = []
    }

    enrollCourse(course: string){
        this.course.push(course)
        console.log(chalk.green.italic(`${this.name} is enroll in ${course} succesfully`));
        console.log(chalk.blueBright.bold("Enrolled courses: "),`${this.course}\n`);
    }

    showBalance(){
        console.log(chalk.blueBright.bold(`${this.name}'s balance: `),(`$${this.balance}\n`));
    }

    payFees(amount:number){
        this.balance -= amount
        console.log(chalk.magenta(`$${amount} has been paid by ${this.name}.`))
        console.log(chalk.blueBright.bold("Remaining balance: "),`$${this.balance}\n`);
    }

    showStatus(){
        console.log(chalk.blueBright.bold("Name: "),`${this.name}`);
        console.log(chalk.blueBright.bold("Id: "),`${this.id}`);
        console.log(chalk.blueBright.bold("Courses: "),`${this.course}`);
        console.log(chalk.blueBright.bold("Balance: "),`$${this.balance}\n`);
    }
}

class StudentManager{
    students: Student[]

    constructor(){
        this.students = []
    }

    addStudents(name:string){
        let std = new Student(name)
        this.students.push(std)
        console.log(chalk.green.italic(`${name} is successfully added.`))
        console.log(chalk.blueBright.bold(`Student Id: ${std.id}\n`));
    }

    enrollStudent(stdId:number , course:string){
        let findStudent = this.findStudent(stdId)
        if(findStudent){
            findStudent.enrollCourse(course)
        }
        else{
            console.log(chalk.red("Student not found. enter the correct id\n"));
        }
    }

    showStudentBalance(stdId:number){
        let findStudent = this.findStudent(stdId)
        if(findStudent){
            findStudent.showBalance()
        }
        else{
            console.log(chalk.red("Student not found. enter the correct id\n"));
        }
    }

    showStudentStatus(stdId:number){
        let findStudent = this.findStudent(stdId)
        if(findStudent){
            findStudent.showStatus()
        }
        else{
            console.log(chalk.red("Student not found. enter the correct id\n"));
        }
    }

    payStudentFees(stdId:number , amount:number){
        let findStudent = this.findStudent(stdId)
        if(findStudent){
            findStudent.payFees(amount)
        }
        else{
            console.log(chalk.red("Student not found. enter the correct id\n"));
        }
    }

    findStudent(stdId:number){
        return this.students.find(i => i.id === stdId)
    }
}

async function start() {

    console.log(chalk.magenta.bold.italic("\n Welcome to Our Student Management System Project \n"));
    
    await new Promise((resolve) => setTimeout(resolve, 2000))

    let stdManager = new StudentManager()
    
    do{
        let userInput = await inquirer.prompt({
            name: "answer",
            type: "list",
            message: chalk.yellow("Select an option to proceed."),
            choices: [ "Add Student" , "Enroll Student" , "Pay Student Fees" , "Show Student Balance" , "Show Student Status" , "Exit"]
        })
    
        switch(userInput.answer){
            case "Add Student":
                let userName = await inquirer.prompt({
                    name: "answer",
                    type: "input",
                    message: chalk.yellow("Enter Student Name"),
                    validate: (input) => {
                        for(let i = 0 ; i<input.length ; i++){
                            let char = input[i]
                            if(!(char >= "a" && char <= "z" || char >= "A" && char <= "Z" || char === " ")){
                               return chalk.red("Please enter the valid student name");
                            }
                        }
                        return true
                    }
                })
                 stdManager.addStudents(userName.answer)
                 break;
            
            case "Enroll Student":
                let userAnswer = await inquirer.prompt([{
                    name: "idanswer",
                    type: "number",
                    message: chalk.yellow("Enter the student Id")
                },
            {
                name: "courseanswer",
                type: "checkbox",
                message: chalk.yellow("Select your Course"),
                choices: ["Javascript" , "Python" , "HTML/CSS" , "Typescript" , "DBMS"]
            }])
    
            stdManager.enrollStudent(userAnswer.idanswer , userAnswer.courseanswer)
            break;
    
            case "Pay Student Fees":
                let payFeesInput = await inquirer.prompt([{
                    name: "id",
                    type: "number",
                    message: chalk.yellow("Enter the student Id")
                },
                {
                    name: "amount",
                    type: "number",
                    message: chalk.yellow("Enter amount to pay")
                }])
    
                stdManager.payStudentFees(payFeesInput.id, payFeesInput.amount)
                break;
    
            case "Show Student Balance":
                let balanceInput = await inquirer.prompt({
                    name: "id",
                    type: "number",
                    message: chalk.yellow("Enter the student Id")
                })
                stdManager.showStudentBalance(balanceInput.id)
                break
    
            case "Show Student Status":
                let statusInput = await inquirer.prompt({
                    name: "id",
                    type: "number",
                    message: chalk.yellow("Enter the student Id")
                })
            stdManager.showStudentStatus(statusInput.id)
            break
    
            case "Exit":
                console.log(chalk.red("\nYou are Leaving...."));
                console.log(chalk.magenta("Thanks for using! Looking forward for the next time\n"));
                process.exit()
        }
    }while(true)
   
}

start()
