function printer() {
    changeView("grid", document.getElementsByClassName("rightButton")[0])
    drawPlacard(true)
    window.print()
    drawPlacard()
}
function removeCrest(element) {
    if(element.innerHTML == "Remove") {
        imageURL = "";
        schoolName = "";
        element.innerHTML = "Reset"
        generate()
    } else {
        imageURL = "./src/images/highschool.gif"
        schoolName = "The Highschool";
        element.innerHTML = "Remove";
        generate()
    }
    
}
function changeSchool(ele, element2) {
    if(event.key === "Enter") {
        schoolName = ele.value;
        element2.innerHTML = "Remove"
        generate()
    }
}

function openModal(element) {
    cover.style.display = "block"
    modal.style.display = "block"
    let modalCont = document.getElementById("modalContent")

    modalCont.innerHTML = "";
    if(element.dataset.confirm) {
        let header = document.createElement("b")
        let contents = document.createElement("p")
        let button1 = document.createElement("button")
        let button2 = document.createElement("button")
        header.innerHTML = "Delete"
        contents.innerHTML = element.dataset.confirm;
        button1.innerHTML = "I'm sure"
        button1.style.marginLeft = "0px"
        button2.innerHTML = "I'll pass for now"

        button1.onclick = () => {
            delList()
            closeModal()
        }

        button2.onclick = () => {
            closeModal()
        }

        header.className = "modalHeader"
        contents.className = "modalContent"

        modalCont.appendChild(header)
        modalCont.appendChild(contents)
        modalCont.appendChild(button1)
        modalCont.appendChild(button2)
    } else {
        let header = document.createElement("b")
        let contents = document.createElement("p")
        let input = document.createElement("input")
        let button = document.createElement("button")
        let label = document.createElement("label")
        let span = document.createElement("span")
        let span2 = document.createElement("span")
        let checkbox = document.createElement("input")
        let substitute = document.createElement("substitute")

        label.innerHTML = "Print only mode"
        span.innerHTML = "Make the reciever un-able to edit the list of placards. I.e., good for printing."
        span2.innerHTML = "Output"
        header.innerHTML = "Share"
        contents.innerHTML = element.dataset.share;
        let locations = new URL(window.location.href)
        locations.searchParams.set("data", btoa(textarea.innerHTML))
        locations.searchParams.set("imgsize", imageSize)
        locations.searchParams.set("texttype", fontType)
        locations.searchParams.set("textsize", fontSize)
        locations.searchParams.set("font", fontFamily)
        
        input.value =  locations
        button.innerHTML = "📋"

        header.className = "modalHeader"
        contents.className = "modalContent"
        input.readOnly = true;
        label.className = "control"
        span.className = span2.className = "rightSpan"
        substitute.className = "substitute"
        let checked = false;
        checkbox.onchange = () => {
            checked = !checked;
            let url = new URL(input.value)
            if(checked) {
                url.searchParams.set("print", true)
                input.value = url
            } else {
                url.searchParams.delete("s")
                input.value = url
            }
        }

        button.onclick = () => {
            input.select();
            input.setSelectionRange(0, 99999);
            navigator.clipboard.writeText(input.value);
        }

        checkbox.type = "checkbox"
        label.appendChild(span)
        label.appendChild(checkbox)
        label.appendChild(substitute)

        modalCont.appendChild(header)
        modalCont.appendChild(contents)
        modalCont.appendChild(label)
        modalCont.appendChild(input)
        modalCont.appendChild(button)
        modalCont.appendChild(span2)
    }
}

function closeModal() {
    cover.style.display = "none"
    modal.style.display = "none"
}

function delList() {
    list = []
    textarea.value = list
    generate()
}

function checkList(element) {
    document.getElementById('saveBtn').style.display='block'
    if(element.value == prevValue) {
        document.getElementById('saveBtn').style.display='none'
    }
}

