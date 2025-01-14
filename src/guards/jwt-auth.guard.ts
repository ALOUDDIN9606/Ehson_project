import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        
        if(!authHeader){
            throw new UnauthorizedException({
                message: "Token berilmagan!"
            })
        }

        const bearer = authHeader.split(" ")[0]
        const token = authHeader.split(" ")[1]
        if(bearer !== "Bearer" || !token){
            throw new UnauthorizedException ({
                message: "Bearer va Token berilmagan"
            })
        }
        let payload: any;
        try {
            payload = this.jwtService.verify(token)
        } catch (error) {
            throw new UnauthorizedException({
                message: "Token verikatsiyadan utmagan",
                error
            });
        }

        req.user = payload;
        console.log(req);
        
        return true;
    }
}