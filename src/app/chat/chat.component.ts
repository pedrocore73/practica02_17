import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  nombre: string;
  @ViewChild('panel', {static: false}) panelRef: ElementRef;
  usuarios = [];

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre');
    this.chatForm = new FormGroup({
      texto: new FormControl('')
    })
    this.chatService.mensajes
              .subscribe(data =>{
                if((JSON.parse(data))[0].id) {
                  this.usuarios = JSON.parse(data);
                } else {
                  this.mensajes.push(JSON.parse(data));
                }
              });          
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.panelRef.nativeElement.scrollTop = this.panelRef.nativeElement.scrollHeight;
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
