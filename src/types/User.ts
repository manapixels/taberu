export type User = {
   first_name: string
   last_name: string
   email: string
   is_active: boolean
   is_superuser: boolean
   birthdate: string
   role_id: string
   phone: string
   state: string
   country: string
   address: string
   id: string
   role: {
      name: string
      description: string
      id: string
   }
   groups: Array<string>
   image: {
      file_format: string
      width: number
      height: number
      media: {
         title: string
         description: string
         path: string
         id: string
         link: string
      }
   }
   follower_count: number
   following_count: number
}
