function printer() {
    output.style.width = "100vw"
    elementWidth = 1440
    generate()
    window.print()
    noPrint.style.width = (window.innerWidth / 2) + "px"
    elementWidth = window.innerWidth / 2
    output.style.width = (window.innerWidth / 2) + "px"
    generate()
}
function removeCrest() {
    imageURL = '';
    schoolName = '';
    generate()
}
function changeSchool(ele) {
    if(event.key === 'Enter') {
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
    const fileUploadInput = document.getElementById('upload');
    console.log(fileUploadInput)
    // using index [0] to take the first file from the array
    const image = fileUploadInput.files[0];

    // check if the file selected is not an image file
    if (!image.type.includes('image')) {
    return alert('Only images are allowed!');
    }

    // check if size (in bytes) exceeds 10 MB
    if (image.size > 10_000_000) {
    return alert('Maximum upload size is 10MB!');
    }   
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    
    fileReader.onload = (fileReaderEvent) => {
        imageURL = fileReaderEvent.target.result;
        generate()
    }
}

function search(ele, type = 'search') {
    if (event.key === 'Enter' || type == 'button') {
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
        textarea.innerHTML = list.join(',');
        ele.value = ''
        generate()
    }
}

function generate() {
    let flagName = "";
    content.innerHTML = "";
    let calcWidth = (elementWidth - 100)
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < countriesFlags.length; j++) {
            if (countriesFlags[j].name.toLowerCase() == list[i].toLowerCase()) {
                if (countriesFlags[j].alias != undefined) {
                    flagName = countriesFlags[j].alias;
                } else {
                    flagName = countriesFlags[j].name;
                }

                let d = "<div class='container' style='width: " + calcWidth + "px; height: " + (calcWidth / Math.sqrt(2)) + "px'>"
                d += "<div class='footer'>";
                d += "<img class='crestIMG' src='"+imageURL+"' style='display:"+(imageURL?'block':'none')+";'>";
                d += "<p class='school'>" + schoolName + "</p>";
                d += "</div>"
                d += "<img class='flag' src='" + countriesFlags[j].normal + "'>";
                d += "<p class='delegate'>" + flagName + "</p>";
                d += "</div>";
                content.innerHTML += d;
            }
        }
    }
    drawPlacard();
}

function drawPlacard() {
    let delegates = document.querySelectorAll('.delegate');
    let school = document.querySelectorAll('.school');
    let images = document.querySelectorAll('.flag');
    for (let j = 0; j < images.length; j++) {
        images[j].style.height = imageSize + "%";
    }
    for (let i = 0; i < delegates.length; i++) {
        let delegate = delegates[i];
        delegate.style.fontFamily = fontFamily;
        delegate.style.fontSize = (elementWidth / (100 - fontSize)) + "px";
        school[i].style.fontSize = (elementWidth / 50) + "px";
        if (fontType == "bold") {
            delegate.style.fontWeight = "bold";
            delegate.style.fontStyle = "normal";
        } else {
            delegate.style.fontWeight = "normal";
            delegate.style.fontStyle = fontType;
        }
    }


}

function Export2Word(element, filename = '') {
    let preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    let postHtml = "</body></html>";
    let html = preHtml + document.getElementById(element).innerHTML + postHtml;

    let blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // Specify link url
    let url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + '.doc' : 'document.doc';

    // Create download link element
    let downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = url;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }

    document.body.removeChild(downloadLink);
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
