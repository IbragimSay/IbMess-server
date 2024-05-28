import { ApiProperty } from "@nestjs/swagger";

export class createTagDto {
    @ApiProperty({default: "backend"})
    tag:string
}