let fontFamily = "Arial";
let fontType = "bold";
let fontSize = 70;
let imageSize = 45;
let country = "";
let source = "";
let elementWidth = (window.innerWidth / 2)
let list = []

const content = document.getElementById("content");
const fontarea = document.getElementById("size");
const strokearea = document.getElementById("stroke");
const imagesize = document.getElementById("image-size");
const fontfamily = document.getElementById("fonts");
const fonttype = document.getElementById("style");
const output = document.getElementById("content");
const textarea = document.getElementById("output");
const countrylist = document.getElementById("countrylist");
const noPrint = document.getElementsByClassName("noPrint")[0]




for (let i = 0; i < countriesFlags.length; i++) {
    let option = document.createElement("option");
    option.value = countriesFlags[i].name
    option.innerHTML = countriesFlags[i].alias || countriesFlags[i].name
    countrylist.appendChild(option)
}