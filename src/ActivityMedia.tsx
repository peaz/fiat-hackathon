import {useState} from 'react';
import {activityMedia} from './data/activity-media';
export function ActivityMedia({activityId}:{activityId:string}) {
 const items=activityMedia.filter(m=>m.activityIds.includes(activityId));
 const [playing,setPlaying]=useState<string|null>(null);
 const [failed,setFailed]=useState<string[]>([]);
 if(!items.length)return null;
 return <section className="activity-media"><h4>Discover the mission</h4><div className="media-tiles">{items.map(m=><article className={`media-tile media-${m.kind}`} key={m.id}>
 {m.kind==='poster'&&!failed.includes(m.id)?<a className="media-poster" href={m.url} target="_blank" rel="noreferrer"><img src={m.url} alt={m.title} loading="lazy" referrerPolicy="no-referrer" onError={()=>setFailed(v=>[...v,m.id])}/></a>:m.embedId?<button className="media-preview" onClick={()=>setPlaying(playing===m.id?null:m.id)} aria-label={`Load video: ${m.title}`} aria-expanded={playing===m.id}><span aria-hidden="true">▶</span><small>{playing===m.id?'Close player':'Watch the story'}</small></button>:<a className="media-preview" href={m.url} target="_blank" rel="noreferrer"><span aria-hidden="true">{m.kind==='guide'?'▤':'▶'}</span><small>{m.kind==='guide'?'Open the guide':'Explore videos'} ↗</small></a>}
 <div className="media-tile-copy"><span className="media-kind">{m.kind==='poster'?'Official poster':m.kind==='guide'?'Practical guide':'Publisher video'}</span><h5>{m.title}</h5><p>{m.context}</p>{failed.includes(m.id)&&<p>Poster unavailable here; open the publisher below.</p>}<a href={m.url} target="_blank" rel="noreferrer">{m.kind==='poster'?'View full poster':m.kind==='guide'?'Read the resource':'Watch on publisher site'} ↗</a><a className="media-source" href={m.sourceUrl} target="_blank" rel="noreferrer">Publisher context ↗</a></div>
 {m.embedId&&playing===m.id&&<div className="media-player"><iframe src={`https://www.youtube-nocookie.com/embed/${m.embedId}`} title={m.title} allow="fullscreen; picture-in-picture" allowFullScreen/><small>Loaded through YouTube · captions unverified. Use the publisher link if playback is unavailable.</small></div>}
 </article>)}</div></section>;
}
