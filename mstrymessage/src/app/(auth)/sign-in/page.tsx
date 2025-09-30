'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm }  from "react-hook-form"
import *  as  z  from "zod"
import Link from "next/link"
import { useState } from "react"
import { useDebounceValue } from 'usehooks-ts'
import { useRouter } from "next/router"
import { signUpSchema } from "@/schemas/signUpSchema"

//axios is used to send request 

const page = () => {
  const [username, setUsername] = useState('')
  const [usernameMessage, setUsernameMessage] = useState('')
  const [isCheckingUsername, setIsCheckingUsername] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const debouncedUsername = useDebounceValue(username, 300)
  const { toast } = useToast()
  const router = useRouter();

  //zod implementation 
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues:{
      username: '',
      email: '',
      password: ''
    }

  })
  return (
    <div>page</div>
  )
}

export default page