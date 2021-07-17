import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { take } from 'rxjs/operators';

export interface Notification {
  title: string;
  body?: string;
}


@Injectable({
  providedIn: 'root'
})


export class HttppostService {
  // tslint:disable-next-line:max-line-length
  private chaveDoServidor = 'key=AAAA060dvtI:APA91bGlOXHDQdcnjM-yDts8E5ssult8UIyGljzljGqJNZ-eb02JW5_zlPLQus-cT6-QTzEKHerLWze3zcwxS8P1fUNKCziIYWP2BYv-r4euFWngNxlAC-tTLquBlPvGIpOIJpF6ItPH';
  constructor(public http: Http) { }
  // ENVIA O PUSH
  enviaPush(notification: Notification) {
    const url = 'https://fcm.googleapis.com/fcm/send';
    const body = {
      notification: {
        ...notification,
        click_action: 'FLUTTER_NOTIFICATION_CLICK', // importante deixar
        icon: './src/app/assets/icone0.png'
      },
      data: {
        ...notification,
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
      to: '/topics/geral',
      priority: 'high' // precisa ser high
    };
    const headers: Headers = new Headers({
      'Content-Type': 'application/json',
      Authorization: this.chaveDoServidor
    });
    const options = new RequestOptions({ headers });

    this.http.post(url, body, options).subscribe(response => {
      console.log('push enviado');
    }, error => {
      console.log('erro ao enviar push');
    });
  }
}
