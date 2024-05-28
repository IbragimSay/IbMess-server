import { ApiProperty } from "@nestjs/swagger"

export class logupDto {
    @ApiProperty({default: "test2@mail.ru"})
    mail: string
    @ApiProperty({default: "test"})
    password: string
}