"use client";
import { useState, useEffect } from "react";
import Nav from "@components/Nav";
import Image from "next/image";
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
                      <img
                        src={manga.coverUrl}
                        alt={`${manga.attributes.title.en} poster`}
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
