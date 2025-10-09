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






import mysql from 'mysql2/promise';

export const db = mysql.createPool({
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