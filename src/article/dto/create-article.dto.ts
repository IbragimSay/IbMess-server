import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateArticleDto {
    @ApiProperty({default: "название статьи"})
    @IsString()
    text: string
}