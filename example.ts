// Type Annotations
/* let myName: string = "Vic";
let isCool: boolean = true;
let favNumber: number = 8;

function add(a: number, b: number): number {
    return a + b;
}

console.log(add(10, 20)); */

// Inferred Types
// TS inferred the type base on the value assigned
/* let myName = "Vic"; // String
let isCool = true; // Boolean
let favNumber = 8; // Number


function add(a: number, b: number) {
    return a + b; // As well for the foo
}

let result = add(10, 20); // inferred a number
// result = 'String'; // Exception

const number = [1, 2, 4, 12];

// number.push('Wow'); // Excetion

// Union Types
const numberAndStrings = ["Amor", 2, "Victor"];
let theAnswer: string | number = 43;
theAnswer = "I can be whatever you want"; */

// Objects and Interfaces

/* interface Person {
    name: string;
    favNumber: number;
}

const person = {
    name: 'Victor',
    favNumber: 7
}

function greet(person: Person) {
    return `Hello ${person.name}`;
}

console.log("Testing Objects and interfaces");
console.log(greet(person)); */

// Optional Properties

/* type Person = {
    name: string;
    favNumber: number;
    dogName?: string;
    streamerType: StreamerType;
    getCurrentTime(): Date;
} */

/* type StreamerType = "Affiliate" | "Partner";

interface Person {
    name: string;
    favNumber: number;
    dogName?: string;
    streamerType: StreamerType;
    getCurrentTime(): Date;
}



const person = {
    name: 'Victor',
    favNumber: 7
}

function greet(person: Person) {
    if (person.getCurrentTime) {
        return `Hello ${person.name} and it is ${person.getCurrentTime()}`;
    }

    return `Hello ${person.name}`;
    
}

console.log("Testing Objects and interfaces");

function greetPersonAndDog(person: Person) {
    if (person.dogName) {
        if (person.getCurrentTime) {
            return `Hello ${person.name} and their dog ${person.dogName} and today it's ${person.getCurrentTime()}`;
        } else {
            return `Hello ${person.name} and their dog ${person.dogName}`;
        }
    }
    return greet(person);
}

const personWithDog: Person = {
    name: "Victor",
    favNumber: 9,
    dogName: "Floppy",
    streamerType: "Affiliate",
    getCurrentTime() {
        return new Date();
    }
}

console.log(greetPersonAndDog(personWithDog)); */

// Classes

/* class Person {
    name: string;
    dogName: string;
    favNumber: number;

    constructor(name: string, dogName: string, favNumber: number) {
        this.name = name;
        this.dogName = dogName;
        this.favNumber = favNumber;
    }
} */

class Person {
    static species = "Homosapien"
    constructor(
        public name: string,
        public dogName: string,
        public favNumber: number,
        private privateSecret: string, 
        protected internalSecret?: string,
    ) {
    }
}

const vic = new Person("Vic", "Floppy", 30, "super secret!", "Eres mi amor");

function greet(person: Person) {
    return `Hello ${person.name}`;
}

// Generics

function sortItems<T>(
    items: T[], 
    compareFn: (a: T, b: T) => number
): T[] {
    return items.sort(compareFn)
}

const numbers = [2,54,12,31,33,11,0];
const sortedNumbers = sortItems<number>(
    numbers, 
    (a, b) => a - b
);
console.log(sortedNumbers);

const names = ["victor", "Maria", "Ana"];

const sortedName = sortItems<string>(
    names,
    (a, b) => a.localeCompare(b)
)
console.log(sortedName);

// any, unknown, never
// You should avoid using any, any allows me to add any type of value to the greetAny function 
function greetAny(person: any) {
    return `Hello ${person.name}`;
}

// Type Assertions

// const x = "Hello" as unknown as number;
// x.toFixed(); // Exception

// worst escenarios
// @ts-ignore / @ts-nocheck nocheck it's using in the whole file
let myOtherName = "Amor";
// @ts-ignore allows me to skipt rules, usally used when you're working with libs.
myOtherName = 10;

