import Nav from "@components/Nav";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Search Manga",
  description: "Search for your favorite manga",
};

async function fetchSearchResults(query) {
  try {
    const res = await fetch(
      `https://api.mangadex.org/manga?title=${query}&limit=10`
    );
    const data = await res.json();

    const mangasWithCovers = await Promise.all(
      data.data.map(async (manga) => {
        const coverRelationship = manga.relationships.find(
          (rel) => rel.type === "cover_art"
        );

        if (coverRelationship) {
          const coverRes = await fetch(
            `https://api.mangadex.org/cover/${coverRelationship.id}`
          );
          const coverData = await coverRes.json();

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
    console.error("Error fetching search results:", error);
    return [];
  }
}

const SearchPage = async ({ searchParams }) => {
  const { q } = searchParams;
  const searchResults = await fetchSearchResults(q);

  return (
    <>
      <Nav />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Search Results for {q}</h1>
        {searchResults.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {searchResults.map((manga) => (
              <li key={manga.id} className="mb-4 flex flex-col items-center">
                <Link href={`/manga/${manga.id}`} className="text-white-600">
                  {manga.coverUrl && (
                    <div className="relative w-48 h-72 bg-gray-200 overflow-hidden">
                      <Image
                        src={manga.coverUrl}
                        alt={`${
                          manga.attributes.title.en || "Untitled"
                        } poster`}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                        {manga.attributes.title.en || "Untitled"}
                      </div>
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
};

export default SearchPage;
