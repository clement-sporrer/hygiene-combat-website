const ClientLogos = () => {
  // Placeholder logos - to be replaced with actual client logos
  const clients = [
    { name: "Fight Club Paris", id: 1 },
    { name: "MMA Factory", id: 2 },
    { name: "BJJ Academy", id: 3 },
    { name: "Grappling Center", id: 4 },
    { name: "Combat Zone", id: 5 },
    { name: "Muay Thai Pro", id: 6 },
    { name: "Cross Combat", id: 7 },
    { name: "Elite MMA", id: 8 },
  ];

  return (
    <section className="bg-brand-white py-12 border-y border-border overflow-hidden">
      <div className="container mx-auto">
        <p className="text-center text-sm text-muted-foreground mb-8 uppercase tracking-wider">
          Ils nous font confiance
        </p>
      </div>
      
      {/* Scrolling logos container */}
      <div className="relative">
        <div className="flex animate-scroll-logos">
          {/* Double the logos for seamless loop */}
          {[...clients, ...clients].map((client, index) => (
            <div
              key={`${client.id}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12"
            >
              <div className="w-32 h-16 bg-muted/50 rounded-lg flex items-center justify-center px-4">
                <span className="text-sm font-medium text-muted-foreground text-center">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-brand-white to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-brand-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default ClientLogos;
