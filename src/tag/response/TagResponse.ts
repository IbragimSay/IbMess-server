import { ApiProperty } from "@nestjs/swagger";

export class TagResponse {
    @ApiProperty({default: "backend"})
    tag: string
}