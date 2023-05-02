import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { Strategy , ExtractJwt } from "passport-jwt";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    ){
    constructor(private authService: AuthService){
        super({ 
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "the way we do things",

        })
        
    }
    async validate(payload: any, req:Request) {
        
        const user = await this.authService.findOne(payload.email);
        if (!user) {
          throw new UnauthorizedException();
        }
        req.user = user
        return req.user;
      }

}

function InjectRepository(User: any): (target: typeof JwtStrategy, propertyKey: undefined, parameterIndex: 0) => void {
    throw new Error("Function not implemented.");
}
