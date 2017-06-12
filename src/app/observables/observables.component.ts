import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Http, Response } from '@angular/http';
import { RequestHeaders } from './jsonrequest';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';

import { ISWData } from './data-format';

@Component({
  selector: 'ngc-observables',
  templateUrl: './observables.component.html',
  styleUrls: ['./observables.component.css']
})

export class ObservablesComponent implements OnInit {
name: Observable<string>;
containter: Observable<ISWData>;

  constructor(http: Http) {
    this.name = http.get('http://swapi.co/api/people/' + this.randomNumber() + '/', RequestHeaders)
      .map((res: Response) => res.json())
      .do(thing => console.log(thing))
      .map((data: { name: string }) => data.name)
      .catch((err) => {
        console.error('handling error within poll1()', err);
        const fakeData = [{ name: 'no phones could be loaded' }];
        return Observable.of(fakeData);
      });
  }

  ngOnInit() {
  }

  randomNumber (){
    let ranNum : number = Math.floor(Math.random() * 11) + 1;
     return  ranNum.toString();
  }

}