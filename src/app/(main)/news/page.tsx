import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { articles } from "@/lib/data/news";

export const metadata = {
  title: "Noticias — Ariday Spa",
  description: "Consejos de bienestar, cuidado de piel y noticias del equipo Ariday.",
};

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#1A1A1A] pt-14 pb-12">
        <div className="container-spa text-center">
          <p className="text-[#C4956A] text-xs tracking-[0.3em] uppercase font-medium mb-3">
            Consejos y Tendencias
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold text-white mb-3">
            Noticias y Blog
          </h1>
          <p className="text-white/60 text-sm max-w-md mx-auto">
            Sabiduría de bienestar, consejos de cuidado de piel y novedades de nuestro equipo experto.
          </p>
        </div>
      </div>

      <section className="section-padding bg-[#F8F5F0]">
        <div className="container-spa">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <article
                key={article.id}
                className="group bg-white border border-[#E2D9CF] hover:border-[#C4956A] overflow-hidden transition-all hover:shadow-md"
              >
                <div
                  className="h-52 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${article.image})` }}
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] bg-[#C4956A]/10 text-[#C4956A] px-2 py-1 uppercase tracking-wider font-medium">
                      {article.category}
                    </span>
                    <span className="flex items-center gap-1 text-[#9A9A9A] text-xs">
                      <Clock size={11} />
                      {article.readTime} min lectura
                    </span>
                  </div>
                  <h3 className="font-playfair text-lg font-semibold text-[#1A1A1A] mb-3 leading-snug group-hover:text-[#C4956A] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-[#6B6B6B] text-xs leading-relaxed mb-5">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-[#E2D9CF]">
                    <div>
                      <p className="text-xs font-medium text-[#1A1A1A]">{article.author}</p>
                      <p className="text-[10px] text-[#9A9A9A]">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="text-[#C4956A] group-hover:translate-x-1 transition-transform">
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
