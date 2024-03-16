import { useMutation, useQueryClient } from '@tanstack/react-query'
import { login as loginApi } from '../../services/apiAuth'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
export function useLogin() {
   const queryClient = useQueryClient()
   const navigate = useNavigate()
   const { mutate: login, isLoading } = useMutation({
      mutationFn: ({ email, password }) => loginApi({ email, password }),
      onSuccess: user => {
         navigate('/dashboard')
      },
      onError: error => {
         console.error(error)
         toast.error('Failed to login! Please check your password and email.')
      },
   })
   return { login, isLoading }
}
