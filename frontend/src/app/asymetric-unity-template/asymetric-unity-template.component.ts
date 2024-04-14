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
  clicked: boolean = false

  image_map: Map<string, string> = new Map<string, string>([
    ["0", "Cadre_Foreuse.png"],
    ["1", "Cadre_Mini.png"],
    ["2", "Cadre_Jetpack.png"],
    ["3", "Cadre_WallJump.png"],
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

  }


  click(value: string) {
    if(!this.isEmpty) {
        //document.getElementById("3")!.style.backgroundColor = "grey"
        document.getElementById("0")!.style.filter = "grayscale(100%)"
        document.getElementById("1")!.style.filter = "grayscale(100%)"
        document.getElementById("2")!.style.filter = "grayscale(100%)"
       // document.getElementById("3")!.style.filter = "grayscale(100%)"
        document.getElementById("0")!.style.cursor = "not-allowed"
        document.getElementById("1")!.style.cursor = "not-allowed"
        document.getElementById("2")!.style.cursor = "not-allowed"
        //document.getElementById("3")!.style.cursor = "not-allowed"

        document.getElementById(value)!.style.removeProperty("filter")
        document.getElementById(value)!.style.filter = "sepia(100%);"

        this.urlService.publish(this.variable, value).subscribe((x)=>console.log)  
        this.clicked = true;
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
       //o.image3 = o.image_map.get(m[3]) ||"";
       //document.getElementById("3")!.style.backgroundColor = "#1a237e"
       document.getElementById("0")!.style.removeProperty("filter")
       document.getElementById("1")!.style.removeProperty("filter")
       document.getElementById("2")!.style.removeProperty("filter")
       //document.getElementById("3")!.style.removeProperty("filter")
       //document.getElementById("3")!.style.border ="10px solid #3949ab"
       document.getElementById("0")!.style.removeProperty("cursor")
       document.getElementById("1")!.style.removeProperty("cursor")
       document.getElementById("2")!.style.removeProperty("cursor")
       //document.getElementById("3")!.style.removeProperty("cursor")
       if(!o.isEmpty) {
        o.clicked = false;
       }
       o.isEmpty = false;
     }
     
     

  }


}
