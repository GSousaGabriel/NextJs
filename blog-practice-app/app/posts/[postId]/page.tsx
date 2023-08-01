import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData } from "@/lib/posts-util";
import { Metadata, ResolvingMetadata } from "next";

interface IRequest {
  params: { postId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: IRequest,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // fetch data
  const postData = getPostData(params.postId)

  return {
    title: postData.title,
    description: postData.excerpt,
  }
}

export default function PostDetail(req: IRequest) {
  const { params } = req
  const postData = getPostData(params.postId)

  return (
    <>
      <PostContent post={postData} />
    </>
  )
}

