class TempManager {
    constructor() {
        this._cityData = []
    }

    async getDataFromDB () {
        let cities = await $.get('/cities')
        cities.forEach(c => c.saved = true)
        this._cityData.push(...cities)
    }

    async getCityData (cityName) {
        let cityData = await $.get(`/city/${cityName}`)
        this._cityData.push({
            name: cityData.location.name,
            updatedAt: moment(cityData.current.last_updated, "YYYY-MM-DD HH:mm").format(),
            temperature: cityData.current.temp_c,
            condition: cityData.current.condition.text,
            conditionPic: cityData.current.condition.icon,
            saved: false
        })
    }

    saveCity (cityName) {
        let index = this._cityData.findIndex(c => c.name == cityName)
        this._cityData[index].saved = true
        $.post('/city', this._cityData[index], function () {})
    }

    removeCity (cityName) {
        let removeIndex = this._cityData.findIndex(c => c.name == cityName)
        this._cityData.splice(removeIndex, 1)
        $.ajax({
            type: "DELETE",
            url: `/city/${cityName}`
        })
    }

    async updateCity (cityName) {
        let changeIndex = this._cityData.findIndex(c => c.name == cityName)
        let updatedCity = await $.ajax({
            type: "PUT",
            url: `/city/${cityName}`
        })
        updatedCity.saved = true
        this._cityData.splice(changeIndex, 1, updatedCity)
    }

    async updateAllCities (date) {
        this._cityData.forEach(async (c) => {
            if(date - c.updatedAt >= 3*60*60*1000) {
                await this.updateCity(c.name)
            }
        })
    }

    getCities() {
        return this._cityData
    }

    removeCities () {
        this._cityData.splice(0)
    }
}