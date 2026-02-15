/* eslint-disable prettier/prettier */
import { JwtPayload } from "src/modules/auth/interface/jwt-payload.interface";

declare global {
    namespace Express {
        interface Request {
            user?: JwtPayload;
        }
    }
}
