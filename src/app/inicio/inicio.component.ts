import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  showAvatars() {
    this.panelRef.nativeElement.classList.add('open');
  }

}
