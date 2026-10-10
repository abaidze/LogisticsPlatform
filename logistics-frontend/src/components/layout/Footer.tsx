export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-bold mb-3">🚚 LogistiX</h3>
          <p className="text-sm">
            B2B და B2C ლოჯისტიკური პლატფორმა. მარშრუტების მარტივი ძებნა, დაჯავშნა და მართვა ერთ სივრცეში.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">სწრაფი ბმულები</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition">მთავარი</a></li>
            <li><a href="/routes" className="hover:text-white transition">მარშრუტების ძებნა</a></li>
            <li><a href="/login" className="hover:text-white transition">ავტორიზაცია</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-3">კონტაქტი</h4>
          <p className="text-sm mb-1">ელ.ფოსტა: support@logistix.ge</p>
          <p className="text-sm">ტელეფონი: +995 (32) 200 00 00</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 pt-6 border-t border-slate-800 text-center text-xs">
        © 2026 LogistiX. ყველა უფლება დაცულია.
      </div>
    </footer>
  );
};