import { PostModel } from "@/models/post/post-models"

export interface PostRepository {
  findaAll():Promise<PostModel[]>;
  findById(id:string):Promise<PostModel>;
}