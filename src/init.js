let locations = new URL(window.location.href);
let fontFamily = locations.searchParams.get("font") || "sans-serif";
let fontType = locations.searchParams.get("texttype") || "bold";
let fontSize = locations.searchParams.get("textsize") || 80;
let imageSize = locations.searchParams.get("imgsize") || 45;
let currentView = "grid"
let country = "";
let source = "";
let list = []
let imageURL = './src/images/highschool.gif'
let schoolName = 'The Highschool Dublin'
let backgroundURL = ""
let flagBG = false;
let counterVis = true;
let prevValue = "";
let loadArray = []
let justPrintMode = false;

const canvas = document.createElement("canvas")
canvas.width = window.innerWidth / 2;
canvas.height = (window.innerWidth / 2) / 1.5;
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
const counter = document.getElementById("counter");
const modal = document.getElementById("modal");
const cover = document.getElementById("cover");
const noPrint = document.getElementsByClassName("noPrint")[0]

imagesize.value = imageSize;
fontfamily.value = fontFamily;
fonttype.value = fontType;
fontarea.value = fontSize;
textarea.value = atob(locations.searchParams.get("data"))

for (let i = 0; i < countriesFlags.length; i++) {
    let option = document.createElement("option");
    option.value = countriesFlags[i].name
    option.innerHTML = countriesFlags[i].alias || countriesFlags[i].name
    countrylist.appendChild(option)
}

let randomCountry = Math.floor(Math.random() * (countriesFlags.length - 1))

if(locations.searchParams.get("print") == "true") {
    justPrintMode = true;
}