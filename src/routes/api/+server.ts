import {json, type RequestHandler } from '@sveltejs/kit';
import { users } from '$lib/server/db/schema';
import { db } from '$lib/server/db';
import { sha512 } from 'js-sha512';
import { eq } from 'drizzle-orm';



export const GET: RequestHandler = async () => {
    const results = await db.select().from(users);

    return json({data: results} );

};

export const POST: RequestHandler = async ({ request }) => {
    const { username, password } = await request.json();
    
    // Check if username or password is missing
    if (!username || !password) {
      return json({ message: 'Missing values' }, { status: 400 });
    }
    
    // Query the user based on username (from your schema)
    const user = await db
      .select()
      .from(users)
      .where(eq(users.username, username)) // Correct syntax for comparison
      .limit(1);
    
    // Check if user was found
    if (user.length === 0) {
      return json({ message: 'User not found' }, { status: 404 });
    }
  
    // Compare the provided password with the stored password
    const foundUser = user[0];
    const hashedPassword = sha512(password);
  
    if (hashedPassword !== foundUser.password) {
      return json({ message: 'Invalid credentials' }, { status: 401 });
    }
    
    // If login is successful, you can include user data or token (e.g., user ID or JWT)
    return json({ 
      success: true, 
      message: 'Login successful', 
      user: { id: foundUser.id, username: foundUser.username } 
    });
  };