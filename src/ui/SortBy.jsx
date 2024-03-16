import { useSearchParams } from 'react-router-dom'
import Select from './Select'

function SortBy({ options }) {
   const [searchParams, setSearchParams] = useSearchParams()
   const sortBy = searchParams.get('sortby') || options[0].value
   function handleChange(e) {
      searchParams.set('sortby', e.target.value)
      setSearchParams(searchParams)
   }
   return (
      <Select
         options={options}
         type="white"
         value={sortBy}
         onChange={handleChange}
      />
   )
}

export default SortBy
