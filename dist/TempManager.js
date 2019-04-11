class TempManager {
    constructor() {
        this._cityData = []
    }

    async getDataFromDB () {
        let cities = await $.get('./cities')
        this._cityData.push(...cities)
    }

    async getCityData (cityName) {
        let cityData = await $.get(`/city/${cityName}`)
        console.log(cityData)
        this._cityData.push({
            name: cityData.location.name,
            updatedAt: moment(cityData.current.last_updated, "YYYY-MM-DD HH:mm").format(),
            temperature: cityData.current.temp_c,
            condition: cityData.current.condition.text,
            conditionPic: cityData.current.condition.icon
        })
    }

    saveCity (cityName) {
        let city = this._cityData.find(c => c.name == cityName)
        console.log(city)
        $.post('./city', city, function () {})
    }

    removeCity (cityName) {
        let removeIndex = this._cityData.findIndex(c => c.name == cityName)
        this._cityData.splice(removeIndex, 1)
        $.ajax({
            type: "DELETE",
            url: `./city/${cityName}`,
            success: function () {}
        });
    }

    getCities() {
        return this._cityData
    }

    removeCities () {
        this._cityData.splice(0)
    }
}