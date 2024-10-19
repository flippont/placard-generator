let fontFamily = "sans-serif";
let fontType = "bold";
let currentView = "grid"
let fontSize = 80;
let imageSize = 45;
let country = "";
let source = "";
let list = []
let imageURL = './src/images/highschool.gif'
let schoolName = 'The Highschool Dublin'

const canvas = document.getElementById("canvas")
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

const content = document.getElementById("content");
const fontarea = document.getElementById("size");
const strokearea = document.getElementById("stroke");
const imagesize = document.getElementById("image-size");
const fontfamily = document.getElementById("fonts");
const fonttype = document.getElementById("style");
const output = document.getElementById("content");
const textarea = document.getElementById("output");
const countrylist = document.getElementById("countrylist");
const quantity = document.getElementById("quantity");
const preview = document.getElementById("preview");
const noPrint = document.getElementsByClassName("noPrint")[0]

for (let i = 0; i < countriesFlags.length; i++) {
    let option = document.createElement("option");
    option.value = countriesFlags[i].name
    option.innerHTML = countriesFlags[i].alias || countriesFlags[i].name
    countrylist.appendChild(option)
}

let randomCountry = Math.floor(Math.random() * (countriesFlags.length - 1))