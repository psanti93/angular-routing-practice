import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // best practice to use when your component will never update with new parameters
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };

    // this will now update the object reactively with the values that are given for id and name
    // best practice to use when your routed component is being reoloaded multiple times with new parameters

    this.route.params
      .subscribe(
        (params: Params) =>{
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

}
