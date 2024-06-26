import { createParamDecorator, ExecutionContext,  } from "@nestjs/common";

export const Cookie = createParamDecorator((key:string, ext: ExecutionContext)=>{
    const request = ext.switchToHttp().getRequest()

    return key ?? key in request.cookies ? request.cookies[key] :key ? null :request.cookies
})