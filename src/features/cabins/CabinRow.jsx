import styled from 'styled-components'
import { formatCurrency } from '../../utils/helpers'

import { useState } from 'react'
import CreateCabinForm from './CreateCabinForm'
import { useDeleteCabin } from './useDeleteCabin'
import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2'
import { useCreateCabin } from './useCreateCabin'
import Modal from '../../ui/Modal'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Table from '../../ui/Table'
import Menus from '../../ui/Menus'

const Img = styled.img`
   display: block;
   width: 6.4rem;
   aspect-ratio: 3 / 2;
   object-fit: cover;
   object-position: center;
   transform: scale(1.5) translateX(-7px);
`

const Cabin = styled.div`
   font-size: 1.6rem;
   font-weight: 600;
   color: var(--color-grey-600);
   font-family: 'Sono';
`

const Price = styled.div`
   font-family: 'Sono';
   font-weight: 600;
`

const Discount = styled.div`
   font-family: 'Sono';
   font-weight: 500;
   color: var(--color-green-700);
`

function CabinRow({ cabin }) {
   const [showForm, setShowForm] = useState(false)
   const { isCreating, createCabin } = useCreateCabin()
   const { isDeleting, deleteCabin } = useDeleteCabin()

   const {
      id: cabinId,
      name,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
   } = cabin
   function handleDupCabin() {
      createCabin({
         name: `Copy of ${name}`,
         maxCapacity,
         regularPrice,
         discount,
         image,
         description,
      })
   }

   return (
      <Table.Row>
         <Img src={image}></Img>
         <Cabin>{name}</Cabin>
         <div>Fits up to {maxCapacity} guests</div>
         <Price> {formatCurrency(regularPrice)}</Price>
         {discount > 0 ? (
            <Discount>
               {formatCurrency(regularPrice - regularPrice * (discount / 100))}
            </Discount>
         ) : (
            <span>&mdash;</span>
         )}
         <div>
            <Modal>
               <Menus.Menu>
                  <Menus.Toggle id={cabinId}></Menus.Toggle>
                  <Menus.List id={cabinId}>
                     <Menus.Button
                        icon={<HiSquare2Stack></HiSquare2Stack>}
                        onClick={handleDupCabin}
                     >
                        Duplicate
                     </Menus.Button>
                     <Modal.Open opens={'edit'}>
                        <Menus.Button icon={<HiPencil></HiPencil>}>
                           Edit
                        </Menus.Button>
                     </Modal.Open>
                     <Modal.Open opens={'delete'}>
                        <Menus.Button icon={<HiTrash></HiTrash>}>
                           Delete
                        </Menus.Button>
                     </Modal.Open>
                  </Menus.List>

                  <Modal.Window name={'edit'}>
                     <CreateCabinForm cabinToEdit={cabin} />
                  </Modal.Window>

                  <Modal.Window name={'delete'}>
                     <ConfirmDelete
                        resourceName={'cabins'}
                        disabled={isDeleting}
                        onConfirm={() => deleteCabin(cabinId)}
                     ></ConfirmDelete>
                  </Modal.Window>
               </Menus.Menu>
            </Modal>
         </div>
      </Table.Row>
   )
}

export default CabinRow
