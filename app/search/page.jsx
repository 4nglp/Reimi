import Nav from "@components/Nav";
import Entry from "@components/Entry"; // Import the Entry component

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
        <h1 className="text-3xl text-center font-bold mb-6">
          Search Results for &quot;{q}&quot;
        </h1>
        {searchResults.length > 0 ? (
          // Passing searchResults to the Entry component as 'entries'
          <Entry entries={searchResults} />
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </>
  );
};

export default SearchPage;
