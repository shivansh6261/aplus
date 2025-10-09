import {db} from '@/config/db.js';

export async function POST(req) {
  try {
    const body = await req.json();
    const { role, enrollment, employeeId, email, password } = body;

    let query = '';
    let values = [];

    if (role === 'student') {
      query = 'SELECT * FROM user WHERE Enrollment_No = ? AND Password = ?';
      values = [enrollment, password];
    } else if (role === 'faculty') {
      query = 'SELECT * FROM faculty WHERE Employee_ID = ? AND Password = ?';
      values = [employeeId, password];
    } else if (role === 'alumni') {
      query = 'SELECT * FROM alumni WHERE Email_ID = ? AND Password = ?';
      values = [email, password];
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Invalid role' }), {
        status: 400,
      });
    }

    const [rows] = await db.execute(query, values);

    if (rows.length > 0) {
      return new Response(JSON.stringify({ success: true, user: rows[0] }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), {
        status: 401,
      });
    }

  } catch (error) {
    console.error('Login error:', error);
    return new Response(JSON.stringify({ success: false, message: 'Server error' }), {
      status: 500,
    });
  }
}
