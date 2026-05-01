import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <span className="navbar-brand">Rocky Campus App</span>
      <Link href="/">Home</Link>
      <Link href="/events">Events</Link>
      <Link href="/canteen">Canteen</Link>
      <Link href="/helpdesk">Helpdesk</Link>
      <Link href="/lostandfound">Lost &amp; Found</Link>
      <Link href="/recommend">Event Recommender</Link>
      <Link href="/settings">Settings</Link>
    </nav>
  );
}
