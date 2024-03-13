
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

function save() {
    list = []
    let splitText = textarea.value.split(",")
    for (let i = 0; i < splitText.length; i++) {
        for (let j = 0; j < countriesFlags.length; j++) {
            console.log(splitText[i])
            if (countriesFlags[j].name.toLowerCase() == splitText[i].toLowerCase()) {
                list.push(countriesFlags[j].name)
            }
        }
    }
    textarea.value = list
}

function search(ele) {
    if (event.key === 'Enter') {
        for (let i = 0; i < countriesFlags.length; i++) {
            if (countriesFlags[i].name.toLowerCase() == ele.value.toLowerCase()) {
                list.push(countriesFlags[i].name)
            }
        }
        textarea.value = list.join(",")
        textarea.innerHTML = list.join(',');
        ele.value = ''
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
    let images = document.querySelectorAll('.flag');
    for (let j = 0; j < images.length; j++) {
        images[j].style.width = imageSize + "%";
    }
    for (let i = 0; i < delegates.length; i++) {
        let delegate = delegates[i];
        delegate.style.fontFamily = fontFamily;
        delegate.style.fontSize = (elementWidth / (100 - fontSize)) + "px";
        if (delegates[i].innerHTML.includes("Nepal") && imageSize > 30) {
            images[i].style.width = "30%"
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
