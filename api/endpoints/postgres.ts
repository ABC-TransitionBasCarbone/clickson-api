const { sql } = require("@vercel/postgres");

module.exports = function (app) {

    app.get("/", async (req, res) => {
        const emissionCategories = await sql`SELECT * FROM emission_categories;`;
        return res.status(200).json({ emissionCategories: emissionCategories.rows.map(e => e.label) });
    });

}