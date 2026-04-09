const MapSection = () => (
  <section className="w-full h-[400px] relative">
    <iframe
      title="Clinic Location"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9567406950!2d72.508565!3d23.011867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e9b278e000001%3A0x673db631165e3b!2sPrahlad+Nagar%2C+Ahmedabad%2C+Gujarat!5e0!3m2!1sen!2sin!4v1234567890"
      className="absolute inset-0 w-full h-full border-0"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  </section>
);

export default MapSection;
