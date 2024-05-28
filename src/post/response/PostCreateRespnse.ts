import { ApiProperty } from '@nestjs/swagger';
export class PostCreateResponse {
    @ApiProperty({default: "4df109f5-2bc5-4b03-8e0f-8b54219b46e4",})
    id: string
    @ApiProperty({default: "название поста"})
    title: string
}