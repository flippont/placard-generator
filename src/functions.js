
function printer() {
    changeView("grid", document.getElementsByClassName("rightButton")[0])
    drawPlacard(true)
    window.print()
    drawPlacard()
}
function removeCrest() {
    imageURL = "";
    schoolName = "";
    generate()
}
function changeSchool(ele) {
    if(event.key === "Enter") {
        schoolName = ele.value;
        generate()
    }
}

function delList() {
    list = []
    textarea.value = list
    generate()
}

function saveList() {
    list = []
    let splitText = textarea.value.split(",")
    for (let i = 0; i < splitText.length; i++) {
        for (let j = 0; j < countriesFlags.length; j++) {
            if (countriesFlags[j].name.toLowerCase() == splitText[i].toLowerCase()) {
                list.push(countriesFlags[j].name)
            }
        }
    }
    textarea.value = list
    generate()
}

function upload() {
    const fileUploadInput = document.getElementById("upload");
    console.log(fileUploadInput)
    // using index [0] to take the first file from the array
    const image = fileUploadInput.files[0];

    // check if the file selected is not an image file
    if (!image.type.includes("image")) {
    return alert("Only images are allowed!");
    }

    // check if size (in bytes) exceeds 10 MB
    if (image.size > 10_000_000) {
    return alert("Maximum upload size is 10MB!");
    }   
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    
    fileReader.onload = (fileReaderEvent) => {
        imageURL = fileReaderEvent.target.result;
        generate()
    }
}

function search(ele, type = "search") {
    if (event.key === "Enter" || type == "button") {
        for (let i = 0; i < countriesFlags.length; i++) {
            if (countriesFlags[i].name.toLowerCase() == ele.value.toLowerCase()) {
                for(let j = 0; j < (quantity.value || 1); j++) {
                    list.push(countriesFlags[i].name)
                    if(j == quantity.value - 1) {
                        quantity.value = 1;
                    }
                }
            }
        }
        textarea.value = list.join(",")
        textarea.innerHTML = list.join(",");
        ele.value = ""
        generate()
    }
}

function generate() {
    let flagName = "";
    if(list.length == 0) {
        if(currentView == "grid") {
            content.classList.remove("grid")
        }
        content.innerHTML = "<div class='empty'><b style='font-size: 20px'>Your list is empty!</b><p>Enter a country name above, define the quantity in the textbox beside it and click 'Add'</p></div>";
    } else {
        if(currentView == "grid") {
            content.classList.add("grid")
        }
        content.innerHTML = "";
    }
    let calcWidth = (window.innerWidth/2 - 100)
    preview.innerHTML = ""
    preview.appendChild(generatePlacard(schoolName, imageURL, (countriesFlags[randomCountry].alias != "") ? countriesFlags[randomCountry].alias : countriesFlags[randomCountry].name, countriesFlags[randomCountry].normal, -1))

    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < countriesFlags.length; j++) {
            if (countriesFlags[j].name.toLowerCase() == list[i].toLowerCase()) {
                if (countriesFlags[j].alias != "") {
                    flagName = countriesFlags[j].alias;
                } else {
                    flagName = countriesFlags[j].name;
                }
                content.appendChild(generatePlacard(schoolName, imageURL, flagName, countriesFlags[j].normal, i));
            }
        }
    }
    drawPlacard();
}

