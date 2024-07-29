import { ApiProperty } from "@nestjs/swagger"

export class signupDto {
    mail: string
    password: string
    firstName: string
    lastName: string
}