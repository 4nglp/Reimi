export default async function handler(req, res) {
  const { chapterId } = req.query;
  if (!chapterId) {
    return res.status(400).json({ error: "chapterId is required" });
  }

  const userAgent = "Reimi/0.1.0";

  try {
    const response = await fetch(
      `https://api.mangadex.org/at-home/server/${chapterId}`,
      {
        headers: {
          "User-Agent": userAgent,
        },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data from MangaDex" });
    }

    const data = await response.json();

    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching data from MangaDex:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
