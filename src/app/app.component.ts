import { Component, OnInit } from '@angular/core';
import { ScrollToTopComponent } from './scroll-to-top.component';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [ScrollToTopComponent, RouterModule] 
})
export class AppComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
