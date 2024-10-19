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
