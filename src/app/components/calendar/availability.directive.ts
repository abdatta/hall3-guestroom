import { Directive, Input, OnChanges, ElementRef, Renderer2 } from '@angular/core';
import { DateAdapter } from '@angular/material';

@Directive({
  selector: '[appAvailability]'
})
export class AvailabilityDirective implements OnChanges {

	@Input('appAvailability') dates: Date[][];
	@Input('appColors') colors = ['red', 'orangered', 'orange', 'yellow'];
	style: any;
	text: any;

  constructor(private elRef: ElementRef,
  			  private renderer: Renderer2,
  			  private dateAdapter: DateAdapter<Date>) {
  	this.style = this.renderer.createElement('style');
  	this.text = this.renderer.createText('');
  	this.renderer.appendChild(this.style, this.text);
	this.renderer.appendChild(this.elRef.nativeElement, this.style);

  	this.dateAdapter.setLocale('en-IN');
  }

  ngOnChanges() {
		const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

		const temp = this.renderer.createText((this.dates)?this.dates.map((room, index) => room.map((date) => `
td.mat-calendar-body-cell[aria-label="${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}"] > div,
td.mat-calendar-body-cell[aria-label="${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}"]:hover > div {
    background-color: ${this.colors[index]} !important;
}`).join('\n')).join('\n'):'');

		this.renderer.removeChild(this.style, this.text);
		this.text = temp;
		this.renderer.appendChild(this.style, this.text);
  }

}