function saveList() {
    list = []
    let splitText = textarea.value.split("/")
    for (let i = 0; i < splitText.length; i++) {
        let furtherSplit = splitText[i].split(":")
        for (let j = 0; j < countriesFlags.length; j++) {
            if (countriesFlags[j].name.toLowerCase() == furtherSplit[0].replace(/\s/g, "").toLowerCase()) {
                if(furtherSplit.length != 1) {
                    for(let k=0; k < furtherSplit[1].replace(/\s/g, ""); k++) {
                        list.push(countriesFlags[j].name)
                    }

                }            }
        }
    }
    generate()
}

function upload(element) {
    const fileUploadInput = document.getElementById("upload");
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
        element.innerHTML = "Remove"
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
    preview.appendChild(generatePlacard(schoolName, imageURL, (countriesFlags[randomCountry].alias != undefined) ? countriesFlags[randomCountry].alias : countriesFlags[randomCountry].name, countriesFlags[randomCountry].normal, -1))
    const counts = new Map()
    list.forEach(function (x) { counts.set(x, (counts.get(x) || 0) + 1) });
    console.log(JSON.stringify(counts))
    let final = ""
    for (let [key, value] of counts.entries()) { // Using the default iterator (could be `map.entries()` instead)
        final += " " + key + " : " + value + " /"
    }

    textarea.value = final;
    textarea.innerHTML = final;
    prevValue = final;
    counter.innerHTML = "You have " + (list.length || "no") + ((list.length == 1) ? " placard" : " placards");
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < countriesFlags.length; j++) {
            if (countriesFlags[j].name.toLowerCase() == list[i].toLowerCase()) {
                if (countriesFlags[j].alias != undefined) {
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
        list.splice(index, 1)
        textarea.value = list
        generate()
    }

    if(index != -1 && !justPrintMode) {
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
        delegate.style.fontFamily = fontFamily;
        let elemSize = (printer) ? document.body.clientWidth : document.querySelectorAll(".container")[0].clientWidth

        if(justPrintMode) {
            noPrint.style.display = "none"
            let element = document.querySelectorAll(".container")[1]
            let buttons = document.getElementsByClassName("hideprint")
            for(let j=0; j< buttons.length; j++) {
                buttons[j].style.display = "none"
            }
            if(element != undefined) {
                elemSize = element.clientWidth
            }
        }
        if(currentView == "list" && i != 0) {    
            delegate.style.fontSize = "17.5px";
            school[i].style.fontSize = "17.5px";
        } else {
            delegate.style.fontSize = (elemSize / (100 - fontSize)) + "px";
            school[i].style.fontSize = (elemSize / 50) + "px";
        }
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

function toggleCounter() {
    counterVis = !counterVis
    if(counterVis) {
        counter.style.display = "block"
    } else {
        counter.style.display = "none"
    }
}

function toggleBackground(element) {
    if(loadArray.length < 800) {flagBG = false; element.checked = false; return false}
    flagBG = !flagBG;
    var style = document.body.style;
    if(flagBG) {
        style.setProperty("--background", "url('"+backgroundURL+"') repeat");
    } else {
        style.setProperty("--background", "#FFF");

    }
}

function drawBGCanvas() {
    loadArray = []
    for(let i=0; i<10; i++) {
        for(let j=0; j<10; j++) {
            const image = new Image(60, 45); // Using optional size for image
            image.src = countriesFlags[Math.floor(Math.random() * (countriesFlags.length - 1))].normal;
            image.crossOrigin = "anonymous"
            image.onload = () => {
                ctx.drawImage(image, i * (canvas.width / 10), j * (( canvas.width / 10 ) / 1.5), canvas.width / 10, ( canvas.width / 10 ) / 1.5 );        
                loadArray.push(i,j)
                if(loadArray.length == 200) { // This is a programming sin if I've ever seen one
                    var imageDataURL = canvas.toDataURL();
                    //set the dynamic image as the background
                    var style = document.body.style;
                    style.setProperty("--background", "url('"+imageDataURL+"') repeat");
                }
            }
        }
    }
}

drawBGCanvas()
saveList()
