import { ApiProperty } from "@nestjs/swagger"

export class loginDto {
    @ApiProperty({default: "test@mail.ru"})
    mail: string
    @ApiProperty({default: "test"})
    password: string
}