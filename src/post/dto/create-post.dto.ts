import { ApiProperty } from "@nestjs/swagger";

export class createPostDto {
    @ApiProperty({default: "название поста"})
    title: string
}