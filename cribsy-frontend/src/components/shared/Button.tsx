// OWNER: Member 1 - Stanley. Reusable accessible button.
import type { ButtonHTMLAttributes, ReactNode } from 'react';
export default function Button({children,variant='primary',...props}:{children:ReactNode;variant?:'primary'|'secondary'|'outline'} & ButtonHTMLAttributes<HTMLButtonElement>){return <button className={`button button-${variant}`} {...props}>{children}</button>}