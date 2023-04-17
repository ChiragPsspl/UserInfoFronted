import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ConfigService } from 'src/app/Service/config.service';


export interface UserInformation {
  SrNo: string;
  UserName: string;
  Address: string;
}

export interface UserElement {
  userName: string;
  //srNo: number;
  emailId: number;
  address: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent {

  lstUser : UserElement[] = [];
  displayedColumns: string[] = [ 'userName', 'emailId', 'address'];
  dataSource : any;
  isDisplayForm : boolean = false;
  isDisplayTable : boolean = true;
  registerForm: FormGroup;
  //fieldRequired: string = "This field is required"
  fieldRequired: string;
  constructor(private config: ConfigService, private router: Router){

  }

  ngOnInit(){
    this.GetAllUserInformation();
    this.CreateForm();
  }

  CreateForm() {
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.registerForm = new FormGroup(
      {'username': new FormControl(null,[Validators.required]),
      'email': new FormControl(null,[Validators.required, Validators.pattern(emailregex)]),
      'password': new FormControl(null, [Validators.required, this.checkPassword]),
      'address': new FormControl(null)
     }
    )
  }

  emaiErrors() {
    return this.registerForm.get('email')?.hasError('required') ? 'Email Address is required' :
      this.registerForm.get('email')?.hasError('pattern') ? 'Not a valid Email Address' :''
  }

  userNameErrors(){
    if (this.registerForm.get('username')?.hasError('required'))
      return 'User Name is required';
    else
      return '';

  }

  noWhitespaceValidator(){
    if(this.registerForm.get('username')?.value.trim().length <= 0)
    {
      return 'ABC';
    }
    else
    {
      return '';
    }
  }

  checkPassword(control: any) {
    let enteredPassword = control.value
    //let passwordCheck = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})/;
    let passwordCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}/;
    return (!passwordCheck.test(enteredPassword) && enteredPassword) ? { 'requirements': true } : null;
  }

  getErrorPassword() {
    debugger;
    return this.registerForm.get('password')!.hasError('required') ? 'This field is required (The password must be at least six characters, one uppercase letter and one number)' :
      this.registerForm.get('password')!.hasError('requirements') ? 'Password needs to be at least six characters, one uppercase letter and one number' : '';
  }

  checkValidation(input: any){
    const validation = this.registerForm.get(input)!.invalid && (this.registerForm.get(input)!.dirty || this.registerForm.get(input)!.touched)
    this.fieldRequired = `${input} is Required`;
    return validation;
  }
  
  

  GetAllUserInformation() {
    debugger;
    const methodName = "UserRegistration/GetAll";
    const methodType = "Get";

    this.config.GetData(methodName, methodType).
        subscribe((data)=> 
        {
           this.lstUser = data;
           this.isDisplayForm = false;
           this.isDisplayTable = true;
          console.log(this.lstUser?.length);
        }); 
  }

  CreateNew(){
    this.isDisplayForm = true;
    this.isDisplayTable = false;
  }

  onSubmit(formData: FormGroup) {

    if(!this.registerForm.valid)
      return;

    if(formData.value.username.trim().length <= 0){
      alert('Please Enter User Name');
      return;
    }
    const email = formData.value.email;
    const password = formData.value.password;
    const username = formData.value.username;
    const address = formData.value.address;


    const methodName = "UserRegistration/Register";
    const methodType = "Post";
    const userInfo =       
      {        
        "UserRegistrationId" : 0,
        "userName": username,
        "emailId": email,
        "password": password,
        "address": address
      };
    

    // Add into Database
    this.config.PostData(methodName, methodType,userInfo).
        subscribe((data)=> 
        {
          console.log('cp',data);
          
          this.router.navigate(['/', 'userlist']);
        }); 
  }

  ResetControl(){

  }
  
  ViewList(){
    this.router.navigate(['/', 'userlist']);
  }


}
