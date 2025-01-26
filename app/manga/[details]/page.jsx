import Nav from "@components/Nav";
import Image from "next/image";
import Link from "next/link";

async function fetchMangaDetails(currentMangaId) {
  const res = await fetch(`https://api.mangadex.org/manga/${currentMangaId}`);
  const data = await res.json();
  return data.data;
}

async function fetchCoverImageUrl(coverArtId, mangaId) {
  const res = await fetch(`https://api.mangadex.org/cover/${coverArtId}`);
  const data = await res.json();
  const fileName = data.data.attributes.fileName;
  return `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
}

async function fetchAuthorName(authorId) {
  const res = await fetch(`https://api.mangadex.org/author/${authorId}`);
  const data = await res.json();
  return data.data.attributes.name;
}

async function fetchChapters(mangaId) {
  const res = await fetch(
    `https://api.mangadex.org/manga/${mangaId}/feed?limit=500&translatedLanguage[]=en&order[chapter]=desc`
  );
  const data = await res.json();
  return data.data;
}

export default async function MangaDetailsPage({ params }) {
  const mangaDetails = await fetchMangaDetails(params.details);

  const coverRel = mangaDetails.relationships.find(
    (rel) => rel.type === "cover_art"
  );
  const coverImageUrl = coverRel
    ? await fetchCoverImageUrl(coverRel.id, params.details)
    : null;

  const authorRel = mangaDetails.relationships.find(
    (rel) => rel.type === "author"
  );
  const authorName = authorRel
    ? await fetchAuthorName(authorRel.id)
    : "Unknown Author";

  const chapters = await fetchChapters(params.details);

  const mangaTitle = mangaDetails.attributes.title?.en || "No title available";
  const mangaAltTitle =
    mangaDetails.attributes.altTitles?.find((alt) => alt.en)?.en ||
    "No alt title available";
  const mangaDescription =
    mangaDetails.attributes.description?.en || "No description available";

  const genres = mangaDetails.attributes.tags || [];
  const genreNames = genres
    .map((tag) => tag.attributes?.name?.en)
    .filter((name) => name !== undefined)
    .join(", ");

  const year = mangaDetails.attributes.year || "Unknown year";
  const status = mangaDetails.attributes.status || "Unknown status";

  return (
    <>
      <Nav />
      <div className="container mx-auto p-4">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-shrink-0">
            {coverImageUrl ? (
              <div className="relative w-[300px] h-[450px]">
                <Image
                  src={coverImageUrl}
                  alt={`Poster for ${mangaTitle}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            ) : (
              <h1>No poster available</h1>
            )}
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">{mangaTitle}</h1>
              {mangaAltTitle !== "No alt title available" && (
                <h2 className="text-xl text-gray-600 mb-4">{mangaAltTitle}</h2>
              )}

              <p className="mb-4">{mangaDescription}</p>
              <p className="mb-2">
                <strong>
                  {authorName}, {status}, {year}
                </strong>
              </p>
              <p className="mb-2">
                <strong>Genres:</strong> {genreNames || "No genres available"}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4">Chapters</h2>
          <div>
            {chapters.length > 0 ? (
              <ul>
                {chapters.map((chapter) => (
                  <li key={chapter.id} className="mb-2">
                    <Link
                      href={`/manga/${params.details}/chapter/${chapter.id}`}
                      className="text-white-600"
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
    </>
  );
}
