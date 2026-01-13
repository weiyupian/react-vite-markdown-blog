import { Header } from "../components/Header.jsx";
import homeFavicon from "../assets/icon.jpg";
import './HomePage.css';
import { MainContent } from "../components/MainContent.jsx";
import { CategoryLabel } from "../components/CategoryLabel.jsx";
import { Footer } from "../components/Footer.jsx";
import { useParams } from "react-router";

export function HomePage({ posts, links}) {
  const { categoryName } = useParams();

  const filteredPosts = categoryName ? posts.filter(p => p.category === categoryName) : posts;

  return (
    <>
      <title>blog for react</title>
      <link rel="icon" type="image/svg+xml" href={homeFavicon} />
      <Header links={links} />
      <CategoryLabel category={categoryName} />
      <MainContent posts={filteredPosts} />
      <Footer links={links} />
    </>
  );
}