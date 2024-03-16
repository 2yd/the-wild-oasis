import Stat from './Stat'
import { HiOutlineBriefcase, HiOutlineChartBar } from 'react-icons/hi'
import { HiOutlineBanknotes, HiOutlineCalendarDays } from 'react-icons/hi2'
import { formatCurrency } from '../../utils/helpers'
function Stats({ bookings, confirmedStays, cabinCount, numDays }) {
   const numBookings = bookings.length
   const sales = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0)
   const checkins = confirmedStays.length
   const occupation = confirmedStays.reduce(
      (acc, stay) => acc + stay.numNights,
      0
   )
   const occupancyRate = occupation / (cabinCount * numDays)
   return (
      <>
         <Stat
            title="Bookings"
            color="blue"
            icon={<HiOutlineBriefcase></HiOutlineBriefcase>}
            value={numBookings}
         ></Stat>
         <Stat
            title="Sales"
            color="green"
            icon={<HiOutlineBanknotes></HiOutlineBanknotes>}
            value={formatCurrency(sales)}
         ></Stat>
         <Stat
            title="Checkins"
            color="indigo"
            icon={<HiOutlineCalendarDays></HiOutlineCalendarDays>}
            value={checkins}
         ></Stat>
         <Stat
            title="Occupacy rate"
            color="yellow"
            icon={<HiOutlineChartBar></HiOutlineChartBar>}
            value={Math.round(occupancyRate * 100) + '%'}
         ></Stat>
      </>
   )
}

export default Stats
