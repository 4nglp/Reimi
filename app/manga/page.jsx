"use client";
import Nav from "@components/Nav";
import { useEffect, useState } from "react";
import Link from "next/link";

const GetMangaList = () => {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const apiRes = await fetch("https://api.mangadex.org/manga?limit=50");
        const res = await apiRes.json();

        const mangasWithCovers = await Promise.all(
          res.data.map(async (manga) => {
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

        setMangaList(mangasWithCovers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaList();
  }, []);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div>
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
                      <img
                        src={manga.coverUrl}
                        alt={`${manga.attributes.title.en} poster`}
                        className="object-cover w-full h-full" // Ensure full coverage without whitespace
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
    </div>
  );
};

export default GetMangaList;
