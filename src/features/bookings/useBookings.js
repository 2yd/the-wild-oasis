import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getBookings } from '../../services/apiBookings'
import { useSearchParams } from 'react-router-dom'
import { PAGE_SIZE } from '../../utils/constants'
export function useBookings() {
   const [searchParams, setSearchParams] = useSearchParams()
   const queryClient = useQueryClient()
   const filterValue = searchParams.get('status') || 'all'
   const filter =
      !filterValue || filterValue === 'all'
         ? null
         : {
              field: 'status',
              value: filterValue,
           }
   const sortByRaw = searchParams.get('sortby') || 'startDate-desc'
   const [field, direction] = sortByRaw.split('-')
   const sortBy = { field, direction }
   const page = Number(searchParams.get('page') || 1)
   const {
      isLoading,
      data: { data: bookings, count } = {},
      error,
   } = useQuery({
      queryKey: ['bookings', filter, sortBy, page],
      queryFn: () => getBookings({ filter, sortBy, page }),
   })
   const totalPages = Math.ceil(count / PAGE_SIZE)
   if (page < totalPages)
      queryClient.prefetchQuery({
         queryKey: ['bookings', filter, sortBy, page + 1],
         queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
      })

   if (page > 1)
      queryClient.prefetchQuery({
         queryKey: ['bookings', filter, sortBy, page - 1],
         queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
      })
   return { isLoading, bookings, error, count }
}
