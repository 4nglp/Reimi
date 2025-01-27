import Nav from "@components/Nav";
import Entry from "@components/Entry";

const GetMangaList = async () => {
  const fetchMangaList = async () => {
    try {
      const response = await fetch("https://api.mangadex.org/manga?limit=100", {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "Reimi@0.1.0 (https://reimi.vercel.app/)",
        },
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch manga data");
      }

      const data = await response.json();

      const mangasWithCovers = await Promise.all(
        data.data.map(async (manga) => {
          const coverRelationship = manga.relationships.find(
            (rel) => rel.type === "cover_art"
          );

          if (coverRelationship) {
            const coverResponse = await fetch(
              `https://api.mangadex.org/cover/${coverRelationship.id}`
            );

            if (!coverResponse.ok) {
              console.warn(`Cover fetch failed for manga ID ${manga.id}`);
              return manga;
            }

            const coverData = await coverResponse.json();
            return {
              ...manga,
              coverUrl: `https://uploads.mangadex.org/covers/${manga.id}/${coverData.data.attributes.fileName}`,
            };
          }

          return manga;
        })
      );

      return mangasWithCovers;
    } catch (error) {
      console.error("Error fetching manga list:", error);
      return [];
    }
  };

  const mangaList = await fetchMangaList();

  return (
    <>
      <Nav />
      <Entry entries={mangaList} />
    </>
  );
};

export default GetMangaList;
