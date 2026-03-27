const stats = [
  { value: "15+", label: "Años de Experiencia" },
  { value: "8K+", label: "Clientes Satisfechos" },
  { value: "8", label: "Tratamientos Exclusivos" },
  { value: "4", label: "Terapeutas Expertos" },
];

export default function StatsSection() {
  return (
    <section className="bg-[#1A1A1A] py-14">
      <div className="container-spa">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="text-center relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:h-10 after:w-px after:bg-white/10 last:after:hidden"
            >
              <p className="font-playfair text-4xl font-bold text-[#C4956A] mb-2">{stat.value}</p>
              <p className="text-sm text-white/60 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
