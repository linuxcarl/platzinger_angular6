import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { User } from "../interfaces/user";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	operation:string = 'login';
	email:string = null;
	password:string = null;
	nick: string =  null;
	status: string =  null;
	name: string =  null;
	constructor(private auth: AuthenticationService, private userService:UserService, private router: Router) { }

	ngOnInit() {
	}
	login(){
		this.auth.loginWithEmail(this.email, this.password)
				 .then((data)=>{
				 	this.email='';
				 	this.password='';
				 	this.router.navigate(['home']);
				 }).catch((error)=>{
				 	alert('Ocurrio un error');
				 	console.log(error);
				 });
	}
	register(){
		this.auth.registerWithEmail(this.email, this.password)
				 .then((data)=>{
				 	const user = {
				 		uid: data.user.uid,
				 		email: this.email,
				 		nick: this.nick,
				 		status: this.status,
				 		name: this.name
				 	};
				 	this.userService.createUser(user).then((dat)=>{
					 	alert('registrado correctamente');
					 	console.log(dat);
				 	}).catch((error)=>{
					 	alert('Ocurrio un error');
					 	console.log(error);
					});
				 }).catch((error)=>{
				 	alert('Ocurrio un error');
				 	console.log(error);
				 });
	}
	facebookLogin(){
		return this.auth.loginWithFacebook().then((data)=> {
			alert('logeado correctamente con facebook');
			console.log(data);
		}).catch((error)=>{
			alert('Ocurrio un error al logiarse con facebook');
			console.log(error);
		});
	}

}
