import { ConfigService } from "@nestjs/config"
import { JwtModuleAsyncOptions } from "@nestjs/jwt"
import { JwtModuleOptions } from "@nestjs/jwt"
const getjwtModuleOptions= (config:ConfigService):JwtModuleOptions =>({
    secret: config.get("JWT_SECRET"),

    
    signOptions: {
        expiresIn: config.get("JWT_EXP", "1d")
    }
})
export const options = (): JwtModuleAsyncOptions=>({
    inject: [ConfigService],
    useFactory: (config:ConfigService)=> getjwtModuleOptions(config)
})