function generatePlacard (schoolName, schoolURL, flagName, flagURL, index) {
    let outerDiv = document.createElement("div")
    let headerDiv = document.createElement("div")
    let footerDiv = document.createElement("div")
    let innerDiv = document.createElement("div")
    let crestImg = document.createElement("img")
    let flagImg = document.createElement("img")
    let schoolText = document.createElement("p")
    let delegateText = document.createElement("p")
    let deleteButton = document.createElement("button")

    outerDiv.className = "container"
    footerDiv.className = "footer"
    headerDiv.className = "header"
    innerDiv.className = "innerCont"
    crestImg.className = "crestIMG"
    flagImg.className = "flag"
    schoolText.className = "school"
    deleteButton.className = "deleteBtn"
    delegateText.className = "delegate"

    crestImg.src = schoolURL
    flagImg.src = flagURL
    schoolText.innerHTML = schoolName
    delegateText.innerHTML = flagName
    deleteButton.innerHTML = "✖"
    deleteButton.onclick = () => {
        content.removeChild(outerDiv)
        console.log(index)
        list.splice(index, 1)
        textarea.value = list
        generate()
    }

    if(index != -1) {
        outerDiv.appendChild(deleteButton)
    }

    footerDiv.appendChild(crestImg)
    footerDiv.appendChild(schoolText)
    headerDiv.appendChild(flagImg)
    headerDiv.appendChild(delegateText)
    innerDiv.appendChild(footerDiv)
    innerDiv.appendChild(headerDiv)
    outerDiv.appendChild(innerDiv)

    return outerDiv
}
function drawPlacard(printer = false) {

    let delegates = document.querySelectorAll(".delegate");
    let school = document.querySelectorAll(".school");
    let images = document.querySelectorAll(".flag");
    for (let j = 0; j < images.length; j++) {
        if(currentView == "list" && j != 0) {
            images[j].style.height = "60%";
        } else {
            images[j].style.height = imageSize + "%"; 
        }
    }
    
    for (let i = 0; i < delegates.length; i++) {
        let delegate = delegates[i];
        console.log(images[i].style.width)
        delegate.style.fontFamily = fontFamily;
        let elemSize = (printer) ? document.body.clientWidth : document.querySelectorAll(".container")[0].clientWidth
        if(currentView == "list" && i != 0) {    
            delegate.style.fontSize = "17.5px";
            school[i].style.fontSize = "17.5px";
        } else {
            delegate.style.fontSize = (elemSize / (100 - fontSize)) + "px";
            school[i].style.fontSize = (elemSize / 50) + "px";
        }
        console.log(delegate.style.fontSize)
        if (fontType == "bold") {
            delegate.style.fontWeight = "bold";
            delegate.style.fontStyle = "normal";
        } else {
            delegate.style.fontWeight = "normal";
            delegate.style.fontStyle = fontType;
        }
        
    }
}

function changeView(view, element) {
    currentView = view;
    document.getElementsByClassName("leftButton")[0].classList.remove("active")
    document.getElementsByClassName("rightButton")[0].classList.remove("active")
    element.classList.add("active")
    if(currentView == "list") {
        content.classList.remove("grid")
        content.classList.add("list")
    } else {
        content.classList.remove("list")
        content.classList.add("grid")
    }
    generate()
}

function enforceMinMax(el) {
    if (el.value != "") {
        if (parseInt(el.value) < parseInt(el.min)) {
            el.value = el.min;
        }
        if (parseInt(el.value) > parseInt(el.max)) {
            el.value = el.max;
        }
    } else {
        el.value = el.min
    }
}

function drawBGCanvas() {
    let loadArray = []
    for(let i=0; i<20; i++) {
        for(let j=0; j<20; j++) {
            const image = new Image(60, 45); // Using optional size for image
            image.src = countriesFlags[Math.floor(Math.random() * (countriesFlags.length - 1))].normal;
            image.crossOrigin = "anonymous"
            image.onload = () => {
                ctx.drawImage(image, i * (canvas.width / 20), j * (( canvas.width / 20 ) / 1.5), canvas.width / 20, ( canvas.width / 20 ) / 1.5 );        
                loadArray.push(i,j)
                if(loadArray.length == 361) { // This is a programming sin if I've ever seen one
                    var imageDataURL = canvas.toDataURL();
                    //set the dynamic image as the background
                    document.body.style.background = 
                    "url('"+imageDataURL+"') repeat";
                }
            }
        }
    }
}
drawBGCanvas()
generate()
