
fontarea.addEventListener("change", function() {
    enforceMinMax(fontarea)
    fontSize = this.value;
    drawPlacard()
})

imagesize.addEventListener("change", function() {
    enforceMinMax(imagesize)
    imageSize = this.value;
    drawPlacard()
})
fontfamily.addEventListener("change", function handleChange(event) {
    fontFamily = fontfamily.options[fontfamily.selectedIndex].value;
    drawPlacard();
});
fonttype.addEventListener("change", function handleChange(event) {
    fontType = fonttype.options[fonttype.selectedIndex].value;
    drawPlacard();
});

window.onresize = () => {
    noPrint.style.width = (window.innerWidth / 2) + "px"
    elementWidth = window.innerWidth / 2
    output.style.width = (window.innerWidth / 2) + "px"
    generate()
}

let observer = new ResizeObserver(function(entries) {
    elementWidth = (window.innerWidth - parseInt(entries[0].target.style.width, 10)) || (window.innerWidth / 2)
    output.style.width = (window.innerWidth - parseInt(entries[0].target.style.width, 10)) + "px"
    generate()
});
observer.observe(noPrint)

