// OWNER: Member 3 - Quincy. Search and filter controls.
import FormField from '../../components/shared/FormField'
import SelectField from '../../components/shared/SelectField'
import Button from '../../components/shared/Button'
import { propertyTypes } from './propertiesData'

function PropertyFilters({ filters, onChange, onReset }) {
  function handle(e) {
    onChange(e.target.name, e.target.value)
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} aria-label="Property filters"
      className="grid gap-3 rounded-lg border border-slate-200 bg-white p-4 sm:grid-cols-2 lg:grid-cols-3">
      <FormField id="location" name="location" label="Location" placeholder="e.g. Ruiru"
        value={filters.location} onChange={handle} />
      <FormField id="minRent" name="minRent" label="Minimum rent (KSh)" type="number" min="0"
        value={filters.minRent} onChange={handle} />
      <FormField id="maxRent" name="maxRent" label="Maximum rent (KSh)" type="number" min="0"
        value={filters.maxRent} onChange={handle} />
      <SelectField id="type" name="type" label="Property type" value={filters.type} onChange={handle}
        options={[{ value: '', label: 'All types' }, ...propertyTypes]} />
      <SelectField id="bedrooms" name="bedrooms" label="Bedrooms" value={filters.bedrooms} onChange={handle}
        options={[{ value: '', label: 'Any' }, { value: '1', label: '1' }, { value: '2', label: '2' },
          { value: '3', label: '3' }, { value: '4', label: '4 or more' }]} />
      <SelectField id="availability" name="availability" label="Availability" value={filters.availability} onChange={handle}
        options={[{ value: '', label: 'All' }, { value: 'available', label: 'Available' }, { value: 'unavailable', label: 'Unavailable' }]} />
      <div className="sm:col-span-2 lg:col-span-3">
        <Button type="button" variant="outline" onClick={onReset}>Clear filters</Button>
      </div>
    </form>
  )
}

export default PropertyFilters
