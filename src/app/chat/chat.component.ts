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
  usuarioConnect: string;
  showConnectUser = false;
  usuarioDisconnect: string;
  showDisconnectUser = false;

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    this.nombre = localStorage.getItem('nombre');
    this.chatForm = new FormGroup({
      texto: new FormControl('')
    })
    this.chatService.mensajes
              .subscribe(data =>{
                let dataJs = JSON.parse(data);
                if(dataJs.usuarioConnect) {
                  this.showConnectUser = true;
                  this.usuarioConnect = dataJs.usuarioConnect;
                  setTimeout(()=>{this.showConnectUser = false}, 3000);
                } else if (dataJs.usuarioDisconnect) {
                  this.showDisconnectUser = true;
                  this.usuarioDisconnect = dataJs.usuarioDisconnect;
                  setTimeout(()=>{this.showDisconnectUser = false}, 3000);
                } else {
                  this.mensajes.push(dataJs);
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
