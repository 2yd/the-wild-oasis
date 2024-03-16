import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'

import FormRow from '../../ui/FormRow'
import { useCreateCabin } from './useCreateCabin'
import { useEditCabin } from './useEditCabin'

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
   const { id: editId, ...editValues } = cabinToEdit
   const isEditSession = !!editId

   const { isCreating, createCabin } = useCreateCabin()
   const { register, handleSubmit, reset, getValues, formState } = useForm({
      defaultValues: isEditSession ? editValues : {},
   })
   const { isEditing, editCabin } = useEditCabin()
   const isWorking = isCreating || isEditing
   const { errors } = formState
   function onSumbit(data) {
      const image = typeof data.image === 'string' ? data.image : data.image[0]
      if (isEditSession) {
         {
            editCabin(
               { newCabinData: { ...data, image }, id: editId },
               {
                  onSuccess: () => {
                     reset()
                     onCloseModal?.()
                  },
               }
            )
         }
      } else
         createCabin(
            { ...data, image: data.image[0] },
            {
               onSuccess: () => {
                  reset()
                  onCloseModal?.()
               },
            }
         )
   }

   return (
      <Form
         onSubmit={handleSubmit(onSumbit)}
         type={onCloseModal ? 'modal' : 'regular'}
      >
         <FormRow label="Cabin name" error={errors?.name?.message}>
            <Input
               type="text"
               id="name"
               disabled={isWorking}
               {...register('name', { required: 'This field is required' })}
            />
         </FormRow>

         <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
            <Input
               type="number"
               id="maxCapacity"
               disabled={isWorking}
               {...register('maxCapacity', {
                  required: 'This field is required',
                  min: {
                     value: 1,
                     message: 'Minimum capacity is 1',
                  },
               })}
            />
         </FormRow>

         <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
            <Input
               type="number"
               id="regularPrice"
               disabled={isWorking}
               {...register('regularPrice', {
                  required: 'This field is required',
                  min: {
                     value: 1,
                     message: 'Minimum price is 1',
                  },
               })}
            />
         </FormRow>

         <FormRow label="Discount" error={errors?.discount?.message}>
            <Input
               type="number"
               id="discount"
               disabled={isWorking}
               defaultValue={0}
               {...register('discount', {
                  required: 'This field is required',
                  validate: value =>
                     Number(value) <= Number(getValues().regularPrice) ||
                     'Discount should be less than regular price',
               })}
            />
         </FormRow>

         <FormRow label="Description" error={errors?.description?.message}>
            <Textarea
               type="number"
               id="description"
               disabled={isWorking}
               defaultValue=""
               {...register('description', {
                  required: 'This field is required',
               })}
            />
         </FormRow>

         <FormRow label="Cabin photo" error={errors?.image?.message}>
            <FileInput
               id="image"
               accept="image/*"
               {...register('image', {
                  required: isEditSession ? false : 'This field is required',
               })}
            />
         </FormRow>

         <FormRow>
            {/* type is an HTML attribute! */}
            <Button
               variation="secondary"
               type="reset"
               onClick={() => onCloseModal?.()}
            >
               Cancel
            </Button>
            <Button disabled={isWorking}>
               {isEditSession ? 'Edit cabin' : 'Create new cabin'}
            </Button>
         </FormRow>
      </Form>
   )
}

export default CreateCabinForm