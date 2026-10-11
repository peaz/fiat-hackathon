import {useState} from 'react';
import {PixelButton} from './ui/PixelButton';

type PollQuestion={prompt:string;options:string[]};
type DraftQuestion=PollQuestion&{id:string};
export type ParishPoll={id:string;title:string;questions:PollQuestion[];audience:'Parish'|'Mass';parish:string;mass:string};
export const samplePoll:ParishPoll={id:'welcome-poll',title:'Help us welcome neighbours',questions:[{prompt:'What would help you feel more connected after Mass?',options:['A short coffee gathering','A small service activity','A place to meet other parishioners']}],audience:'Parish',parish:'Church of St Mary of the Angels',mass:''};
const newQuestion=():DraftQuestion=>({id:crypto.randomUUID(),prompt:'',options:['','']});

export function ParishPollStudio({parish,polls,onPublish,responses}:{parish:string;polls:ParishPoll[];onPublish:(poll:ParishPoll)=>void;responses:Record<string,string[]>}){
 const [title,setTitle]=useState('Help us welcome neighbours');
 const [questions,setQuestions]=useState<DraftQuestion[]>([{id:'first',...samplePoll.questions[0]}]);
 const [audience,setAudience]=useState<'Parish'|'Mass'>('Parish');
 const [mass,setMass]=useState('Saturday evening Mass');
 const [published,setPublished]=useState('');
 function updateQuestion(id:string,update:(question:DraftQuestion)=>DraftQuestion){setQuestions(items=>items.map(question=>question.id===id?update(question):question));}
 function publish(event:React.FormEvent){
  event.preventDefault();
  const cleaned=questions.map(({prompt,options})=>({prompt:prompt.trim(),options:options.map(option=>option.trim()).filter(Boolean)}));
  if(!title.trim()||!cleaned.length||cleaned.some(question=>!question.prompt||question.options.length<2||new Set(question.options.map(option=>option.toLowerCase())).size!==question.options.length)||audience==='Mass'&&!mass.trim())return;
  onPublish({id:crypto.randomUUID(),title:title.trim(),questions:cleaned,audience,parish,mass:audience==='Mass'?mass.trim():''});
  setPublished(title.trim());setTitle('');setQuestions([newQuestion()]);
 }
 return <section className="parish-polls"><h3>Ask your community</h3><p>Create a short survey for everyone in {parish} or a specific Mass. Responses here are example data in this browser session.</p><form onSubmit={publish}>
  <label>Survey title<input required maxLength={80} value={title} onChange={event=>setTitle(event.target.value)}/></label>
  <fieldset><legend>Who should see it?</legend><label className="poll-audience-choice"><input type="radio" name="poll-audience" checked={audience==='Mass'} onChange={()=>setAudience('Mass')}/><span>A Mass</span></label><label className="poll-audience-choice"><input type="radio" name="poll-audience" checked={audience==='Parish'} onChange={()=>setAudience('Parish')}/><span>Everyone</span></label></fieldset>
  {audience==='Mass'&&<label>Mass or congregation<input required maxLength={80} value={mass} onChange={event=>setMass(event.target.value)} placeholder="e.g. Saturday evening Mass"/></label>}
  {questions.map((question,index)=><section className="poll-question-editor" key={question.id}><div className="poll-question-heading"><h4>Question {index+1}</h4>{questions.length>1&&<button type="button" className="poll-remove-button" aria-label={`Remove question ${index+1}`} title="Remove question" onClick={()=>setQuestions(items=>items.filter(item=>item.id!==question.id))}>×</button>}</div><label>Question<input required maxLength={180} value={question.prompt} onChange={event=>updateQuestion(question.id,item=>({...item,prompt:event.target.value}))}/></label>{question.options.map((option,optionIndex)=><div className="poll-option-editor" key={optionIndex}><label>Choice {optionIndex+1}<input required maxLength={100} value={option} onChange={event=>updateQuestion(question.id,item=>({...item,options:item.options.map((value,i)=>i===optionIndex?event.target.value:value)}))}/></label>{question.options.length>2&&<button type="button" className="poll-remove-button" aria-label={`Remove choice ${optionIndex+1} from question ${index+1}`} title="Remove choice" onClick={()=>updateQuestion(question.id,item=>({...item,options:item.options.filter((_,i)=>i!==optionIndex)}))}>×</button>}</div>)}{question.options.length<6&&<button type="button" className="poll-edit-button poll-add" onClick={()=>updateQuestion(question.id,item=>({...item,options:[...item.options,'']}))}>+ Add choice</button>}</section>)}
  {questions.length<5&&<button type="button" className="poll-edit-button poll-add" onClick={()=>setQuestions(items=>[...items,newQuestion()])}>+ Add question</button>}
  <PixelButton type="submit">Post survey</PixelButton>
 </form>{published&&<p role="status">“{published}” is ready in Today’s scroll.</p>}<h4>Surveys and insights</h4>{polls.filter(poll=>poll.parish===parish).map(poll=><article className="poll-insight" key={poll.id}><strong>{poll.title}</strong><small>{poll.audience==='Mass'?poll.mass:poll.parish}</small>{poll.questions.map((question,index)=><div key={index}><p><strong>Question {index+1}.</strong> {question.prompt}</p><ul>{question.options.map(option=><li key={option}>{option} · {responses[poll.id]?.[index]===option?1:0} demo response{responses[poll.id]?.[index]===option?'':'s'}</li>)}</ul></div>)}</article>)}</section>;
}

export function PollAnswer({poll,answers,onAnswer}:{poll:ParishPoll;answers?:string[];onAnswer:(answers:string[])=>void}){
 const [selected,setSelected]=useState<string[]>([]);
 return <section className="poll-answer"><p className="eyebrow">Community survey · 1 loaf</p><h3>{poll.title}</h3><p className="poll-audience">{poll.audience==='Mass'?poll.mass:poll.parish}</p>{answers?<p role="status">✓ Thank you for sharing your views. +1 loaf.</p>:<form onSubmit={event=>{event.preventDefault();if(poll.questions.every((_,index)=>selected[index]))onAnswer(selected);}}>{poll.questions.map((question,index)=><fieldset key={index}><legend>{poll.questions.length>1?`Question ${index+1} of ${poll.questions.length} · `:''}{question.prompt}</legend>{question.options.map(option=><label className="poll-choice" key={option}><input type="radio" name={`answer-${poll.id}-${index}`} required checked={selected[index]===option} onChange={()=>setSelected(items=>{const next=[...items];next[index]=option;return next;})}/><span>{option}</span></label>)}</fieldset>)}<PixelButton type="submit" disabled={!poll.questions.every((_,index)=>selected[index])}>Answer survey</PixelButton></form>}</section>;
}
