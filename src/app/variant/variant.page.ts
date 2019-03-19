import { Component, OnInit } from '@angular/core';
import { VariantService } from '../services/variant.service';

@Component({
  selector: 'app-variant',
  templateUrl: './variant.page.html',
  styleUrls: ['./variant.page.scss'],
})
export class VariantPage implements OnInit {

  variants: [];

  constructor(
    private variantSrv: VariantService
  ) { }

  ngOnInit() {
    this.variantSrv.get()
        .subscribe((data: any) => {
          this.variants = data;
          // console.log(data)
        }, (err) => {
          console.log(err);
        }, () => {
          console.log('Variants Loaded');
        })
  }

}
