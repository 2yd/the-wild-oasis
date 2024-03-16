import Form from '../../ui/Form'
import FormRow from '../../ui/FormRow'
import Input from '../../ui/Input'
import Spinner from '../../ui/Spinner'
import { useUpdateSetting } from './useEditSettings'
import { useSettings } from './useSettings'

function UpdateSettingsForm() {
   const {
      isLoading,
      settings: {
         minBookingLength,
         maxBookingLength,
         maxGuestsPerBooking,
         breakfastPrice,
      } = {},
      error,
   } = useSettings()
   const { isUpdating, updateSetting } = useUpdateSetting()
   if (isLoading) return <Spinner></Spinner>
   function handleUpdate(e, field) {
      const { value } = e.target
      if (!value) return
      updateSetting({ [field]: value })
   }
   return (
      <Form>
         <FormRow label="Minimum nights/booking">
            <Input
               type="number"
               defaultValue={minBookingLength}
               onBlur={e => handleUpdate(e, 'minBookingLength')}
               disabled={isUpdating}
               id="min-nights"
            />
         </FormRow>
         <FormRow label="Maximum nights/booking">
            <Input
               type="number"
               defaultValue={maxBookingLength}
               onBlur={e => handleUpdate(e, 'minBookingLength')}
               disabled={isUpdating}
               id="max-nights"
            />
         </FormRow>
         <FormRow label="Maximum guests/booking">
            <Input
               type="number"
               defaultValue={maxGuestsPerBooking}
               onBlur={e => handleUpdate(e, 'minBookingLength')}
               disabled={isUpdating}
               id="max-guests"
            />
         </FormRow>
         <FormRow label="Breakfast price">
            <Input
               type="number"
               defaultValue={breakfastPrice}
               onBlur={e => handleUpdate(e, 'minBookingLength')}
               disabled={isUpdating}
               id="breakfast-price"
            />
         </FormRow>
      </Form>
   )
}

export default UpdateSettingsForm
