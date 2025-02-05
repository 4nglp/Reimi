import Link from "next/link";
import Image from "next/image";

const Entry = ({ entries }) => {
  return (
    <div className="mx-auto p-4">
      {entries.length > 0 ? (
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {entries.map((entry) => (
            <div key={entry.id} className="relative flex flex-col mb-1 h-full">
              <Link href={`/manga/${entry.id}`} className="block h-full">
                <div className="relative w-full h-full bg-gray-200 overflow-hidden flex-shrink-0 transition-transform transform hover:scale-105">
                  {entry.coverUrl && (
                    <div className="w-full h-full bg-gray-100 relative">
                      <Image
                        src={entry.coverUrl}
                        alt={entry.attributes.title.en || "Unknown Title"}
                        className="object-cover w-full h-full"
                        width={400}
                        height={600}
                      />
                    </div>
                  )}
                  <div className="absolute bottom-0 w-full bg-gray-800 bg-opacity-80 text-white text-center py-2">
                    <p>{entry.attributes.title.en || "No Title Available"}</p>
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
