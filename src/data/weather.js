//getting API data for weather

export async function weatherData() {
    try {
        const res = await fetch(import.meta.env.VITE_WEATHER_API)
        if (!res.ok) {
            throw new Error('Weather API request failed')
        }
        const data = await res.json()
        return data
    } catch (error) {
        console.warn('Weather API unavailable:', error.message)
        // Return mock data when API fails
        return {
            location: { name: 'Your City' },
            current: {
                temp_c: 22,
                condition: {
                    text: 'Partly Cloudy',
                    icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png'
                }
            }
        }
    }
}
