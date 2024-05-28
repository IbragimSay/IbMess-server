import { ApiProperty, ApiResponse } from "@nestjs/swagger"

export class ImageCreateResponse {
    @ApiProperty({default: "bb713872-0cc0-4d42-92a5-95c7c90727ee"})
    id: string
    @ApiProperty({default: "2024-05-25T19:26:10.138Z.jpg"})
    content: string
}