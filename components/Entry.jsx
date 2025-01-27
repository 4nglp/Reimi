import Link from "@node_modules/next/link";
import Image from "@node_modules/next/image";

const Entry = ({ entries }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manga list</h1>
      {entries.length > 0 ? (
        <div className="grid grid-cols-5 gap-4">
          {entries.map((entry) => (
            <div key={entry.id} className="relative flex flex-col mb-4">
              <Link href={`/manga/${entry.id}`} className="block">
                <div className="relative w-48 h-72 bg-gray-200 overflow-hidden flex-shrink-0 transition-transform transform hover:scale-105">
                  {entry.coverUrl && (
                    <Image
                      src={entry.coverUrl}
                      alt={entry.attributes.title.en || "Unknown Title"}
                      className="object-cover w-full h-full"
                      width={400}
                      height={800}
                    />
                  )}
                  <div className="absolute bottom-0 w-full bg-black bg-opacity-60 text-white text-center py-2">
                    {entry.attributes.title.en || "No Title Available"}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h2>No manga found.</h2>
      )}
    </div>
  );
};

export default Entry;
