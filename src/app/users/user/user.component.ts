import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramSubscription: Subscription

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    // best practice to use when your component will never update with new parameters
    this.user = {
      id: this.route.snapshot.params['id'],
      name: this.route.snapshot.params['name'],
    };

    // this will now update the object reactively with the values that are given for id and name
    // best practice to use when your routed component is being reoloaded multiple times with new parameters
    this.paramSubscription = this.route.params
      .subscribe(
        (params: Params) =>{
          this.user.id = params['id'];
          this.user.name = params['name'];
        }
      );
  }

  // In theory subscriptions will destroy your subscriptions after it's done being used, however it doesn't hurt do unsbscribe using the ngOnDestroy lifecycle

  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }

}
