import { useMutation } from '@tanstack/react-query'
import { signup as signUpApi } from '../../services/apiAuth'
import toast from 'react-hot-toast'

export function useSignUp() {
   const { mutate: signUp, isLoading } = useMutation({
      mutationFn: signUpApi,
      onSuccess: user => {
         toast.success(
            'Account successfully created! Please check your email to verify your account'
         )
      },
   })
   return { signUp, isLoading }
}
