import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UrlService } from '../url.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-asymetric-unity-template',
  templateUrl: './asymetric-unity-template.component.html',
  styleUrls: ['./asymetric-unity-template.component.css']
})
export class AsymetricUnityTemplateComponent implements OnInit {

  variable: string | undefined;
  cooldown: number = 5;
  currentCooldown: number = 5;

  image1: string = "";
  image2: string = "";
  image3: string = "";

  isEmpty: boolean = true;

  image_map: Map<string, string> = new Map<string, string>([
    ["0", "chat.jpg"],
    ["1", "chat 2.jpg"],
    ["2", "chat 3.jpg"],
    ["3", "chat 4.jpg"],
    ["4", "chat 5.jpg"],
    ["5", "chat 6.jpg"]
]);


  constructor(private route: ActivatedRoute, private urlService: UrlService) {
  }

  ngOnInit(): void {
    this.urlService.subscribe(this.getMsg, this);

    this.route.params.subscribe(params => {
      this.variable = params['variable'];
    });
    this.animation("0");
    this.animation("1");
    this.animation("2");
    this.animation("3");

    // Cooldown
    interval(100)
    .subscribe(() => {
      if(this.currentCooldown < this.cooldown) {
        this.currentCooldown += 0.1;
        if(this.currentCooldown > this.cooldown) {
          this.currentCooldown = this.cooldown;
          document.getElementById("0")!.style.backgroundColor = "#1a237e"
          document.getElementById("1")!.style.backgroundColor = "#1a237e"
          document.getElementById("2")!.style.backgroundColor = "#1a237e"
          document.getElementById("3")!.style.backgroundColor = "#1a237e"
          document.getElementById("0")!.style.filter = "grayscale(0%)"
          document.getElementById("1")!.style.filter = "grayscale(0%)"
          document.getElementById("2")!.style.filter = "grayscale(0%)"
          document.getElementById("3")!.style.filter = "grayscale(0%)"
        }
      }
    });

  }

  animation(value: string) {
    const animated = document.getElementById(value);

    animated!.addEventListener("animationend", (x) => {
      if(x.animationName == "anim") {
        animated?.classList.remove('anim');
      }
      else {
        animated?.classList.remove('loading');
      }
    });
  }

  click(value: string) {
    if(!this.isEmpty) {
      if(this.currentCooldown == this.cooldown) {
        this.currentCooldown = 0;
        document.getElementById("0")!.style.backgroundColor = "grey"
        document.getElementById("1")!.style.backgroundColor = "grey"
        document.getElementById("2")!.style.backgroundColor = "grey"
        document.getElementById("3")!.style.backgroundColor = "grey"
        document.getElementById("0")!.style.filter = "grayscale(100%)"
        document.getElementById("1")!.style.filter = "grayscale(100%)"
        document.getElementById("2")!.style.filter = "grayscale(100%)"
        document.getElementById("3")!.style.filter = "grayscale(100%)"
        const animated = document.getElementById(value);
        animated?.classList.add('anim');
        this.urlService.publish(this.variable, value).subscribe((x)=>console.log)  
  
        document.getElementById("0")!.classList.add('loading')
        document.getElementById("1")!.classList.add('loading')
        document.getElementById("2")!.classList.add('loading')
        document.getElementById("3")!.classList.add('loading')      
      }
    } else {
      this.urlService.publish(this.variable, "emoji-"+value).subscribe((x)=>console.log)  
    }
    
  }

  getMsg(message: string, o: AsymetricUnityTemplateComponent) {
     let m = message.split("-");
     if(m.length > 1 && m[0] == "unity") {
      console.log(m);
      console.log(o.image_map);
      console.log(o.image_map.get(m[1]));
       o.image1 = o.image_map.get(m[1]) ||"";
       o.image2 = o.image_map.get(m[2]) ||"";
       o.image3 = o.image_map.get(m[3]) ||"";
     }
     o.isEmpty = false;
  }


}
