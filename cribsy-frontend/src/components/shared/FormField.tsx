// OWNER: Member 1 - Stanley. Reusable labelled form field.
import type { InputHTMLAttributes } from 'react';
export default function FormField({label,id,...props}:{label:string;id:string}&InputHTMLAttributes<HTMLInputElement>){return <label className="form-field" htmlFor={id}><span>{label}</span><input id={id} {...props}/></label>}