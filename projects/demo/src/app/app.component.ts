import { Component } from '@angular/core';

@Component({
  selector: 'div#main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo';
  isTrue = false;
  ngOnInit(): void {
    setTimeout(() => {
      this.isTrue = true;
    }, 100);
    setInterval(() => {
      this.title += '1';
    }, 2000);
  }
}
