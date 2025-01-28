import Nav from "@components/Nav";
import Banner from "@components/Banner";
const Home = () => {
  const mangaList = [
    {
      id: "37f5cce0-8070-4ada-96e5-fa24b1bd4ff9",
      title: "Kaguya-sama: Love Is War",
      coverUrl:
        "https://uploads.mangadex.org/covers/37f5cce0-8070-4ada-96e5-fa24b1bd4ff9/7bb3b2c6-6a26-4bad-9758-d35d329c32f8.jpg",
      description:
        "All’s fair when love is war! Two geniuses. Two brains. Two hearts. One battle. Who will confess their love first…?! Kaguya Shinomiya and Miyuki Shirogane are two geniuses who stand atop their prestigious academy’s student council, making them the elite among elite. But it’s lonely at the top and each has fallen for the other. There’s just one huge problem standing in the way of lovey-dovey bliss—they’re both too prideful to be the first to confess their romantic feelings and thus become the “loser” in the competition of love! And so begins their daily schemes to force the other to confess first!",
      author: "Akasaka Aka",
      genres:
        "Award Winning, Romance, Comedy, Drama, School Life, Slice of Life",
    },
    {
      id: "418791c0-35cf-4f87-936b-acd9cddf0989",
      title: "The Fragrant Flower Blooms with Dignity",
      coverUrl:
        "https://uploads.mangadex.org/covers/418791c0-35cf-4f87-936b-acd9cddf0989/bad1354c-3ca6-450c-849e-f8132e52fe3c.jpg",
      description:
        "In a certain place, there are two neighboring high schools. Chidori High School, a bottom-feeder boys' school where idiots gather, and Kikyo Girls' School, a well-established girls' school. Rintaro Tsumugi, a strong and quiet second year student at Chidori High School, meets Kaoruko Waguri, a girl who comes as a customer while helping out at his family's cake shop. Rintaro feels comfortable spending time with Kaoruko, but she is a student at Kikyo Girls, a neighboring school that thoroughly dislikes Chidori High.",
      author: "Mikami Saka",
      genres: "Romance, Comedy, Drama, School Life, Slice of Life",
    },
    {
      id: "01882116-3e45-4d67-b932-34f60d360086",
      title: "The Flowers of Evil",
      coverUrl:
        "https://uploads.mangadex.org/covers/01882116-3e45-4d67-b932-34f60d360086/17165396-4a7d-4466-ba9f-ddfe8708890d.jpg",
      description:
        "Kasuga Takao is a boy who loves reading books, particularly Baudelaire's The Flowers of Evil. A girl at his school, Saeki Nanako, is his muse and his Venus, and he admires her from a distance. One day, he forgets his copy of The Flowers of Evil in the classroom and runs back alone to pick it up. In the classroom, he finds not only his book but Saeki's gym uniform. On a mad impulse, he steals it. Now everyone knows 'some pervert' stole Saeki's uniform, and Kasuga is dying with shame and guilt. Furthermore, the weird, creepy, and friendless girl of the class, Nakamura, saw him take the uniform. Instead of revealing it was him, she recognizes his kindred deviant spirit and uses her knowledge to take control of his life. Will it be possible for Kasuga to get closer to Saeki, despite Nakamura's meddling and his dark secret? What exactly does Nakamura intend to do with him?",
      author: "Oshimi Shuzo",
      genres:
        "Psychological, Romance, Philosophical, Drama, School Life, Horror, Delinquents, Slice of Life",
    },
    {
      id: "9a414441-bbad-43f1-a3a7-dc262ca790a3",
      title: "Omniscient Reader's Viewpoint",
      coverUrl:
        "https://uploads.mangadex.org/covers/9a414441-bbad-43f1-a3a7-dc262ca790a3/aeb88211-faa2-4f9f-adee-a8e4d814d51a.jpg",
      description:
        "Dokja was an average office worker whose sole interest was reading his favorite web novel 'Three Ways to Survive the Apocalypse.' But when the novel suddenly becomes reality, he is the only person who knows how the world will end. Armed with this realization, Dokja uses his understanding to change the course of the story, and the world, as he knows it.",
      author: "sing N song (싱숑)",
      genres:
        "Award Winning, Reincarnation, Monsters, Action, Long Strip, Survival, Adventure, Post-Apocalyptic, Magic, Fantasy, Web Comic, Supernatural, Adaptation, Full Color",
    },
  ];
  return (
    <div className="w-full flex-center flex-col">
      <Nav />
      <Banner mangaList={mangaList} />
    </div>
  );
};
export default Home;
