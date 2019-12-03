import { Component, OnInit } from '@angular/core';
import { ChatService } from '../servicios/chat.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  chatForm: FormGroup;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatForm = new FormGroup({
      texto: new FormControl('')
    })
    this.chatService.mensajes
              .subscribe(data =>{
                console.log(data);
              });          
  }

  sendTexto() {
    let mensaje = {
      texto: this.chatForm.get('texto').value
    }
    this.chatService.sendMensaje(mensaje);
  }

}
