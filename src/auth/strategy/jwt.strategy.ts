import { UserService } from './../../user/user.service';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../interface';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private logger = new Logger(JwtStrategy.name)
  constructor(
    private readonly configService:ConfigService,
    private readonly userService:UserService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET")
    });
  }

  async validate(payload: JwtPayload) {
    const user  = await this.userService.getUserByMailOrId(payload.mail).catch((e)=>{
      this.logger.error(e)
      return null
    })
    if(!user){
      throw new UnauthorizedException()
    }
    return payload;
  }
}