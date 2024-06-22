import PizzaData from "@/models/PizzaData";
import db from "@/utils/db";

export default async function handler(req, res) {
  try {
    // Establish the database connection at the beginning
    await db.connect();

    if (req.method === "POST") {
      // Validate request body
      if (!Array.isArray(req.body)) {
        return res.status(400).json({ message: "Invalid data format" });
      }

      // Loop through the request body and save each pizza data
      for (let i = 0; i < req.body.length; i++) {
        const { name, category, foodType, price, description, img } =
          req.body[i];

        // Validate required fields
        if (!name || !category || !foodType || !price || !description || !img) {
          return res.status(400).json({ message: `Missing data in item ${i}` });
        }

        let pizza = new PizzaData({
          name,
          category,
          foodType,
          price,
          description,
          img,
        });
        await pizza.save();
      }
      res.status(200).json({ message: "Data saved successfully" });
    } else if (req.method === "GET") {
      // Fetch all pizza data
      let data = await PizzaData.find();
      res.status(200).json({ data });
    } else {
      // Handle unsupported methods
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error:", error.message);
    console.error("Stack:", error.stack);

    res.status(500).json({ message: "Internal server error" });
  } finally {
    // Ensure the database is disconnected
    await db.disconnect();
  }
}
