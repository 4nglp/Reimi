import Nav from "@components/Nav";
import Link from "next/link";
import Image from "next/image";

const GetMangaList = async () => {
  const fetchMangaList = async () => {
    try {
      const response = await fetch("https://api.mangadex.org/manga?limit=50", {
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "MangaReaderApp/1.0 (https://reimi.vercel.app/)",
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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Manga List</h1>
        {mangaList.length === 0 ? (
          <h2>No manga found.</h2>
        ) : (
          <div className="grid grid-cols-5 gap-4">
            {mangaList.map((manga) => (
              <div key={manga.id} className="relative flex flex-col">
                <Link href={`/manga/${manga.id}`} className="block">
                  <div className="relative w-48 h-72 bg-gray-200 overflow-hidden flex-shrink-0">
                    {manga.coverUrl && (
                      <Image
                        src={manga.coverUrl}
                        alt={`${manga.attributes.title.en} poster`}
                        className="object-cover w-full h-full"
                        width={400}
                        height={800}
                      />
                    )}
                    <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                      {manga.attributes.title.en}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default GetMangaList;
