// St Mary's schedule supplied by the user on 10 October 2026.
export type ParishMass={id:string;group:string;time:string;label:string;venue:string;weekday?:number;week?:number};
const main='Main Church, Level 1';
const hall='St Clare Hall, Level B1';
export const stMaryMasses:ParishMass[]=[
 ...[['07:00','7am · English · Morning Prayer (Lauds)'],['12:15','12.15pm · English'],['18:30','6.30pm · English']].map(([time,label])=>({id:`weekday-${time}`,group:'Weekdays',time,label,venue:main})),
 ...[['16:00','4pm · English'],['18:00','6pm · English'],['19:45','7.45pm · Tamil']].map(([time,label])=>({id:`saturday-${time}`,group:'Saturday',time,label,venue:main,weekday:6})),
 ...[['07:15','7.15am · Mandarin'],['09:00','9am · English'],['11:00','11am · English'],['13:00','1pm · English'],['17:00','5pm · English'],['19:00','7pm · English']].map(([time,label])=>({id:`sunday-${time}`,group:'Sunday',time,label,venue:main,weekday:0})),
 {id:'sinhala',group:'Other Sunday Masses',time:'11:30',label:'11.30am · Sinhala',venue:hall,weekday:0},
 {id:'malayalam',group:'Monthly Masses',time:'19:00',label:'7pm · Syro-Malabar Malayalam Qurbana · 3rd Saturday',venue:hall,weekday:6,week:3},
 {id:'indonesian',group:'Monthly Masses',time:'14:00',label:'2pm · Indonesian · 4th Sunday',venue:hall,weekday:0,week:4},
 {id:'deaf',group:'Other Sunday Masses',time:'16:00',label:'4pm · Deaf Community',venue:'Check the latest venue with SFS Signlight',weekday:0},
 ...[['08:00','8am · English'],['18:30','6.30pm · English']].map(([time,label])=>({id:`holiday-${time}`,group:'Public holidays (unless a Church Solemnity)',time,label,venue:main})),
];
export function massesForDate(date:string){if(!date)return stMaryMasses;const day=new Date(`${date}T12:00:00`);const weekday=day.getDay();const week=Math.ceil(day.getDate()/7);return stMaryMasses.filter(m=>m.id.startsWith('holiday-')|| (m.weekday===undefined?weekday>0&&weekday<6:m.weekday===weekday&&(!m.week||m.week===week)));}
