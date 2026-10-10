import {useEffect,useRef,useId} from 'react';
const appUrl='https://fiat-hackathon-iota.vercel.app/';
export function ShareQR({close}:{close:()=>void}){
 const ref=useRef<HTMLDialogElement>(null);const title=useId();
 useEffect(()=>{const trigger=document.activeElement as HTMLElement;ref.current?.showModal();return()=>trigger?.focus();},[]);
 return <dialog className="share-qr-overlay" ref={ref} aria-labelledby={title} onCancel={close}><button className="share-qr-close" aria-label="Close QR code" onClick={close}>×</button><h1 id={title}>Try it out!</h1><img src="/our-garden-qr.png" alt="Scan this QR code to open Our Garden"/><p>Scan with your phone and step into Our Garden.</p><a href={appUrl} target="_blank" rel="noreferrer">fiat-hackathon-iota.vercel.app ↗</a></dialog>;
}
