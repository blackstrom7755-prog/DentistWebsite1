const MapSection = () => (
  <section className="w-full h-[400px] relative">
    <iframe
      title="Clinic Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215571890366!2d-73.9878530843!3d40.7484405793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire+State+Building!5e0!3m2!1sen!2sus!4v1234567890"
      className="absolute inset-0 w-full h-full border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </section>
);

export default MapSection;
