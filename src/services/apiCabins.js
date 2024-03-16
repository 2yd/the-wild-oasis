import supabase, { supabaseUrl } from './supabase'
export async function getCabins() {
   const { data: cabins, error } = await supabase.from('cabins').select('*')
   if (error) {
      console.error(error)
      throw new Error('Cabins could not be loaded')
   }
   return cabins
}

export async function deleteCabin(id) {
   const { data, error } = await supabase.from('cabins').delete().eq('id', id)
   if (error) {
      console.error(error)
      throw new Error('Cabin could not be deleted')
   }
   return data
}

export async function createEditCabin(newCabin, id) {
   console.log(newCabin)
   const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
   //https://rjmozhgozrjujsitpwhx.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
   const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
      '/',
      ''
   )
   let query = supabase.from('cabins')
   const imagePath = hasImagePath
      ? newCabin.image
      : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

   if (!id) {
      query = query.insert([{ ...newCabin, image: imagePath }])
   } else {
      query = query
         .update({ ...newCabin, image: imagePath })
         .eq('id', id)
         .select()
   }

   const { data, error } = await query.select().single()
   if (error) {
      console.error(error)
      throw new Error('Cabin could not be created')
   }
   if (hasImagePath) return data
   const { error: imgError } = await supabase.storage
      .from('cabin-images')
      .upload(imageName, newCabin.image)
   if (imgError) {
      await supabase.from('cabins').delete().eq('id', newCabin.id)
      throw new Error('Cabin image could not be uploaded')
   }
   return data
}
