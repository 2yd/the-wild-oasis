import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateBooking } from '../../services/apiBookings'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function useCheckIn() {
   const queryClient = useQueryClient()
   const navigate = useNavigate()
   const { mutate: checkin, isLoading: isCheckingIn } = useMutation({
      mutationFn: ({ bookingId, breakfast }) =>
         updateBooking(bookingId, {
            status: 'checked-in',
            isPaid: true,
            ...breakfast,
         }),
      onSuccess: data => {
         toast.success(`Booking ${data.id} has been successfully checked in`)
         queryClient.invalidateQueries({ active: true })
         navigate('/')
      },
      onError: err => {
         toast.error('Booking could not be checked in')
      },
   })
   return { checkin, isCheckingIn }
}