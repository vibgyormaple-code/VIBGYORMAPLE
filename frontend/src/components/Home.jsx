// Home.jsx
import About from "./About";
import Services from "./Services";
import Contact from "./Contact";

export default function Home() {
  return (
    <div>
      {/* Hero or Banner */}
      <section className="page-section">
        <h1>Welcome to Green Solutions</h1>
        <p>Innovating for a cleaner and greener planet.</p>
      </section>

      {/* Include All Pages */}
      <About />
      <Services />
      <Contact />
    </div>
  );
}
