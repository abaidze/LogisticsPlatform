export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] mesh-bg py-16 px-4 animate-fade-in flex items-center justify-center">
      <div className="max-w-4xl w-full glass-card rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl border border-slate-800">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">ჩვენ შესახებ — LogistiX 🚚</h1>
        
        <p className="text-slate-300 leading-relaxed text-lg">
          <strong>LogistiX</strong> არის თანამედროვე სატრანსპორტო და ლოგისტიკური პლატფორმა, რომელიც აკავშირებს მძღოლებსა და მგზავრებს ერთ სივრცეში. ჩვენი მიზანია მგზავრობის დაგეგმვა და ტვირთის/ადგილების გადატანა გავხადოთ მაქსიმალურად მარტივი, სწრაფი და უსაფრთხო.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-sm">
            <h3 className="font-bold text-blue-400 text-lg mb-2">⚡ სისწრაფე</h3>
            <p className="text-sm text-slate-400">მარშრუტების მყისიერი ძებნა და მარტივი დაჯავშნა რამდენიმე წამში.</p>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-sm">
            <h3 className="font-bold text-indigo-400 text-lg mb-2">🛡️ უსაფრთხოება</h3>
            <p className="text-sm text-slate-400">გადამოწმებული მძღოლები და სანდო რეისები მთელი ქვეყნის მასშტაბით.</p>
          </div>
          <div className="bg-slate-900/60 p-6 rounded-2xl border border-slate-800 shadow-sm">
            <h3 className="font-bold text-sky-400 text-lg mb-2">💡 კომფორტი</h3>
            <p className="text-sm text-slate-400">ინტუიციური და მოსახერხებელი პანელი როგორც მგზავრებისთვის, ისე მძღოლებისთვის.</p>
          </div>
        </div>
      </div>
    </div>
  );
}