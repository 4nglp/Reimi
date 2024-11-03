"use client"; // Make this a client component
import Nav from "@components/Nav";
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

// Function to fetch manga chapters dynamically and sorted by latest chapter
const fetchChapters = async (mangaId) => {
  try {
    const resp = await fetch(
      `https://api.mangadex.org/manga/${mangaId}/feed?limit=500&translatedLanguage[]=en&order[chapter]=desc&includeEmptyPages=0`
    );
    const chaptersData = await resp.json();
    return chaptersData.data;
  } catch (error) {
    console.error("Error fetching chapters:", error);
    return [];
  }
};

const MangaDetailsPage = ({ params }) => {
  const [mangaDetails, setMangaDetails] = useState(null);
  const [coverImageUrl, setCoverImageUrl] = useState(null);
  const [authorNames, setAuthorNames] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isAdded, setIsAdded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Reading");

  // Fetch manga details, authors, cover, and chapters when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const details = await fetchMangaDetails(params.details);
      if (details) {
        setMangaDetails(details);

        // Fetch cover image if available
        const coverArtRelationship = details.relationships.find(
          (r) => r.type === "cover_art"
        );
        const coverArtId = coverArtRelationship
          ? coverArtRelationship.id
          : null;

        if (coverArtId) {
          try {
            const coverRes = await fetch(
              `https://api.mangadex.org/cover/${coverArtId}`
            );
            const coverData = await coverRes.json();

            if (coverData.data && coverData.data.attributes.fileName) {
              const fileName = coverData.data.attributes.fileName;
              setCoverImageUrl(
                `https://uploads.mangadex.org/covers/${params.details}/${fileName}`
              );
            } else {
              console.log("No cover image available");
            }
          } catch (error) {
            console.error("Error fetching cover image:", error);
          }
        } else {
          console.log("Cover art relationship not found");
        }

        // Fetch author details and other data
        const authors = details.relationships.filter(
          (r) => r.type === "author"
        );
        if (authors.length > 0) {
          const authorName = await fetchAuthorDetails(authors[0].id);
          setAuthorNames(authorName);
        }

        // Fetch all chapters
        const allChapters = await fetchChapters(params.details);
        setChapters(allChapters);

        // Check if manga is already added to the library
        const library = JSON.parse(localStorage.getItem("library")) || [];
        const isMangaInLibrary = library.some((item) => item.id === details.id);
        setIsAdded(isMangaInLibrary);
      }
    };

    fetchData();
  }, [params.details]);

  // Add to library function
  const addToLibrary = () => {
    const mangaData = {
      id: mangaDetails.id,
      title: mangaDetails.attributes.title?.en,
      coverImageUrl,
      chapterCount: chapters.length,
      category: selectedCategory,
    };

    const library = JSON.parse(localStorage.getItem("library")) || [];
    library.push(mangaData);
    localStorage.setItem("library", JSON.stringify(library));
    setIsAdded(true);
    setShowModal(false); // Close the modal
  };

  // Remove from library function
  const removeFromLibrary = () => {
    const library = JSON.parse(localStorage.getItem("library")) || [];
    const updatedLibrary = library.filter(
      (item) => item.id !== mangaDetails.id
    );
    localStorage.setItem("library", JSON.stringify(updatedLibrary));
    setIsAdded(false);
  };

  // Store read chapters in localStorage
  const markChaptersAsRead = (selectedChapter) => {
    const readChapters = JSON.parse(localStorage.getItem("readChapters")) || [];
    const selectedChapterNum = parseInt(selectedChapter.attributes.chapter, 10);

    // Mark all previous chapters as read if selected chapter number is greater than 1
    if (selectedChapterNum > 1) {
      for (let i = 1; i <= selectedChapterNum; i++) {
        if (!readChapters.includes(i)) readChapters.push(i);
      }
    } else {
      readChapters.push(selectedChapterNum);
    }

    localStorage.setItem("readChapters", JSON.stringify(readChapters));
  };

  // Trigger marking a chapter as read after all pages are viewed
  const handleChapterCompletion = (chapter) => {
    markChaptersAsRead(chapter);
  };

  // Check if a chapter is read to display it in the UI
  const isChapterRead = (chapterNum) => {
    const readChapters = JSON.parse(localStorage.getItem("readChapters")) || [];
    return readChapters.includes(parseInt(chapterNum, 10));
  };

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
      .filter((name) => name !== undefined)
      .join(", ") || "No genres available";

  // Additional manga details
  const year = mangaDetails.attributes.year || "Unknown year";
  const status = mangaDetails.attributes.status || "Unknown status";

  return (
    <>
      <Nav />
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section: Poster Image */}
          <div className="flex-shrink-0">
            {coverImageUrl ? (
              <div className="relative w-[300px] h-[450px]">
                <Image
                  src={coverImageUrl}
                  alt={`Poster for ${mangaTitle}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
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
                  {authorNames || "Unknown author"}, {status}, {year}
                </strong>
              </p>
              <p className="mb-2">
                <strong>Genres:</strong> {genreNames}
              </p>
            </div>

            {/* Buttons */}
            <div>
              <button
                onClick={() => setShowModal(true)} // Open modal instead of adding directly
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              >
                {selectedCategory} {/* Show current category */}
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
                {chapters.map((chapter) => (
                  <li key={chapter.id} className="mb-2">
                    <Link
                      href={`/manga/${params.details}/chapter/${chapter.id}`}
                      className={`text-white-600 ${
                        isChapterRead(chapter.attributes.chapter) ? "bold" : ""
                      }`}
                      onClick={() => handleChapterCompletion(chapter)}
                    >
                      Chapter {chapter.attributes.chapter}:{" "}
                      {chapter.attributes.title || "No title"}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No chapters available for this manga.</p>
            )}
          </div>
        </div>
      </div>

      {/* Add to Library Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-70">
          <div className="bg-gray-800 p-6 rounded shadow-lg w-[600px] relative">
            <div className="flex justify-between mb-4">
              <h2 className="text-lg font-bold text-white">Add to Library</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-white"
              >
                &times; {/* Close button */}
              </button>
            </div>
            <div className="flex">
              {/* Left Side: Mini Poster */}
              <div className="flex flex-col w-1/2 pr-4">
                {coverImageUrl && (
                  <div className="relative w-full h-60 mb-4">
                    <Image
                      src={coverImageUrl}
                      alt={`Poster for ${mangaTitle}`}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
              </div>

              {/* Right Side: Title and Category Selection */}
              <div className="flex flex-col w-1/2">
                <h2 className="text-lg font-bold text-white">{mangaTitle}</h2>
                <p className="text-gray-300 mb-2">
                  Reading Status: {selectedCategory}
                </p>
                <h2 className="text-lg font-bold text-white mb-4">
                  Select Category
                </h2>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-600 bg-gray-700 text-white p-2 mb-4 w-full"
                >
                  <option value="Reading">Reading</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Planning">Planning</option>
                  <option value="Completed">Completed</option>
                  <option value="Dropped">Dropped</option>
                  <option value="None">None</option>{" "}
                  {/* Add this option to remove entry */}
                </select>

                {/* Buttons at the bottom right inside the modal */}
                <div className="flex justify-end space-x-2 mt-auto">
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      if (selectedCategory === "None") {
                        removeFromLibrary();
                        setShowModal(false); // Call remove function if "None" is selected
                      } else {
                        addToLibrary(); // Call add function otherwise
                      }
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {selectedCategory === "None" ? "Remove" : "Add"}{" "}
                    {/* Dynamic button text */}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MangaDetailsPage;
