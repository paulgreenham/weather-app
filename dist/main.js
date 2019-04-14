const manager = new TempManager
const renderer = new Renderer

const loadPage = async () => {
    let currentTime = moment().format()
    await manager.getDataFromDB()
    await manager.updateAllCities(currentTime)
    renderer.renderData(manager.getCities())
}

const handleSearch = async (city) => {
    await manager.getCityData(city)
    renderer.renderData(manager.getCities())
}

const handleUpdate = async (city) => {
    await manager.updateCity(city)
    renderer.renderData(manager.getCities())
}

$("#search-button").on("click", () => {
    handleSearch($("input").val())
})

$("input").keypress((event) => {
    if(event.which == 13) {
        handleSearch($("input").val())
    }
})

$("#cities-container").on("click", ".save-button", function () {
    manager.saveCity($(this).closest(".city").data("cityname"))
    renderer.renderData(manager.getCities())
})

$("#cities-container").on("click", ".delete-button", function () {
    manager.removeCity($(this).closest(".city").data("cityname"))
    renderer.renderData(manager.getCities())
})

$("#cities-container").on("click", ".refresh", function () {
    handleUpdate($(this).closest(".city").data("cityname"))
})

loadPage()