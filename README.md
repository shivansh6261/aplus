---routing files

layout	.js .jsx .tsx	Layout
page	.js .jsx .tsx	Page
loading	.js .jsx .tsx	Loading UI
not-found	.js .jsx .tsx	Not found UI
error	.js .jsx .tsx	Error UI
global-error	.js .jsx .tsx	Global error UI
route	.js .ts	API endpoint
template	.js .jsx .tsx	Re-rendered layout
default	.js .jsx .tsx	Parallel route fallback page


Next.js with the new /app directory structure, Tailwind CSS, and want to connect a MySQL database to verify user login.

Let me guide you through the steps and show the directory structure you'll need to:
Connect to a MySQL database
Create an API route for login
Verify credentials
Maintain a clean directory structure under the /app folder

directory structure for this should be:
my-nextjs-app/
│
├── app/
│   ├── api/
│   │   └── login/
│   │       └── route.js          # API route for login
│   ├── login/
│   │   └── page.jsx              # Login page
│   ├── layout.jsx                # App layout
│   └── page.jsx                  # Homepage
│
├── config/
│   └── db.js                     # MySQL connection utility
│
├── public/
│
├── styles/
│   └── globals.css              # Tailwind styles
│
├── .env.local                   # DB credentials
├── tailwind.config.js
├── postcss.config.js
├── next.config.js
└── package.json

$ npm install mysql2

create .env.local 
->
   DB_HOST=localhost
   DB_USER=dbuser
   DB_PASS=password
   DB_NAME=dbname

NOW for handle db connection create config/db.js 
->

import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

try {
    const connection = await db.getConnection();
    console.log("database is connected");

} catch (err) {
    console.log("their is some error", err);
    process.exit(1)

}
export default db;

NOW we have to create /app/api/login/route.js
->
import db from '@/lib/db'; // DB connection

export async function POST(req) {
  const { email, password } = await req.json(); // get login data

  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [email, password]
  );

  // If no user found
  if (rows.length === 0) {
    return new Response(JSON.stringify({ message: 'Invalid credentials' }), { status: 401 });
  }

  // User found
  return new Response(JSON.stringify({ message: 'Login successful', user: rows[0] }), {
    status: 200,
  });
}


But This method doen't make session so u may face problem because now after login you we be treated as not logged in 
so over come form this problem 
we will use next auth for authentication which will create the session and also use middleware 

About:middleware
restricting access to certain routes (like /app) for only logged-in users is best done using middleware, server-side authentication, or protected client components.


Middleware in Next.js is a powerful feature that allows you to run code before a request is completed, effectively intercepting and modifying the request and response flow within your application. It functions at a global level, enabling you to implement various functionalities like:

    Authentication and Authorization:
    Checking if a user is logged in or has the necessary permissions to access a specific page and redirecting them if not.
    URL Rewrites and Redirects:
    Dynamically changing the request URL or redirecting users to different pages based on certain conditions.
    Header and Cookie Management:
    Modifying request or response headers, setting or retrieving cookies for various purposes (e.g., A/B testing, localization).
    Logging and Analytics:
    Intercepting requests to log information or perform analytics before the request reaches the route handler.
    A/B Testing:
    Dynamically serving different versions of your site to users based on criteria like cookies or user groups.



session managment is important for authentication required to move forward.

signoutproblemresolved
The default signOut() triggers a server-side redirect flow; if the server response/redirect stalls (CSRF checks, pages config, or environment issues), the client can appear to "just load". By using redirect: false we avoid blocking on a server redirect and perform the navigation client-side immediately after the session is cleared client-side.