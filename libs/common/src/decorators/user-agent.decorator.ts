import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const UserAgent = createParamDecorator((_:string, ctx: ExecutionContext)=>{
    const req:Request = ctx.switchToHttp().getRequest()
    return req.headers["user-agent"]
})