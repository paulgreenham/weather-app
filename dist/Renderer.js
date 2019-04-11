class Renderer {
    renderData (allCityData) {
        const source = $('#city-template').html()
        const template = Handlebars.compile(source)
        const hbText = template({allCityData})
        $('#cities-container').empty().append(hbText)
    }
}