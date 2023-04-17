import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
 
import { ConfigService } from 'src/app/Service/config.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginForm!: FormGroup;
  UserName : string | undefined;
  private formSubmitAttempt: boolean;
  error : string;
  constructor(private config: ConfigService, private router: Router){

  }


  ngOnInit(){
    this.CreateForm();
  }

  CreateForm(){
    let emailregex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    this.loginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required, Validators.pattern(emailregex)]),
      'password': new FormControl(null)
    })
  }

  isFieldInvalid(field: string) {
    return (
      (!this.loginForm.get(field)?.valid && this.loginForm.get(field)?.touched) ||
      (this.loginForm.get(field)?.untouched && this.formSubmitAttempt)
    );
  }


  emaiErrors() {
    debugger;
    return this.loginForm.get('email')?.hasError('required') ? 'Please Enter User Name' :
      this.loginForm.get('email')?.hasError('pattern') ? 'Not a valid User Name' :''
  }
 

  onSubmit( formData: FormGroup){
    debugger;
    if (!this.loginForm.valid){
      alert('Please provide User Name Or Password');
      return;
    }
      

    const email = formData.value.email;

    if(email.trim() == ''){

    }
    const password = formData.value.password;
    //const methodName = "UserRegistration/VerifyUser?emailId=krunal%40gmail.com&password=123456";
    const methodName = "UserRegistration/VerifyUser?emailId="+email+"&password="+password;
    const methodType = "Get";
    const parameter = [
      {emailId : email },
      {password : password}
    ]
    this.config.GetLoginInformation(methodName, methodType).
        subscribe((data)=> 
        {
          debugger;
          console.log('cp',data);
          if(data.userName != null){
             this.UserName = data.userName;
            localStorage.setItem('token', data.token)
          
            this.router.navigate(['/', 'userlist']);
          }
          else {
            alert('Invalid User Name and Password !');
            this.ResetControl();
          }
        });       
  }

  ResetControl(){
    this.loginForm.reset();
  }
}
