import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData } from "@/lib/posts-util";
import { NextRequest } from "next/server";

interface IRequest extends NextRequest {
  params: {
    postId: string
  }
}

export const fallback = <p>Loading...</p>

export default function PostDetail(req: IRequest) {
  const { params } = req
  const postData = getPostData(params.postId)

  return <PostContent post={postData}/>
}