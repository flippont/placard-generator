let fontFamily = "sans-serif";
let fontType = "bold";
let fontSize = 70;
let imageSize = 43;
let country = "";
let source = "";
let elementWidth = (window.innerWidth / 2)
let list = []
let imageURL = 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogodix.com%2Flogo%2F1018774.gif&f=1&nofb=1&ipt=5342073ea7b278935d9dc6268cdaa8691717e406fcd4883662756ba4e6176f0a&ipo=images'
let schoolName = 'The Highschool Dublin'

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
const noPrint = document.getElementsByClassName("noPrint")[0]




for (let i = 0; i < countriesFlags.length; i++) {
    let option = document.createElement("option");
    option.value = countriesFlags[i].name
    option.innerHTML = countriesFlags[i].alias || countriesFlags[i].name
    countrylist.appendChild(option)
}