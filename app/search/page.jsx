"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // Import Next.js Image component
import Link from "next/link";

// Accepting search params via props in the App Router
const SearchPage = ({ searchParams }) => {
  const q = searchParams.q; // Extract query from props
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (q) {
      const fetchMangaResults = async () => {
        try {
          const res = await fetch(
            `https://api.mangadex.org/manga?title=${q}&limit=10`
          );
          const data = await res.json();

          // Fetch cover art
          const mangasWithCovers = await Promise.all(
            data.data.map(async (manga) => {
              const coverRelationship = manga.relationships.find(
                (rel) => rel.type === "cover_art"
              );

              if (coverRelationship) {
                // Fetch cover details using the cover art ID
                const coverRes = await fetch(
                  `https://api.mangadex.org/cover/${coverRelationship.id}`
                );
                const coverData = await coverRes.json();

                return {
                  ...manga,
                  coverUrl: `https://uploads.mangadex.org/covers/${manga.id}/${coverData.data.attributes.fileName}`,
                };
              }

              return manga; // Return manga without cover if not found
            })
          );

          setSearchResults(mangasWithCovers);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      };
      fetchMangaResults();
    }
  }, [q]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Search Results for {q}</h1>
      {searchResults.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {searchResults.map((manga) => (
            <li key={manga.id} className="mb-4 flex flex-col items-center">
              <Link href={`/manga/${manga.id}`} className="text-white-600">
                {" "}
                {manga.coverUrl && (
                  <Image
                    src={manga.coverUrl}
                    alt={`${manga.attributes.title.en} poster`}
                    width={200}
                    height={300}
                    className="object-cover"
                  />
                )}
                {manga.attributes.title.en || "Untitled"}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchPage;
