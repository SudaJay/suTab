import { onMounted, ref } from 'vue'
import { useStorage } from '@vueuse/core'

type WeatherState = {
  city: string
  temp: number
  condition: string
  humidity?: number
  wind?: string
  feelsLike?: number
  updatedAt: string
  source: 'open-meteo' | 'demo'
}

type WeatherCity = {
  name: string
  country?: string
  latitude?: number
  longitude?: number
}

const defaultCity: WeatherCity = {
  name: 'Hangzhou',
}

function createDemoWeather(cityName = defaultCity.name): WeatherState {
  return {
    city: cityName,
    temp: 23,
    condition: 'Soft Cloud',
    humidity: 62,
    wind: 'Light breeze',
    feelsLike: 24,
    updatedAt: 'Demo',
    source: 'demo',
  }
}

type GeocodingResult = {
  name: string
  country?: string
  admin1?: string
  latitude: number
  longitude: number
}

type OpenMeteoGeocodingResponse = {
  results?: GeocodingResult[]
}

type OpenMeteoForecastResponse = {
  current?: {
    temperature_2m?: number
    apparent_temperature?: number
    relative_humidity_2m?: number
    weather_code?: number
    wind_speed_10m?: number
    time?: string
  }
}

const weatherCodes: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Rime fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Dense drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Rain showers',
  82: 'Heavy showers',
  95: 'Thunderstorm',
}

function formatTime(value?: string) {
  return new Intl.DateTimeFormat('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(value ? new Date(value) : new Date())
}

async function geocodeCity(name: string) {
  const params = new URLSearchParams({
    name,
    count: '1',
    language: 'zh',
    format: 'json',
  })

  const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`)
  if (!response.ok) throw new Error(`City lookup failed: ${response.status}`)

  const data = (await response.json()) as OpenMeteoGeocodingResponse
  const city = data.results?.[0]
  if (!city) throw new Error(`No weather city found for "${name}"`)
  return city
}

async function fetchCurrentWeather(city: WeatherCity): Promise<WeatherState> {
  const resolvedCity =
    city.latitude !== undefined && city.longitude !== undefined
      ? city
      : await geocodeCity(city.name)

  const params = new URLSearchParams({
    latitude: String(resolvedCity.latitude),
    longitude: String(resolvedCity.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m',
    timezone: 'auto',
  })

  const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params.toString()}`)
  if (!response.ok) throw new Error(`Weather request failed: ${response.status}`)

  const data = (await response.json()) as OpenMeteoForecastResponse
  const current = data.current
  if (!current) throw new Error('Weather response is missing current data')

  return {
    city: resolvedCity.name,
    temp: current.temperature_2m ?? 23,
    condition: weatherCodes[current.weather_code ?? 2] ?? 'Partly cloudy',
    humidity: current.relative_humidity_2m,
    wind: current.wind_speed_10m === undefined ? undefined : `${Math.round(current.wind_speed_10m)} km/h`,
    feelsLike: current.apparent_temperature,
    updatedAt: formatTime(current.time),
    source: 'open-meteo',
  }
}

export function useWeather() {
  const cityConfig = useStorage<WeatherCity>('arc-home-weather-city', defaultCity)
  const weather = ref<WeatherState>(createDemoWeather(cityConfig.value.name))
  const loading = ref(false)
  const error = ref('')

  async function refresh() {
    loading.value = true
    error.value = ''

    try {
      weather.value = await fetchCurrentWeather(cityConfig.value)
    } catch (caught) {
      error.value = caught instanceof Error ? caught.message : 'Weather request failed'
      weather.value = {
        ...createDemoWeather(cityConfig.value.name),
        updatedAt: formatTime(),
      }
    } finally {
      loading.value = false
    }
  }

  function setCity(city: WeatherCity) {
    cityConfig.value = {
      name: city.name.trim() || defaultCity.name,
    }
    void refresh()
  }

  onMounted(refresh)

  return {
    weather,
    loading,
    error,
    cityConfig,
    refresh,
    setCity,
  }
}
