import {useId,useState} from 'react';
import {PixelButton} from './ui/PixelButton';
import {massesForDate} from './mass-times';
import {upcomingWeekends,meetupDateLabel} from './meetup-dates';
export function ParishMeetup({names}:{names:string[];parish:string}){
 const contentId=useId();const [open,setOpen]=useState(false);const [date,setDate]=useState('');const [massId,setMassId]=useState('');
 const [message,setMessage]=useState('Shall we meet after Mass and plan our activity together?');const [proposal,setProposal]=useState('');
 const dates=upcomingWeekends();const masses=date?massesForDate(date).filter(m=>!m.id.startsWith('holiday-')):[];
 const mass=masses.find(m=>m.id===massId);
 return <div className="parish-meetup"><PixelButton variant="secondary" aria-expanded={open} aria-controls={contentId} onClick={()=>setOpen(v=>!v)}>Meet after Mass <span aria-hidden="true">{open?' −':' +'}</span></PixelButton><div id={contentId} hidden={!open}><p>With {names.join(', ')}</p>{!proposal?<form onSubmit={e=>{e.preventDefault();if(!dates.includes(date)||!mass||!message.trim())return;setProposal(`${meetupDateLabel(date)} · After ${mass.label}`);}}>
 <label>Weekend date<select name="day" required value={date} onChange={e=>{setDate(e.target.value);setMassId('');}}><option value="">Choose a Saturday or Sunday</option>{dates.map(d=><option key={d} value={d}>{meetupDateLabel(d)}</option>)}</select></label>
 <label>Mass at St Mary’s<select name="mass" required disabled={!date} value={massId} onChange={e=>setMassId(e.target.value)}><option value="">Select your Mass</option>{masses.map(m=><option key={m.id} value={m.id}>{m.label}</option>)}</select></label>
 <label>Your message<textarea required rows={2} maxLength={500} value={message} onChange={e=>setMessage(e.target.value)}/></label><PixelButton type="submit" disabled={!date||!mass||!message.trim()}>Propose meetup</PixelButton></form>:<div className="meetup-proposal" role="status"><strong>Meetup proposed · awaiting replies</strong><p>{proposal}</p><p>{message}</p><button className="text-button" onClick={()=>setProposal('')}>Edit meetup</button></div>}</div></div>
}
