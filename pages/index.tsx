import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Map, { Marker } from 'react-map-gl'

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
  const [ringData, setRingData] = useState<ringDataType[] | null>(null)
  const [ringPins, setRingPins] = useState<null | JSX.Element[]>(null)

  const updateRingData = async () => {
    const apiReq = await fetch('/api/ring')
    try {
      const data = await apiReq.json()
      setRingData(data)
    } catch (error) {
      //handle error
    }
  }

  useEffect(() => {
    if (!ringData) updateRingData()
    const interval = setInterval(updateRingData, 5000)
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
          longitude: 32.7803,
          latitude: 39.8952,
          zoom: 13.5,
        }}
        style={{ height: '100vh' }}
        mapStyle='mapbox://styles/mapbox/streets-v11'
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_KEY}
      >
        {ringPins}
      </Map>
    </>
  )
}

export default Home
