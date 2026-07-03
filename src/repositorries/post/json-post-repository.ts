import { PostModel } from "@/models/post/post-models"; 
import { PostRepository } from "./post-repository";
import {resolve} from 'path';
import {readFile} from 'fs/promises';
// import { promises } from "dns";
// import { error } from "console";

const Root_DIR = process.cwd();
const JSON_POSTS_FILE_PATH = resolve (
  Root_DIR, 'src','db','seed', 'posts.json'
)

export class JsonPostRepository implements PostRepository {
 private async readFromDisk():Promise<PostModel[]> {
  const jsonContent = await readFile(JSON_POSTS_FILE_PATH, 'utf-8');
  const parseJson = JSON.parse(jsonContent);
  const {posts} = parseJson;
  return posts
 }

async findaAll(): Promise<PostModel[]> {
  return this.readFromDisk();
}

async findById(id: string): Promise<PostModel> {
  const posts = await this.findaAll();
  const post = posts.find(post => post.id === id);

  if(!post) throw new Error('Post não encontrado')

  return post;
}
}

export const postRepository:PostRepository = new JsonPostRepository();

postRepository.findaAll().then(jsonContent => console.log(jsonContent));