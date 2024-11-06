import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class CreatorGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
       const req = context.switchToHttp().getRequest();

       if(!req.admin.is_creator){
        throw new ForbiddenException({
            message: "Bu superadmin emas."
        })
        }
        
        return true;
    }
}