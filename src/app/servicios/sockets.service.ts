import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketsService {

  url = environment.urlSockets;

  private socket;

  constructor() { }

  connect(): Subject<MessageEvent> {

    this.socket = io(this.url);
    let observable = new Observable(observer => {
      this.socket.on('mensaje', (data)=>{
        observer.next(data);
      })
      return () => {
        this.socket.disconnect();
      }
    })

    let observer = {
      next: (data) => {
        if(data.nombre) {
          this.socket.emit('start', JSON.stringify(data));
        } else {
          this.socket.emit('mensaje', JSON.stringify(data));
        }
      }
    }

    return Subject.create(observer, observable);
  }

}
