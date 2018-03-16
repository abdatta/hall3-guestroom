export interface BookingData {
	name: string;
	email: string;
	roll: string;
	phone: string;
	visit: string;
	addr: string;
	rooms: number;
	from: Date;
	to: Date;
	guests: guestDetail[];
}

interface guestDetail {
	name: string;
	age: string;
	sex: string;
	rel: string;
}
