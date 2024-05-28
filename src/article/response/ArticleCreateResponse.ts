import { ApiProperty, ApiResponse } from "@nestjs/swagger"

export class ArticleCreateResponse {
    @ApiProperty({default: "edc6a5af-8d01-447c-89cf-e0600847911d"})
    id: string
    @ApiProperty({default: "текст текст текст"})
    text: string
    @ApiProperty({default: "4df109f5-2bc5-4b03-8e0f-8b54219b46e4"})
    postId: string
}