import { dbConnect } from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { z } from 'zod';
import { usernameValidation } from '@/schemas/signUpSchema';

const UsernameQuerySchema = z.object({
  username: usernameValidation, // Reuse the same validation as in signUpSchema that will ensure the username should be between 2 to 20 characters and should not contain special characters
});

export async function GET(request: Request) {
  await dbConnect();

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get('username'),
    };

    const result = UsernameQuerySchema.safeParse(queryParams); //"Check karo ki username valid format mein hai ya nahi"

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json(
        {
          success: false,
          message:
            usernameErrors?.length > 0
              ? usernameErrors.join(', ')
              : 'Invalid query parameters',
        },
        { status: 400 }
      );
    }

    const { username } = result.data; //verified username
    
    // Check if a verified user with the same username already exists in the database 

    const existingVerifiedUser = await UserModel.findOne({
      username,
      isVerified: true,
    });

    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: 'Username is already taken',
        },
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: true,
        message: 'Username is unique',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error checking username:', error);
    return Response.json(
      {
        success: false,
        message: 'Error checking username',
      },
      { status: 500 }
    );
  }
}




/*
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/model/User'
import {z} from 'zod'
import {usernameValidation} from '@/schemas/signUpSchema

const UsernameQuerySchema = z.object({
    username: usernameValidation})

export async function GET(request: Request){
   await dbConnect();


   try{
    const {searchParams} = new URL(request.url);
    const queryParams = {
     username: searchParams.get('username')
    }

    const result = UsernameQuerySchema.safeParse(queryParams)
    
   }catch(error){
    
   }
}

*/















/*
Scenario 1: Username Available
1. User types: "newuser123"
2. Website sends: GET /api/check-username-unique?username=newuser123
3. API connects to database
4. API searches: "Koi 'newuser123' naam ka verified user hai?"
5. Database: "Nahi hai"
6. API returns: "Username available hai, use kar sakte ho"
7. Website shows: "✅ Username available"


Scenario 2: Username Taken
1. User types: "harsh123"
2. Website sends: GET /api/check-username-unique?username=harsh123
3. API connects to database
4. API searches: "Koi 'harsh123' naam ka verified user hai?"
5. Database: "Haan hai, verified bhi hai"
6. API returns: "Username taken hai"
7. Website shows: "❌ Username already taken"
*/







