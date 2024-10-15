"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; // Import Next.js Image component
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
              // Fetch the cover details using the cover art ID
              const coverRes = await fetch(
                `https://api.mangadex.org/cover/${coverRelationship.id}`
              );
              const coverData = await coverRes.json();

              return {
                ...manga,
                coverUrl: `https://uploads.mangadex.org/covers/${manga.id}/${coverData.data.attributes.fileName}`,
              };
            }

            return manga; // Return the manga without cover if not found
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
    <>
      <ul className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-20">
        {mangaList && mangaList.length > 0 ? (
          mangaList.map((manga) => (
            <li key={manga.id}>
              <Link href={`manga/${manga.id}`}>
                {" "}
                {manga.coverUrl && (
                  <Image
                    src={manga.coverUrl}
                    alt={`${manga.attributes.title.en} poster`}
                    width={200} // Specify width
                    height={300} // Specify height
                  />
                )}
                <h3>{manga.attributes.title.en}</h3>
              </Link>
            </li>
          ))
        ) : (
          <p>No manga found.</p>
        )}
      </ul>
    </>
  );
};

export default GetMangaList;
