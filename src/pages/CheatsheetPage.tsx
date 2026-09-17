import React, { useState } from "react";
import {
  Search,
  Copy,
  Check,
  Code,
  Grid,
  Table,
  BookOpen,
  Sparkles
} from "lucide-react";
import { cheatsheetData, CheatsheetCategory } from "../data/cheatsheet";

export const CheatsheetPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"python" | "numpy" | "pandas">("python");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const currentCategoryData = cheatsheetData.find(c => c.id === activeCategory)!;

  // Filter sections and items based on search query
  const filteredSections = currentCategoryData.sections.map(sec => {
    const matchingItems = sec.items.filter(item => {
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(q) ||
        item.syntax.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q)
      );
    });
    return { ...sec, items: matchingItems };
  }).filter(sec => sec.items.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Referencia Rápida Esencial</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight m-0">
            Cheatsheet de Fundamentos DS
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sintaxis, patrones y trucos de memoria usados estrictamente en los ejercicios del laboratorio.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Buscar sintaxis (ej. isin, axis, dropna)..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 bg-white"
          />
        </div>
      </div>

      {/* Module Selector Tabs */}
      <div className="flex items-center space-x-2 border-b border-slate-200 pb-1">
        <button
          onClick={() => setActiveCategory("python")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all ${
            activeCategory === "python"
              ? "bg-amber-500 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Code className="w-4 h-4" />
          <span>Python para Datos</span>
        </button>

        <button
          onClick={() => setActiveCategory("numpy")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all ${
            activeCategory === "numpy"
              ? "bg-sky-500 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>NumPy</span>
        </button>

        <button
          onClick={() => setActiveCategory("pandas")}
          className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center space-x-2 transition-all ${
            activeCategory === "pandas"
              ? "bg-indigo-600 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Table className="w-4 h-4" />
          <span>pandas</span>
        </button>
      </div>

      {/* Cheatsheet Content Sections */}
      <div className="space-y-8">
        {filteredSections.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 text-slate-500">
            No se encontraron patrones de código para "{searchQuery}".
          </div>
        ) : (
          filteredSections.map((sec, secIdx) => (
            <div key={secIdx} className="space-y-4">
              <h2 className="text-xl font-bold text-slate-900 border-l-4 border-indigo-600 pl-3 m-0">
                {sec.title}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sec.items.map((item, itemIdx) => {
                  const copyKey = `${secIdx}-${itemIdx}`;
                  const isCopied = copiedIndex === copyKey;

                  return (
                    <div
                      key={itemIdx}
                      className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-900 m-0">{item.name}</h3>
                          <button
                            onClick={() => handleCopy(item.syntax, copyKey)}
                            className="text-xs text-slate-400 hover:text-indigo-600 flex items-center space-x-1 transition-colors p-1"
                            title="Copiar código"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-semibold">Copiado</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copiar</span>
                              </>
                            )}
                          </button>
                        </div>

                        <p className="text-xs text-slate-600 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Code Snippet Box */}
                      <div className="mt-3 bg-slate-900 rounded-xl p-3 text-xs font-mono text-emerald-400 overflow-x-auto border border-slate-800">
                        <pre className="whitespace-pre">{item.syntax}</pre>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
