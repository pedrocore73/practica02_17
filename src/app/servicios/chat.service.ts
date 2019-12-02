import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SocketsService } from './sockets.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  mensajes: Subject<any>;

  constructor(private socketsService: SocketsService) {
   
    this.mensajes = <Subject<any>>socketsService
                          .connect()
                          .pipe(
                            map((res:any)=>{
                              return res;
                            })
                          )
  }

  sendMensaje(msj) {
    this.mensajes.next(msj);
  }


}
