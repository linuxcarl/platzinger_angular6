import { Component, OnInit } from '@angular/core';
import { User } from "../interfaces/user";
import { UserService } from "../services/user.service";
import { Router } from "@angular/router";
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	usuarios: User[];
	query: string;
	user: User;
	constructor(private userService: UserService,
		private authenticationService:AuthenticationService,
		private router: Router) {
		this.userService.getUsers()
			.valueChanges()
			.subscribe((data: User[])=>{
				this.usuarios=data;
			},(error)=>{
				console.log(error);
			});
		this.authenticationService.getStatus()
			.subscribe((st)=>{
				this.userService.getUserById(st.uid)
					.valueChanges()
					.subscribe((user:User)=>{
						this.user = user;
					},(e)=>{
						console.log(e);
					})
			},(e)=>{
				console.log(e);
			})
	}

  ngOnInit() {
  }
  logout(){
  	this.authenticationService.logOut()
	  	.then(() => {
	  		this.router.navigate(['login']);
	  	}).catch((error) => {
	  		console.log(error);
	  		alert('error en logOut');
	  	});
  }
}
