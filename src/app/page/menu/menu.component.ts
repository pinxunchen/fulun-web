import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/form.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})


export class MenuComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private formService:FormService
  ) {}

  ngOnInit() {
    let duid = this.route.snapshot.queryParamMap.get('duid');
    console.log(duid);
    if(duid){
      if(duid!.length > 0){
        this.formService.DUID = duid! ;
      }
    }

  }

}
