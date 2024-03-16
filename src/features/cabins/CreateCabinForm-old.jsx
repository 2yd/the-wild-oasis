import styled from 'styled-components'
import toast from 'react-hot-toast'
import Input from '../../ui/Input'
import Form from '../../ui/Form'
import Button from '../../ui/Button'
import FileInput from '../../ui/FileInput'
import Textarea from '../../ui/Textarea'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createEditCabin } from '../../services/apiCabins'

import FormRow from '../../ui/FormRow'

function CreateCabinForm({ cabinToEdit = {} }) {
   const { id: editId, ...editValues } = cabinToEdit
   const isEditSession = !!editId
   const { register, handleSubmit, reset, getValues, formState } = useForm({
      defaultValues: isEditSession ? editValues : {},
   })
   const queryClient = useQueryClient()
   const { mutate, isLoading: isCreating } = useMutation({
      mutationFn: createEditCabin,
      onSuccess: () => {
         toast.success('Cabin created')
         queryClient.invalidateQueries({
            queryKey: ['cabins'],
         })
         reset()
      },
      onError: error => {
         toast.error(error.message)
      },
   })
   const { errors } = formState
   function onSumbit(data) {
      mutate({ ...data, image: data.image[0] })
   }

   return (
      <Form onSubmit={handleSubmit(onSumbit)}>
         <FormRow label="Cabin name" error={errors?.name?.message}>
            <Input
               type="text"
               id="name"
               {...register('name', { required: 'This field is required' })}
            />
         </FormRow>

         <FormRow label="Max Capacity" error={errors?.maxCapacity?.message}>
            <Input
               type="number"
               id="maxCapacity"
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
               defaultValue={0}
               {...register('discount', {
                  required: 'This field is required',
                  validate: value =>
                     value <= getValues().regularPrice ||
                     'Discount should be less than regular price',
               })}
            />
         </FormRow>

         <FormRow label="Description" error={errors?.description?.message}>
            <Textarea
               type="number"
               id="description"
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
            <Button variation="secondary" type="reset">
               Cancel
            </Button>
            <Button disabled={isCreating}>
               {isEditSession ? 'Edit cabin' : 'Create new cabin'}
            </Button>
         </FormRow>
      </Form>
   )
}

export default CreateCabinForm
