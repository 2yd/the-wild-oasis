import Spinner from '../../ui/Spinner'
import CabinRow from './CabinRow'
import { useCabins } from './useCabins'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'
import { useSearchParams } from 'react-router-dom'
import Empty from '../../ui/Empty'

function CabinTable() {
   const { isLoading, cabins, error } = useCabins()
   const [searchParams] = useSearchParams()
   if (isLoading) {
      return <Spinner></Spinner>
   }
   if (cabins.length === 0) {
      return <Empty resource={'cabins'}></Empty>
   }
   const filterValue = searchParams.get('discount') || 'all'
   let filteredCabins
   if (filterValue === 'all') {
      filteredCabins = cabins
   }
   if (filterValue === 'no-discount') {
      filteredCabins = cabins.filter(cabin => cabin.discount === 0)
   }
   if (filterValue === 'with-discount') {
      filteredCabins = cabins.filter(cabin => cabin.discount > 0)
   }
   const sortBy = searchParams.get('sortby') || 'startDate-asc'
   const [field, direction] = sortBy.split('-')
   const sortedCabins = filteredCabins.sort((a, b) => {
      if (direction === 'asc') {
         return a[field] > b[field] ? 1 : -1
      } else {
         return a[field] < b[field] ? 1 : -1
      }
   })
   return (
      <Menus>
         <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
            <Table.Header>
               <div></div>
               <div>Cabin</div>
               <div>Capacity</div>
               <div>Price</div>
               <div>Discount</div>
               <div></div>
            </Table.Header>
            <Table.Body
               data={sortedCabins}
               render={cabin => (
                  <CabinRow cabin={cabin} key={cabin.id}></CabinRow>
               )}
            ></Table.Body>
         </Table>
      </Menus>
   )
}

export default CabinTable
