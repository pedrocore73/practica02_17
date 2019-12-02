import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  avatars = [
    'assets/avatar-1.svg',
    'assets/avatar-2.svg',
    'assets/avatar-3.svg',
    'assets/avatar-4.svg',
    'assets/avatar-5.svg',
    'assets/avatar-6.svg',
  ]

  @ViewChild('panel', {static: false}) panelRef: ElementRef;
  @ViewChildren('avatarRef') avatarsRef: QueryList<ElementRef>;
  elementosAvatarsRef = [];
  avatar: string;
  nombre: string;
  start = false;
  mensaje: string;

  constructor(private router: Router) { }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    this.avatarsRef.forEach(elem => {
      this.elementosAvatarsRef.push(elem);
    })
  }

  showAvatars() {
    this.panelRef.nativeElement.classList.add('open');
    this.start = true;
  }

  setAvatar(i) {
    this.elementosAvatarsRef.forEach(elem => {
      elem.nativeElement.classList.remove('selected');
    });
    this.elementosAvatarsRef[i].nativeElement.classList.add('selected');
    this.avatar = this.avatars[i];
    localStorage.setItem('avatar', this.avatar);
  }

  startChat() {
    if(this.avatar === undefined || this.nombre === undefined) {
      this.mensaje  = 'Debe seleccionar un avatar y escribir un nombre';
    } else {
      localStorage.setItem('nombre', this.nombre);
      this.router.navigate(['/chat']);
    }
  }

}
