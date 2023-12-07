const client = require("./client");
const util = require("util");

const REPLACE_ME = "HELP REPLACE ME!!!!";

// GET - /api/video-games - get all video games
async function getAllVideoGames() {
  try {
    //get all videogames from database
    const { rows: videoGames } = await client.query(`
        SELECT * FROM videogames
        `);
    return videoGames;
  } catch (error) {
    throw new Error("Make sure you have replaced the REPLACE_ME placeholder.");
  }
}

// GET - /api/video-games/:id - get a single video game by id
async function getVideoGameById(id) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            SELECT * FROM videogames;
            WHERE id = $1;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

// POST - /api/video-games - create a new video game
// What info
async function createVideoGame(body) {
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
            INSERT INTO videogames(name, description, price)
            VALUES($1, $2, $3)
            RETURNING *;
            `,
      [body.name, body.description, body.price]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
  // LOGIC GOES HERE
}

// PUT - /api/video-games/:id - update a single video game by id
async function updateVideoGame(id, fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");
  // LOGIC GOES HERE
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
      UPDATE videogames
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
    `,
      Object.values(fields)
    );

    return videoGame;
  } catch (error) {
    throw error;
  }
}

// DELETE - /api/video-games/:id - delete a single video game by id
async function deleteVideoGame(id) {
  // LOGIC GOES HERE
  try {
    const {
      rows: [videoGame],
    } = await client.query(
      `
        DELETE FROM videogames
        WHERE id=$1
        RETURNING *;
        `,
      [id]
    );
    return videoGame;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllVideoGames,
  getVideoGameById,
  createVideoGame,
  updateVideoGame,
  deleteVideoGame,
};
