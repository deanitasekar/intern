import { PostType } from "@/_types/post.type";
import HeroComponent from "./hero.component";
import PostGrid from "./postgrid.component";
import SidebarComponent from "./sidebar.component";

interface PostMainProps {
  posts: PostType[];
}

export default function PostMain({ posts }: PostMainProps) {
  return (
    <div className="homepage">
      <HeroComponent />

      <div className="main-content">
        <div className="content-wrapper">
          <div className="posts-section">
            <div className="section-header">
              <h2 className="section-title">Latest Posts</h2>
              <p className="section-subtitle">
                Discover our most recent articles and stories
              </p>
            </div>
            <PostGrid posts={posts} />
          </div>

          <SidebarComponent />
        </div>
      </div>
    </div>
  );
}