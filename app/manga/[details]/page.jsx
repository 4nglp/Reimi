"use client"; // Make this a client component

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Function to fetch manga details
const fetchMangaDetails = async (currentMangaId) => {
  try {
    const apiRes = await fetch(
      `https://api.mangadex.org/manga/${currentMangaId}`
    );
    const res = await apiRes.json();
    return res.data; // Return manga details
  } catch (error) {
    console.log(error);
    return null;
  }
};

// Function to fetch author details by ID
const fetchAuthorDetails = async (authorId) => {
  try {
    const authorRes = await fetch(
      `https://api.mangadex.org/author/${authorId}`
    );
    const authorData = await authorRes.json();
    return authorData.data.attributes.name;
  } catch (error) {
    console.log("Error fetching author:", error);
    return "Unknown author"; // Fallback if author fetch fails
  }
};

// Function to fetch manga chapters dynamically without sorting
const fetchChaptersWithPagination = async (mangaId) => {
  let allChapters = [];
  let page = 1;

  try {
    while (true) {
      const resp = await fetch(
        `https://api.mangadex.org/manga/${mangaId}/feed?limit=500&translatedLanguage[]=en&order[chapter]=desc`
      );

      const chaptersData = await resp.json();
      allChapters = [...allChapters, ...chaptersData.data];

      if (chaptersData.data.length < 100) {
        break; // Exit when fewer than 100 chapters are returned
      }
      page += 1;
    }
  } catch (error) {
    console.error("Error fetching chapters:", error);
  }

  return allChapters.filter((chapter) => chapter.attributes.volume !== null); // Filter out chapters without volumes
};

const MangaDetailsPage = ({ params }) => {
  const [mangaDetails, setMangaDetails] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [authorNames, setAuthorNames] = useState(null);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const details = await fetchMangaDetails(params.details);
      setMangaDetails(details);

      // Fetch cover image if available
      if (details) {
        const coverArtRelationship = details.relationships.find(
          (r) => r.type === "cover_art"
        );
        const coverArtId = coverArtRelationship
          ? coverArtRelationship.id
          : null;

        if (coverArtId) {
          const coverRes = await fetch(
            `https://api.mangadex.org/cover/${coverArtId}`
          );
          const coverData = await coverRes.json();
          const fileName = coverData.data.attributes.fileName;

          setCoverImageUrl(
            `https://uploads.mangadex.org/covers/${params.details}/${fileName}`
          );
        }

        // Fetch author details
        const authors = details.relationships.filter(
          (r) => r.type === "author"
        );
        if (authors.length > 0) {
          const authorName = await fetchAuthorDetails(authors[0].id);
          setAuthorNames(authorName);
        }
      }

      // Fetch all chapters using pagination, and filter out chapters without volumes
      const allChapters = await fetchChaptersWithPagination(params.details);
      setChapters(allChapters);
      console.log(allChapters);
    };

    fetchData();
  }, [params.details]);

  if (!mangaDetails) return <h1>Loading...</h1>;

  // Extract manga title, alt title, and description
  const mangaTitle = mangaDetails.attributes.title?.en || "No title available";
  const mangaAltTitle =
    mangaDetails.attributes.altTitles?.find((alt) => alt.en)?.en ||
    "No alt title available";
  const mangaDescription =
    mangaDetails.attributes.description?.en || "No description available";

  // Extract genres
  const genres = mangaDetails.attributes.tags || [];
  const genreNames =
    genres
      .map((tag) => tag.attributes?.name?.en)
      .filter((name) => name !== undefined) // Remove undefined names
      .join(", ") || "No genres available";

  // Additional manga details
  const year = mangaDetails.attributes.year || "Unknown year";
  const status = mangaDetails.attributes.status || "Unknown status";

  return (
    <div className="container mx-auto p-4 pt-20">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section: Poster Image */}
        <div className="flex-shrink-0">
          {coverImageUrl ? (
            <Image
              src={coverImageUrl}
              alt={`Poster for ${mangaTitle}`}
              width={300}
              height={450}
            />
          ) : (
            <h1>No poster available</h1>
          )}
        </div>

        {/* Right Section: Manga Details */}
        <div className="flex flex-col justify-between">
          {/* Title and Alt Title */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{mangaTitle}</h1>
            {mangaAltTitle !== "No alt title available" && (
              <h2 className="text-xl text-gray-600 mb-4">{mangaAltTitle}</h2>
            )}

            {/* Description */}
            <p className="mb-4">{mangaDescription}</p>

            {/* Author and Other Details */}
            <p className="mb-2">
              <strong>
                {" "}
                {authorNames || "Unknown author"}, {status}, {year}{" "}
              </strong>
            </p>
            <p className="mb-2">
              <strong>Genres:</strong> {genreNames}
            </p>
          </div>

          {/* Buttons */}
          <div>
            <button className="bg-black-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Add to Library
            </button>
            <button className="bg-black-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
              Start reading/Resume
            </button>
          </div>
        </div>
      </div>

      {/* Chapter List Section */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Chapters</h2>
        <div>
          {chapters.length > 0 ? (
            <ul>
              {chapters
                .sort((a, b) => {
                  const chapterA = parseFloat(a.attributes.chapter) || 0; // Fallback if chapter is missing
                  const chapterB = parseFloat(b.attributes.chapter) || 0;
                  return chapterB - chapterA; // Sort from biggest to smallest
                })
                .map((chapter) => (
                  <li key={chapter.id} className="mb-2">
                    <Link
                      href={`/chapter/${chapter.id}`} // Use dynamic route for each chapter
                      className="text-white-1000 hover:text-white-2000"
                    >
                      <strong>Chapter {chapter.attributes.chapter}</strong>{" "}
                      {chapter.attributes.title || ""}
                    </Link>
                  </li>
                ))}
            </ul>
          ) : (
            <p>No chapters available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MangaDetailsPage;
