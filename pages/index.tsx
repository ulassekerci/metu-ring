import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl'
import DataBar from '../components/DataBar'

interface ringDataType {
  lat: string
  lng: string
  addr: string
  dir: number
  sp: string
  clr: string
  ago: number
  key: string
  id: string
  stops: any[]
}

const Home: NextPage = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [ringData, setRingData] = useState<ringDataType[] | null>(null)
  const [ringPins, setRingPins] = useState<JSX.Element[] | null>(null)
  const [status, setStatus] = useState(0)
  // 0 means nothing, 1 means ok, 2 means json is empty, 3 means errored

  const updateRingData = async () => {
    const apiReq = await fetch('/api/ring')
    try {
      const json = await apiReq.text()
      if (json === '') {
        setStatus(2)
      } else {
        setRingData(JSON.parse(json))
        setStatus(1)
      }
    } catch (error) {
      setStatus(3)
    }
  }

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) setDarkMode(true)
    updateRingData()
    const interval = setInterval(updateRingData, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!ringData) return
    const pins = ringData.map((ring) => (
      <Marker key={ring.id} longitude={Number(ring.lng)} latitude={Number(ring.lat)}>
        <img width={24} height={24} src='./favicon.ico' />
      </Marker>
    ))
    setRingPins(pins)
  }, [ringData])

  return (
    <>
      <Map
        initialViewState={{
          longitude: 32.778,
          latitude: 39.892,
          zoom: 13.2,
        }}
        style={{ height: '100vh' }}
        mapStyle={darkMode ? 'mapbox://styles/mapbox/dark-v10' : 'mapbox://styles/mapbox/streets-v11'}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      >
        {ringPins}
      </Map>
      {status >= 2 && <DataBar status={status} />}
    </>
  )
}

export default Home
