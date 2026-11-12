import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeading from '../../components/shared/PageHeading'
import StateMessage from '../../components/shared/StateMessage'
import SampleDataNotice from '../../components/shared/SampleDataNotice'
import PropertyCard from './PropertyCard'
import PropertyFilters from './PropertyFilters'
import Pagination from './Pagination'
import { propertiesData } from './propertiesData'

const PAGE_SIZE = 6
const emptyFilters = { location: '', minRent: '', maxRent: '', type: '', bedrooms: '', availability: '' }

function applyFilters(list, f) {
  return list.filter((p) => {
    if (f.location && !p.location.toLowerCase().includes(f.location.trim().toLowerCase())) return false
    if (f.minRent !== '' && p.rent < Number(f.minRent)) return false
    if (f.maxRent !== '' && p.rent > Number(f.maxRent)) return false
    if (f.type && p.type !== f.type) return false
    if (f.bedrooms === '4' && p.bedrooms < 4) return false
    if (f.bedrooms && f.bedrooms !== '4' && p.bedrooms !== Number(f.bedrooms)) return false
    if (f.availability === 'available' && !p.available) return false
    if (f.availability === 'unavailable' && p.available) return false
    return true
  })
}

function PropertiesPage() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState({ ...emptyFilters, location: searchParams.get('location') || '' })
  const [page, setPage] = useState(1)

  function handleChange(name, value) {
    setFilters((prev) => ({ ...prev, [name]: value }))
    setPage(1)
  }

  function handleReset() {
    setFilters(emptyFilters)
    setPage(1)
  }