import { PostModel } from "@/models/post/post-models";
import { PostRepository } from "./post-repository";
import { resolve } from "path";
import { readFile } from "fs/promises";
import { setTimeout } from "timers";
// import { promises } from "dns";
// import { error } from "console";

const Root_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve(
  Root_DIR,
  "src",
  "db",
  "seed",
  "posts.json",
);

const Simulate_Wait_IN_MS = 0;

export class JsonPostRepository implements PostRepository {
  private async simulateWait() {
    if (Simulate_Wait_IN_MS <= 0) return;

    await new Promise((result) => setTimeout(result, Simulate_Wait_IN_MS));
  }

  private async readFromDisk(): Promise<PostModel[]> {
    const jsonContent = await readFile(JSON_POSTS_FILE_PATH, "utf-8");
    const parseJson = JSON.parse(jsonContent);
    const { posts } = parseJson;
    return posts;
  }

  async findaAll(): Promise<PostModel[]> {
    await this.simulateWait();

    return this.readFromDisk();
  }

  async findById(id: string): Promise<PostModel> {
    const posts = await this.findaAll();
    const post = posts.find((post) => post.id === id);

    if (!post) throw new Error("Post não encontrado");

    return post;
  }
}
