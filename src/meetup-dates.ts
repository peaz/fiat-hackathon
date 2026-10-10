export function singaporeToday(now=new Date()){
 const parts=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Singapore',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);
 const part=(type:string)=>parts.find(p=>p.type===type)!.value;
 return `${part('year')}-${part('month')}-${part('day')}`;
}
export function upcomingWeekends(today=singaporeToday()){
 const dates:string[]=[];const cursor=new Date(`${today}T12:00:00Z`);
 while(dates.length<12){cursor.setUTCDate(cursor.getUTCDate()+1);if([0,6].includes(cursor.getUTCDay()))dates.push(cursor.toISOString().slice(0,10));}
 return dates;
}
export function meetupDateLabel(date:string){return new Intl.DateTimeFormat('en-SG',{timeZone:'UTC',weekday:'short',day:'numeric',month:'short'}).format(new Date(`${date}T12:00:00Z`));}
