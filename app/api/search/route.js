
import { db } from "@/config/db.js";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("q") || "";

    let rows;
    if (query.trim() === "") {
      // ✅ If no search term, return all alumni
      [rows] = await db.execute("SELECT * FROM alumni ORDER BY ID DESC");
    } else {
      // ✅ Otherwise, filter by name or batch
      [rows] = await db.execute(
        `SELECT * FROM alumni 
         WHERE Full_Name LIKE ? 
         OR Batch LIKE ?`,
        [`%${query}%`, `%${query}%`]
      );
    }

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
