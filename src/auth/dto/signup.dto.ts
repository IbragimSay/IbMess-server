import { ApiProperty } from "@nestjs/swagger"

export class signupDto {
    @ApiProperty({default: "test2@mail.ru"})
    mail: string
    @ApiProperty({default: "test"})
    password: string
}