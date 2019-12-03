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
  mensajes = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.chatForm = new FormGroup({
      texto: new FormControl('')
    })
    this.chatService.mensajes
              .subscribe(data =>{
                this.mensajes.push(JSON.parse(data));
              });          
  }

  sendTexto() {
    let mensaje = {
      nombre: localStorage.getItem('nombre'),
      avatar: localStorage.getItem('avatar'),
      texto: this.chatForm.get('texto').value
    }
    this.chatService.sendMensaje(mensaje);
    this.chatForm.reset();
  }

}
