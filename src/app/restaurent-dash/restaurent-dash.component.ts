import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurantData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
  restaurentModelObj :RestaurantData = new RestaurantData;
  allRestaurantData: any;
  showAdd!:boolean;
  showbtn!:boolean;


  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  //Now subscribing our data which is mapped via services
  addResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.postRestaurant(this.restaurentModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurant Records Added Successfuly");

      //Clear fill form data
      let ref = document.getElementById('clear');
      ref?.click();
      
      this.formValue.reset()
      this.getAllData(); //when you post any data

    },
    err=>{
      alert("Something went wrong")
    }
    )
  }

  //Get all Data
  getAllData(){
    this.api.getRestaurant().subscribe(res=>{
      this.allRestaurantData = res;
    })
  }

  //Delete records
  deleteResto(data:any){
    this.api.deleteRestaurant(data.id).subscribe(res=>{
      alert("Restaurant Records Deleted Successfuly")
      this.getAllData(); //Quick Refresh Data
    })
  }

  onEditResto(data:any){
    this.showAdd=false;
    this.showbtn=true;
    this.restaurentModelObj.id = data.id
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  updateResto(){
    this.restaurentModelObj.name = this.formValue.value.name;
    this.restaurentModelObj.email = this.formValue.value.email;
    this.restaurentModelObj.mobile = this.formValue.value.mobile;
    this.restaurentModelObj.address = this.formValue.value.address;
    this.restaurentModelObj.services = this.formValue.value.services;

    this.api.updateRestaurant(this.restaurentModelObj, this.restaurentModelObj.id).subscribe(res=>{
      alert("Restaurant Records Updated Successfuly!");
      let ref = document.getElementById('clear');
      ref?.click();
      
      this.formValue.reset()
      this.getAllData(); //when you post any data
    })
  }

}
