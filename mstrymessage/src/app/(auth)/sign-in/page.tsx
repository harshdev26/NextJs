/*It builds a Sign-Up form for your app.
When a user types a username, email, and password:

It checks if the username is unique (live check as they type).

It submits the form to /api/sign-up when they hit "Sign Up".

Shows toasts for success or error.

On success → redirects them to a verification page.*/

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { signIn } from 'next-auth/react';
import {
  Form,
  FormField,
  FormItem,   
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { signInSchema } from '@/schemas/signInSchema';

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const { toast } = useToast();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const result = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password,
    });

    if (result?.error) {
      if (result.error === 'CredentialsSignin') {
        toast({
          title: 'Login Failed',
          description: 'Incorrect username or password',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Error',
          description: result.error,
          variant: 'destructive',
        });
      }
    }

    if (result?.url) {
      router.replace('/dashboard');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Welcome Back to True Feedback
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <Input {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <Input type="password" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full' type="submit">Sign In</Button>
          </form>
        </Form>
        <div className="text-center mt-4">
          <p>
            Not a member yet?{' '}
            <Link href="/sign-up" className="text-blue-600 hover:text-blue-800">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


/*
export default function signUpForm(){
const [username, setUsername] = useState('')
const [usernameMessage, setUsernameMessage] = useState('')
const [isCheckingUsername, setIsCheckingUsername] = useState('')
const [isSubmitting, setIsSubmitting] = useState('')
const debouncedUsername = useDebounce(username, 300);


const [username, setUsername] = useState('')
const [usernameMessage, setUsernameMessage] = useState('')
const [isCheckingUsername, setIsCheckingUsername] = useState('')
const [isSubmitting, setIsSubmitting] = useState('')
const debouncedUsername = useDebounce(username, 300)


const router = useRouter();
const {toast} = useToast();

const form = useForm<z.infer<typeof signUpSchema>>({
resolver: zodResolver(signUpSchema),
defaultValues: {
  username: "",
  email: "",
  password: "",
 }
});
const form = useForm<z.infer<typeof signUpSchema>>({
resolver: zodResolver(signUpSchema),
defaultValues: {
 username: "",
 email: "",
 password: "",
}
});
const form = useForm<z.infer<typeof signUpSchema>>({
resolver: zodResolver(signUpSchema), 
defaultValues: {
username: "",
email: "",
password: "",
}
})

const form = useForm<z.infer<typeof signUpSchema>>({
resolver: zodResolver(signUpSchema),
defaultValues:{
username: "",
email: "",
password: "",

}

})

const form = useForm<z.infer<typeof signUpSchema>>({
resolver: zodResolver(signUpSchema),
defaultValues:{
username: "",
email: "",
password: "",

} 
});


useEffect(() => {
  const checkUsernameUnique = async () => {
   if (debouncedUsername){
    setIsCheckingUsername(true){
    setUsernameMessage('');
    try{
     const response = await axios.get<ApiResponse>(
      `/api/check-username-unique? username = ${debouncedUsername}`
     );
     setUsernameMessage(response.data.message);

     }catch(error){
      const axiosError = error as AxiosError<ApiResponse>;
      setUsernameMessage(
       axiosError.response?.data.message ?? 'Error checking username'
      )
     
     }finally {
     
       setIsCheckingUsername(false);
     }
    }
    
   
   
   }
   
  
  }

  checkUsernameUnique();
}, [debouncedUsername])

useEffect(() => {
 const checkUsernameUnique = async () => {
  if (debouncedUsername){
   setIsCheckingUsername(true){
   setUsernameMessage('');

   try{
     const response = await axios.get<ApiResponse>(
      `/api/check-username-unique? username = ${debouncedUsername}`
     );
     setUsernameMessage(response.data.message)

   }catch(error){
     const axiosError = error as AxiosError<ApiResponse>;
     setUsernameMessage(
      axiosError.response?.data.message?? 'Error checking Username'
     )

   }finally {
     setIsCheckingUsername(false);
   }
   }
  };
   checkUsernameUnique(); 
  }
 
}, [debouncedUsername])

}





}


})




useEffect(()=> {
  const checkUsernameUnique= async() = {
  
   if(debouncedUsername){
    setIsCheckingUsername(true)
    setUsernameMessage('') // reset 
    try {
      const response = await axios.get<ApiResponse>(
      `/api/check-username-unique? username= ${debouncedUsername}`
      )
      setUsernameMessage(response.data.message)
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      
      setUsernameMessage(axiosError.response?.data.message ?? 'Error checking username');
    } finally{
      setIsCheckingUsername(false) 
    }

   }
  
  };
  checkUsernameUnique()
 

}, [debouncedUsername])






useEffect(()=> {

 const checkUsernameUnique = async() = {
 if(debouncedUsername){
  setIsCheckingUsername(true);
  setUsernameMessage(''); //reset
 
  try {
    const response = await axios.get<ApiResponse>(`/Api/check-username-unique ? username= ${debouncedUsername}`) 
    setUsernameMessage(response.data.message)
    } catch (error) {
    const axiosError = error as AxiosError<ApiResponse>;
    setUsernameMessage(
     axiosError.response?.data.message ?? 'Error checking username'
    );
  }finally {
   setIsCheckingUsername(false);
  }
 
 }
 
 
 
 }

 checkUsernameUnique()
 
}, [debouncedUsername])


useEffect(){
 const checkUsernameUnique = async() = {
 
 if(debouncedUsername){
   setIsCheckingUsername(true)
   setUsernameMessage('')
   try {
    const response = await axios.get<ApiResponse>(`/api/check-username-unique? username= ${debouncedUsername}`)
   } catch (error) {
    axiosError = error as AxiosError<ApiResponse>;
    setUsernameMessage(
     axiosError.response?.data.message ?? 'Error checking username'
    
    );

   }finally{
   
   setIsCheckingUsername(false)
   
   }
  
  
 
 }
 
 
 
 
 
 }
checkUsernameUnique()
}, [debouncedUsername]);



const onSubmit = async(data: z.infer<typeof signUpSchema>) => {
  setIsSubmitting(true);

  try{
   const response = await axios.post<ApiResponse>('/api/sign-up', data)
   toast({
    title: 'success',
    description: response.data.message,

   })

   router.replace(`/verify/${username}`)
   setIsSubmitting(false);
  }catch(error){
  console.error('Error during sign-up:', error)
  const axiosError = error as AxiosError<ApiResponse>;
  
  axiosError.response?.data.message ??  'there was a problem with the signip'
  
  //
  toast({
   title: 'Sign Up Failed',
   description: errorMessage,
   variant: destructive ,
  })
   setIsSubmitting(false)
  
  }

};

const onSubmit = async (data: z.infer<typeof signUpSchema>){
 setIsSubmitting(true)
 try {
  const response = await axios.post<ApiResponse>('/api/signup',data);
  toast({
   title: "success",
   description: response.data.message,
  
  }) 

  const redirect = router.replace(`/verify/${username}`)


 } catch (error) {
  const axiosError = error as AxiosError<ApiResponse>
  axiosError.response?.data.message ?? "there was a problem with the signup" 
  toast({
   title: "sign up Failed",
   description: errorMessage,
   variant: destructive,
  })
  setIsSubmitting(false)
  }

 
};


const onSubmit = async(data: z.infer<typeof signUpSchema>){

setIsSubmitting(true)
try {
   const response = await axios.post<ApiResponse>('/api/sign-up', data) 
   toast({
   title: "success",
   description: response.data.message
   
   router.replace(`/verify/${username}`)
   })
} catch (error) {
  const axiosError = error as AxiosError<ApiRespoonse>;
  axiosError.response?.data.message?? "signup error"
  toast({
  title: "error",
  description: response.data.message,
  })
}
setIsSubmitting(false)
}

return(

<Form {...form}

)


*/