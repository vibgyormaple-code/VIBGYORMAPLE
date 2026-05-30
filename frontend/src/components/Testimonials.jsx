import React, { useState } from "react";
import { translations } from "../utils/translations";
import "./Testimonials.css";

const getTestimonialsData = (language) => {
  const isEnglish = language === 'en';
  
  return [
    {
      id: 1,
      rating: 5,
      quote: isEnglish 
        ? "Grasshawk completely transformed our backyard! We were worried about using chemicals around our kids and pets, but this eco-friendly solution gave us the lush green lawn we always wanted. The Canadian winter didn't stand a chance!"
        : "Grasshawk a complètement transformé notre jardin! Nous étions inquiets d'utiliser des produits chimiques autour de nos enfants et de nos animaux, mais cette solution écologique nous a donné la pelouse verte luxuriante que nous avons toujours voulue. L'hiver canadien n'a pas eu de chance!",
      name: "Sarah & Mike Johnson",
      location: "Calgary, AB",
      productUsed: "Grasshawk",
      photo: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: 2,
      rating: 5,
      quote: isEnglish
        ? "The mole trap is incredibly effective and safe. We love that it's eco-friendly and made in Canada. Highly recommend to anyone dealing with pesky moles!"
        : "Le piège à taupes est incroyablement efficace et sûr. Nous adorons qu'il soit écologique et fabriqué au Canada. Je le recommande vivement à tous ceux qui ont des problèmes avec les taupes!",
      name: "John & Emily Smith",
      location: "Toronto, ON",
      productUsed: isEnglish ? "Mole Trap" : "Piège à Taupes",
      photo: "https://randomuser.me/api/portraits/men/46.jpg",
    },
  ];
};

const Testimonials = ({ language = 'en' }) => {
  const t = translations[language] || translations.en;
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialsData = getTestimonialsData(language);

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { rating, quote, name, location, productUsed, photo } = testimonialsData[currentIndex];

  return (
    <section className="testimonials-section">
      <h1>{t.testimonials.title}</h1>
      <p className="subtitle">
        {t.testimonials.subtitle}
      </p>
      <div className="testimonial-card">
        <div className="quote-icon">“”</div>
        <div className="stars">
          {Array.from({ length: rating }).map((_, i) => (
            <span key={i} className="star">★</span>
          ))}
        </div>
        <p className="quote-text">{quote}</p>
        <div className="customer-info">
          <img src={photo} alt={name} className="customer-photo" />
          <div className="customer-details">
            <strong>{name}</strong>
            <span>{location}</span>
            <span className="product-used">{t.testimonials.used}: {productUsed}</span>
          </div>
        </div>
        <div className="carousel-controls">
          <button onClick={prevTestimonial} aria-label="Previous testimonial" className="carousel-btn">&#60;</button>
          <button onClick={nextTestimonial} aria-label="Next testimonial" className="carousel-btn">&#62;</button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
