export const ReverseGeocoding = async(longitude, latitude, setCity) => {
    const URL = `https://api.maptiler.com/geocoding/${longitude},${latitude}.json?key=VvCQp2eOaBtVo4k6aA6q`
    const response = await fetch(URL);
    const json = await response.json();
    const city = json['features'][0]['context'][0]['text']
    setCity(city);
}