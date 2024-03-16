import TableOperations from '../../ui/TableOperations'
import Filter from '../../ui/Filter'
import SortBy from '../../ui/SortBy'

function CabinTableOperations() {
   return (
      <TableOperations>
         <Filter
            filterField={'discount'}
            options={[
               { value: 'all', label: 'All' },
               { value: 'no-discount', label: 'No Discount' },
               { value: 'with-discount', label: 'With Discount' },
            ]}
         ></Filter>
         <SortBy
            options={[
               { value: 'name-asc', label: 'Sort By name (A-Z)' },
               { value: 'name-desc', label: 'Sort By name (Z-A)' },
               {
                  value: 'regularPrice-asc',
                  label: 'Sort By price (Low-High)',
               },
               {
                  value: 'regularPrice-desc',
                  label: 'Sort By price (High-Low)',
               },
               {
                  value: 'maxCapacity-asc',
                  label: 'Sort By capacity (Low-High)',
               },
               {
                  value: 'maxCapacity-desc',
                  label: 'Sort By capacity (High-Low)',
               },
            ]}
         ></SortBy>
      </TableOperations>
   )
}

export default CabinTableOperations
