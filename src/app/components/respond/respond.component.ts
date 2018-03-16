import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { BookingService } from '../../services/booking/booking.service';

@Component({
  selector: 'app-respond',
  templateUrl: './respond.component.html',
  styleUrls: ['./respond.component.css']
})
export class RespondComponent implements OnInit {

	accept: boolean;
	success: boolean = false;
	processing: boolean = true;

  constructor(private bookingService: BookingService,
  						private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe((params: Params) => {
  		this.route.queryParams.subscribe((query: Params) => {
  			this.accept = query['accept'] === 'true';
	  		this.bookingService.respond(params['id'], this.accept)
	        .subscribe((status: number) => {
	        	this.processing = false;
	        	if(status === 200)
	        		this.success = true;
	        });
      });
  	});  	
  }

}
