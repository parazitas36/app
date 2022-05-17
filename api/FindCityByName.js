export const FindCityByName = async(cityName) => {
    const URL = `https://api.maptiler.com/geocoding/${cityName.replace(" ", "+")}.json?key=VvCQp2eOaBtVo4k6aA6q`
    const response = await fetch(URL);
    const json = await response.json();
    const result = json['features'][0]['center']
    return result
}