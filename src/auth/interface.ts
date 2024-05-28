import { Delete } from '@nestjs/common';
import { ApiProperty } from "@nestjs/swagger";
import { Token } from "@prisma/client";


class tokenRefresh {
    @ApiProperty({
        default: "7e42845d-bc16-4609-a749-d3fc92e8ebed"
    })
    token: string;
    @ApiProperty()
    exp: Date;  
    @ApiProperty({
        default: '289ed1d9-996c-45c2-99ba-f077fbc71510'
    })
    UserId: string
    @ApiProperty({
        default: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    })
    userAgent: string
}
export class Tokens {
    @ApiProperty({
        default: "Bearer eyJhbGciOiJIUwefdwezI1NiIsInR5cCI6IkpXVCJ9JpZCI6IjI4OWVkMWQ5LTk5NmMtfewNDVjMi05OWJhLWYwNzdmYmM3MCIsIm1haWwiOiJpYnJhc2hrYTJAbWFpbC5ydSIsImlhdfasweTcxNjM2NTI2NiwiZXhwIjoxNzE2ODgzNjY2fQ.qd10AhCFqV5mCnROokTduLJTiXNJ5G9yPcnb4tn8424"
    })
    accsesToken: string
    @ApiProperty({type: tokenRefresh})
    refreshToken: Token
}
export class JwtPayload {
    id: string
    mail: string
}