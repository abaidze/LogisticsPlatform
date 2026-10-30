import Link from "next/link";
import { Button } from "../components/ui/Button";

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between mesh-bg animate-fade-in">
      {/* ჰერო სექცია */}
      <div className="max-w-5xl mx-auto px-4 py-24 text-center space-y-8 my-auto">

        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight">
          იმოგზაურე კომფორტულად, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-400">
            დაჯავშნე მარტივად
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
          LogistiX აკავშირებს მძღოლებსა და მგზავრებს ერთ სივრცეში. იპოვე სასურველი მიმართულება ან გამოაქვეყნე შენი რეისი წამებში.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Link href="/routes">
            <Button className="w-full sm:w-auto px-8 py-3 text-base bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all transform hover:-translate-y-0.5">
              🔍 მარშრუტების ძებნა
            </Button>
          </Link>
          <Link href="/driver/dashboard">
            <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-base glass-card text-white hover:bg-slate-800/80 transition-all transform hover:-translate-y-0.5">
              🚚 მძღოლის პანელი
            </Button>
          </Link>
        </div>
      </div>   
      </div>
  );
}