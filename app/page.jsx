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
    {
      id: "a77742b1-befd-49a4-bff5-1ad4e6b0ef7b",
      title: "Chainsaw Man",
      coverUrl:
        "https://uploads.mangadex.org/covers/a77742b1-befd-49a4-bff5-1ad4e6b0ef7b/c445d559-be59-4087-b985-a29f294aafb9.jpg",
      description:
        "Broke young man + chainsaw dog demon = Chainsaw Man! The name says it all! Denji's life of poverty is changed forever when he merges with his pet chainsaw dog, Pochita! Now he's living in the big city and an official Devil Hunter. But he's got a lot to learn about his new job and chainsaw powers!",
      author: "Fujimoto Tatsuki",
      genres:
        "Award Winning, Monsters, Action, Demons, Comedy, Gore, Horror, Supernatural",
    },
    {
      id: "25aaabb1-9f74-4469-a8d6-1eac5924cc79",
      title: "Pandora Hearts",
      description:
        "The air of celebration surrounding fifteen-year-old Oz Vessalius's coming-of-age ceremony quickly turns to horror when he is condemned for a sin about which he knows nothing. He is thrown into an eternal, inescapable prison known as the Abyss from which there is no escape. There, he meets a young girl named Alice, who is not what she seems. Now that the relentless cogs of fate have begun to turn, do they lead only to crushing despair for Oz, or is there some shred of hope for him to grasp on to? ",
      coverUrl:
        "https://uploads.mangadex.org/covers/25aaabb1-9f74-4469-a8d6-1eac5924cc79/17dba76b-3332-417f-93b6-6c32c59427cc.jpg",
      author: "Mochizuki Jun",
      genres:
        "Reincarnation, Time Travel, Monsters, Action, Romance, Comedy, Adventure, Drama, Horror, Fantasy, Supernatural, Mystery, Tragedy",
    },
    {
      id: "67bd081f-1c40-4ae2-95a2-6af29de4fc01",
      title: "The Horizon",
      description:
        "Two children unexpectedly meet in the midst of war. After running away from the chaos, they come across a long empty road. With no adults to rely on, the two strangers, now become friends, walk alongside each other to see what's at the end of the road. All they hope is to keep being able to move forward. Just what kind of trials and tragedy awaits them during their journey for survival?",
      coverUrl:
        "https://uploads.mangadex.org/covers/67bd081f-1c40-4ae2-95a2-6af29de4fc01/29dcabe0-9efe-4575-9fcf-36be55363591.jpg",
      author: "Jeong Ji-Hoon",
      genres:
        "Psychological, Adventure, Post-Apocalyptic, Sexual Violence, Gore, Drama, Web Comic, Tragedy",
    },
    {
      id: "fffbfac3-b7ad-41ee-9581-b4d90ecec941Inoue Kenji",
      title: "Grand Blue Dreaming",
      description:
        'A new life begins for Kitahara Iori as he begins his college career near the ocean in Izu city, full of excitement for his new life. He will be moving into his uncle\'s diving store "Grand Blue." There he finds the ocean, beautiful women, and men that love diving and alcohol. Will Iori be able to live his dream college life?',
      coverUrl:
        "https://uploads.mangadex.org/covers/fffbfac3-b7ad-41ee-9581-b4d90ecec941/eb202491-f0dc-4102-b748-453b84dc5c5c.jpg",
      author: "Inoue Kenji",
      genres: "Romance, Comedy, School Life, Slice of Life",
    },
    {
      id: "665766a3-905d-4a71-a90a-bd2c75d1a81f",
      title: "Alice in Borderland",
      description:
        "Alice Ryouhei will leave high school soon, but he's trying to avoid thinking about his future. Late one night, when he's hanging out with his tough friend Karube and his silly, girl-crazy friend Chota, they see fireworks. After one blindingly bright explosion, they find themselves waking up in a different world. In this 'Borderland,' people are forced to either participate in potentially deadly games or simply die. Will Chota, Karube, and Ryouhei be able to survive this dangerous new world, and is there a way they can get back to their original lives? ",
      coverUrl:
        "https://uploads.mangadex.org/covers/665766a3-905d-4a71-a90a-bd2c75d1a81f/aa02f5a2-e068-4a53-bf3c-2c77f23f43b6.jpg",
      author: "Asou Haro",
      genres:
        "Thriller, Action, Psychological, Comedy, Crime, Survival, Adventure, Sexual Violence, Isekai, Gore, Drama, School Life, Horror, Slice of Life, Supernatural, Mystery, Tragedy",
    },
    {
      id: "319df2e2-e6a6-4e3a-a31c-68539c140a84",
      title: "Slam Dunk!",
      description:
        "Winning isn't everything in the game of basketball, but who wants to come in second? It takes dedication and discipline to be the best, and the Shohoku High hoops team wants to be just that. They have one last year to make their captain's dream of reaching the finals come true–will they do it? Takehiko Inoue's legendary beloved basketball manga is finally here and the tale of a lifetime is in your hands. Hanamichi Sakuragi's got no game with girls—none at all! It doesn't help that he's known for throwing down at a moment's notice and always coming out on top. A hopeless bruiser, he's been rejected by 50 girls in a row! All that changes when he meets the girl of his dreams, Haruko, and she's actually not afraid of him! When she introduces him to the game of basketball, his life is changed forever… Note: Includes a one-shot called 10 Days After.",
      coverUrl:
        "https://uploads.mangadex.org/covers/319df2e2-e6a6-4e3a-a31c-68539c140a84/a845455f-52d0-4cc4-92a8-bd5bad7d69b9.jpg",
      author: "Inoue Takehiko",
      genres:
        "Award Winning, Psychological, Romance, Comedy, Sports, Drama, School Life, Delinquents, Slice of Life",
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
  ];
  return (
    <div className="w-full flex-center flex-col">
      <Nav />
      <Banner mangaList={mangaList} />
    </div>
  );
};
export default Home;
