import { Component } from '@angular/core';

@Component({
  selector: 'div#main',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'demo';
  isTrue = false;
  width=100
  ngOnInit(): void {
    // setTimeout(() => {
    //   this.isTrue = true;
    // }, 100);
    setInterval(() => {
      this.isTrue = !this.isTrue;
    }, 10000);
    // setInterval(() => {
    //   this.title += '1';
    // }, 2000);
    setInterval(() => {
      this.width++
    },500)
  }
  testClick(e){
    console.log('点击成功',e);
    
  }
}
