import { Component, OnInit } from '@angular/core';
import { ChatService } from '../servicios/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatService.mensajes
              .subscribe(data =>{
                console.log(data);
              });
    this.chatService.sendMensaje('Estableciendo conexión')
  }

}
