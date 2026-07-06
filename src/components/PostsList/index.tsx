import { postRepository } from "@/repositorries/post";

export async function PostsList() {
  const posts = await postRepository.findaAll();

  return (
    <div>
      {posts.map((post) => {
        return <p key={post.id}>{post.title}</p>;
      })}
    </div>
  );
}
