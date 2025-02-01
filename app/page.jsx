import Nav from "@components/Nav";
import Banner from "@components/Banner";
import { promises as fs } from 'fs';

export default async function Home() {
	const mangaListFetch = await fs.readFile(process.cwd() + '/app/mangaList.json', 'utf8');
	const mangaList = JSON.parse(mangaListFetch);

	// console.log("fetched: " +mangaListFetch);
	return (
		<div className="w-full flex-center flex-col">
			<Nav />
			<Banner mangaList={mangaList} />
		</div>
	);
};
