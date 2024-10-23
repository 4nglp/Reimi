"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

const MangaReader = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const { id: chapterId } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!chapterId) return;
    const fetchPages = async () => {
      try {
        const response = await fetch(
          `https://api.mangadex.org/at-home/server/${chapterId}`
        );
        const data = await response.json();
        if (data.chapter && data.chapter.data) {
          const pageUrls = data.chapter.data.map(
            (file) => `${data.baseUrl}/data/${data.chapter.hash}/${file}`
          );
          setPages(pageUrls);

          // Preload all images
          pageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
          });
        }
      } catch (error) {
        console.error("Failed to load pages", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPages();
  }, [chapterId]);

  // Scroll to the top of the page when the currentPage changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  // Handle Escape key press to go back to the previous page
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        router.back(); // Go back to the previous page
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [router]);

  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="manga-reader-container w-screen h-screen overflow-hidden relative">
      <button
        onClick={handlePreviousPage}
        className="absolute left-0 top-0 h-full w-1/5 z-10"
        style={{ display: currentPage === 0 ? "none" : "block" }} // Hide button if on the first page
      />
      <button
        onClick={handleNextPage}
        className="absolute right-0 top-0 h-full w-1/5 z-10"
        style={{ display: currentPage === pages.length - 1 ? "none" : "block" }} // Hide button if on the last page
      />
      <img
        src={pages[currentPage]}
        alt={`Page ${currentPage + 1}`}
        className="object-contain w-full h-full"
      />
    </div>
  );
};

export default MangaReader;
