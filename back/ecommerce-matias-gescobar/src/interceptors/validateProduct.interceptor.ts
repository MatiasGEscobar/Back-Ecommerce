import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor, Req } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class validateProductInteceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const body = { ...request.body };
        const {name, description, price, stock, imgUrl} = body;
       

        if(!name || !description || !price || !stock || !imgUrl){
            throw new BadRequestException ("Faltan datos obligatorios. Por favor verifica el cuerpo de la solicitud.")
        }
       
        return next.handle();
    }
}