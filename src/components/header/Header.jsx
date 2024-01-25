import Link from 'next/link';
import Toggle from '../toggle/Toggle';

export default function Header() {
  return (
    <>
      <header id="header" role="banner">
        <div className="left">
          <Link href="/login">LOG IN TO <em>@sudokuworld</em></Link>
        </div>
        <h1><Link href="/" className="logo">SUDOKU BLOG WORLD</Link><img src="/favicon.png"/></h1>
        <div className="right">
          <Link href="/join">JOIN</Link>
        </div>
        <Toggle />
      </header>
    </>
  
  );
}