import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  children: any;
  //children: React.ReactElement | (({ active }: { active: boolean }) => React.ReactElement);
  href: string;
  as?: string;
  className?: any;
}

//choon dar next13 <a> nemitoone child <Link> bashe in ravesh piyade nashod 
//va tebgh ravesh ghesmat ghabl (46) anjam shod

const ActiveLink = ({ children, ...props }: Props) => {
  const router = useRouter()

  const { asPath } = useRouter();

  const active = asPath === props.href || asPath === props.as;

  return <Link {...props} >
    {
      typeof children === 'function'
        ? children({ active })
        : children
    }
  </Link>
}

export default ActiveLink