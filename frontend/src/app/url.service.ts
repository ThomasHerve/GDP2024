import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { webSocket } from "rxjs/webSocket";
import { AsymetricUnityTemplateComponent } from './asymetric-unity-template/asymetric-unity-template.component';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  url:string = "https://gdp2024-instance.multiplayertournamentonline.fr/"

  private socket: WebSocket;

  listener: Array<l> = []

  constructor(private http: HttpClient) { 
    this.socket = new WebSocket('wss://gdp2024-instance.multiplayertournamentonline.fr');

    this.socket.onmessage = (event) => {
      let message = event.data; // Message reçu sous forme de string
      // Faites quelque chose avec le message, par exemple, émettez-le via un BehaviorSubject
      this.listener.forEach((x: l) => x.f(message, x.o))
    };
   
  }

  public publish(id: string |undefined, value: string|undefined) {
    //return this.http.post(this.url+id+"/publish", {message: value})
    return this.http.post(this.url+"publish", {message: value})
  }

  public subscribe(fun: Function, obj: any) {
    let ll = new l();
    ll.f = fun
    ll.o = obj
    this.listener.push(ll);
  }
}

class l {
  public f!: Function;
  public o: AsymetricUnityTemplateComponent | undefined
}