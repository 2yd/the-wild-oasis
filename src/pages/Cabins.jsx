import { useEffect, useState } from 'react'
import Heading from '../ui/Heading'
import Button from '../ui/Button'
import Row from '../ui/Row'
import { getCabins } from '../services/apiCabins'
import CabinTable from '../features/cabins/CabinTable'
import CreateCabinForm from '../features/cabins/CreateCabinForm'
import AddCabin from '../features/cabins/AddCabin'
import CabinTableOperations from '../features/cabins/CabinTableOperations'
function Cabins() {
   useEffect(() => {
      getCabins().then(cabins => {
         console.log(cabins)
      })
   }, [])
   return (
      <>
         <Row type="horizontal">
            <Heading as="h1">All cabins</Heading>
            <CabinTableOperations></CabinTableOperations>
         </Row>
         <Row>
            <CabinTable></CabinTable>
            <AddCabin></AddCabin>
         </Row>
      </>
   )
}

export default Cabins
