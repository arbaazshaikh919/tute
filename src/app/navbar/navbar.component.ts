import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { PasswordValidation } from '../password.validation';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

 loginForm: FormGroup;
 registerForm: FormGroup;
  submitted = false;
  rsubmitted = false;
  closeResult: string;
  register = 
  {'IsEmailNotificationsEnabled': false,
  'NotificationRecipients': '',
  'OverrideSchoolNotification': false,
  'balance': 0,
  'confirmPassword': '1234',
  'contact': {'method': ''},
  'method': '',
  'county': '',
  'dateOfBirth': '06-07-2005',
  'displayName': 'amar',
  'email': '',
  'ethnicity': 'AOTH',
  'firstName': 'Amar',
  'gender': '1',
  'homePhone': '',
  'initialPassword': '1234',
  'isVAEnabled': false,
  'lastName': 'Singh',
  'mobilePhone': '',
  'network_Id': '2',
  'postCode': '',
  'primaryRole': 'Student',
  'school': '2',
  'streetAddress': '',
  'studentGroups': [],
  'studentSchool': {'id': '2'},
  'town': '',
  'user': {'role': {'selection': 'Student'}},
  'userName': 'amar.singh@tute.in',
  'year': '8'}


  constructor(private formBuilder: FormBuilder,private modalService: NgbModal,private _router:Router,private user: UserService) { 
    console.log(this.user.hideElement,this.user.hideElement0)
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password:['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      pwd: ['', Validators.required],
      cpwd: ['', Validators.required],
      email: ['', Validators.required],
      dob: ['', Validators.required],
      phone: ['', Validators.required]
    }, {
        validator: PasswordValidation.MatchPassword
      });
    }



  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    
    });
   
    let btn = document.getElementById("register-close") as HTMLButtonElement
    btn.click();
  }
  


  open1(content1) {
    this.modalService.open(content1, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    
    });
    let btn = document.getElementById("login-close") as HTMLButtonElement
    btn.click();

  }

  open2(content2) {
    this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
     
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    
    });
   

  }
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    console.log(this.loginForm.invalid);
    if (this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.value);

    this.user.login(this.loginForm.value)

      .subscribe((response) => {
        this.user.profile = response.response;
        console.log(this.user.profile);
        if (this.user.profile.code == 200) {

          console.log('Hi' +this.user.profile.model.firstName+'Welcome to Tute');
          alert('Hi'+' '+this.user.profile.model.firstName+' '+'!'+' '+'Welcome to Tute')
          let btn = document.getElementById("login-close") as HTMLButtonElement
          btn.click();

        } else if (this.user.profile.code == 201) {

          console.log('Wrong Login Credentails !');
          alert('Wrong Login Credentails !');
          // this.router.navigateByUrl('/login');
        }
      },
        err => {
          console.log('Wrong Login Credentails !', err);
          alert('Wrong Login Credentails !');
        }
      );

  }




  onRegister() {
    this.rsubmitted = true;
    // stop here if form is invalid
    console.log(this.registerForm.invalid);
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);

    this.register.firstName = this.registerForm.value.fname;
    this.register.lastName = this.registerForm.value.lname;
    this.register.email = this.registerForm.value.email;
    this.register.dateOfBirth = this.registerForm.value.dob;
    this.register.initialPassword = this.registerForm.value.pwd;
    this.register.confirmPassword = this.registerForm.value.cpwd; 
     this.register.mobilePhone = this.registerForm.value.phone;
     this.register.userName = this.registerForm.value.email;
     console.log(this.register);
    this.user.register(this.register)

      .subscribe((response) => {
        this.user.rprofile = response.response;
        console.log(this.user.rprofile);
        if (this.user.rprofile.code == 200) {

          alert('Register Successfully !');
         let btn = document.getElementById("register-close") as HTMLButtonElement
         btn.click();

        } else if (this.user.rprofile.code == 201) {

          alert('User already exists, try again');
          // this.router.navigateByUrl('/login');
        }
      },
        err => {
          console.log('Register Error', err);
          alert('User already exists, try again');
        }
      );






  }
  get f() { return this.loginForm.controls; }
  get r() { return this.registerForm.controls; }
 
}
