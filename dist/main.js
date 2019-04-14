// $.ajaxSetup({timeout:60000})

const manager = new TempManager
const renderer = new Renderer

const loadPage = async () => {
    await manager.getDataFromDB()
    renderer.renderData(manager.getCities())
}

const handleSearch = async (city) => {
    await manager.getCityData(city)
    renderer.renderData(manager.getCities())
}

$("#search-button").on("click", () => {
    handleSearch($("input").val())
})

$("#cities-container").on("click", ".save-button", function () {
    manager.saveCity($(this).closest(".city").data("cityname"))
    renderer.renderData(manager.getCities())
})

$("#cities-container").on("click", ".delete-button", function () {
    manager.removeCity($(this).closest(".city").data("cityname"))
    renderer.renderData(manager.getCities())
})

loadPage()