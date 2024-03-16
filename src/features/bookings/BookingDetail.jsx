import styled from 'styled-components'

import BookingDataBox from './BookingDataBox'
import Row from '../../ui/Row'
import Heading from '../../ui/Heading'
import Tag from '../../ui/Tag'
import ButtonGroup from '../../ui/ButtonGroup'
import Button from '../../ui/Button'
import ButtonText from '../../ui/ButtonText'

import { useMoveBack } from '../../hooks/useMoveBack'
import { useBooking } from './useBooking'
import Spinner from '../../ui/Spinner'
import { HiArrowDownCircle } from 'react-icons/hi2'
import { useNavigate } from 'react-router-dom'
import { useCheckOut } from '../check-in-out/useCheckOut'
import Modal from '../../ui/Modal'
import { useDeleteBooking } from './useDeleteBooking'
import ConfirmDelete from '../../ui/ConfirmDelete'
import Empty from '../../ui/Empty'

const HeadingGroup = styled.div`
   display: flex;
   gap: 2.4rem;
   align-items: center;
`

function BookingDetail() {
   const { booking, isLoading } = useBooking()
   const navigate = useNavigate()
   const moveBack = useMoveBack()
   const { checkOut, isCheckingOut } = useCheckOut()
   const { isDeleting, deleteBooking } = useDeleteBooking()
   if (isLoading) return <Spinner></Spinner>
   if (!booking) {
      return <Empty resourceName="booking"></Empty>
   }
   const { status, id: bookingId } = booking
   const statusToTagName = {
      unconfirmed: 'blue',
      'checked-in': 'green',
      'checked-out': 'silver',
   }

   return (
      <>
         <Row type="horizontal">
            <HeadingGroup>
               <Heading as="h1">Booking #{bookingId}</Heading>
               <Tag type={statusToTagName[status]}>
                  {status.replace('-', ' ')}
               </Tag>
            </HeadingGroup>
            <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
         </Row>

         <BookingDataBox booking={booking} />

         <ButtonGroup>
            {status === 'unconfirmed' && (
               <Button
                  icon={<HiArrowDownCircle></HiArrowDownCircle>}
                  onClick={() => navigate(`/checkin/${bookingId}`)}
               >
                  Check In
               </Button>
            )}
            {status === 'checked-in' && (
               <Button
                  icon={<HiArrowDownCircle></HiArrowDownCircle>}
                  onClick={() => {
                     checkOut(bookingId)
                  }}
                  disabled={isCheckingOut}
               >
                  Check out
               </Button>
            )}
            <Modal>
               <Modal.Open opens={'delete'}>
                  <Button type="danger" resourceName={'booking'}>
                     Delete Booking
                  </Button>
               </Modal.Open>
               <Modal.Window name="delete">
                  <ConfirmDelete
                     disabled={isDeleting}
                     resourceName={'booking'}
                     onConfirm={() => {
                        deleteBooking(bookingId, {
                           onSuccess: () => {
                              navigate('/bookings')
                           },
                        })
                     }}
                  ></ConfirmDelete>
               </Modal.Window>
            </Modal>
            <Button variation="secondary" onClick={moveBack}>
               Back
            </Button>
         </ButtonGroup>
      </>
   )
}

export default BookingDetail
