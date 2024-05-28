import { ApiProperty } from "@nestjs/swagger";

class Image {
  @ApiProperty({ default: "43263f95-6679-4546-a4c1-f18be83f203f" })
  id: string;
  @ApiProperty({ default: "2024-05-27T08:24:41.860Z.jpg" })
  content: string;
}

class Article {
  @ApiProperty({ default: "ce09878b-05ed-48e2-af7c-94d1874cc8e6" })
  id: string;
  @ApiProperty({ default: "staty" })
  text: string;
  @ApiProperty({ type: [Image] }) 
  images: Image[];
}

export class PostGetOneResponse {
  @ApiProperty({ default: "b4e867bd-7c61-40e5-ba37-77857bc22ad1" })
  id: string;
  @ApiProperty({ default: "Post Title" })
  title: string;
  @ApiProperty({default: ["backend"]})
  tag: string[]
  @ApiProperty({ type: [Article] }) 
  articles: Article[];
}