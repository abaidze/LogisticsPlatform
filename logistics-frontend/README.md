# 🚚 LogistiX — Transport & Logistics Platform

თანამედროვე სატრანსპორტო და ლოგისტიკური ვებ-პლატფორმა, რომელიც აკავშირებს მძღოლებსა და მგზავრებს ერთ სივრცეში. პროექტი აწყობილია უახლესი ინდუსტრიული სტანდარტებითა და მჭიდრო რეაქტიული არქიტექტურით.

## 🛠️ Tech Stack (ტექნოლოგიური სტეკი)
* **Frontend:** Next.js (App Router), React, TypeScript, Tailwind CSS v4, Zustand.
* **Backend:** .NET Web API, C#, Entity Framework Core.
* **Database:** PostgreSQL.
* **Resilience & QA:** React ErrorBoundary, Debounced search, Responsive CSS Media/Grid layouts.

---
<<<<<<< Updated upstream
=======
## ✨ ძირითადი ფუნქციონალი

- **მონაცემთა მართვა (CRUD & State):** დინამიური დაკავშირება `.NET` ბექენდთან და PostgreSQL ბაზასთან, შეკვეთებისა და მარშრუტების რეალურ დროში მართვა.
- **ძიება და ფილტრაცია:** ოპტიმიზებული ცოცხალი ძიება `useDebounce` ჰუკით და მემოიზებული ფილტრაცია `useMemo`-ით.
- **მოდალური ფანჯრები და ვალიდაცია:** ინტერაქტიული მოდალები და მკაცრი ფორმის ვალიდაცია უსაფრთხო შეყვანისთვის.
- **მდგრადობა (Resilience):** `ErrorBoundary` მექანიზმი თეთრი ეკრანის წინააღმდეგ, Double-Click ბლოკირება ღილაკებზე და საიმედო შეცდომების მართვა.
- **Responsive დიზაინი:** Mobile-First მიდგომა, Tailwind CSS ბადეები და ადაპტირებული ინტერფეისი მობილური (375px), პლანშეტისა და დესკტოპისთვის (1440px).

---
## 🗂️ პროექტის არქიტექტურა

```text
src/
├── app/            # Next.js App Router გვერდები და მარშრუტები
├── components/     # ხელახლა გამოყენებადი UI კომპონენტები (Buttons, Modals, Inputs)
├── hooks/          # Custom ჰუკები (useDebounce და სხვ.)
>>>>>>> Stashed changes

## 🚀 Local Run Instructions (როგორ გავუშვათ ადგილობრივად)

### 1. ბექენდის გაშვება (.NET API)
გახსენით ტერმინალი, გადადით ბექენდის ფოლდერში და გაუშვით:
dotnet run
(სერვერი სტანდარტულად გაეშვება https://localhost:7123-ზე)

### 2. ფრონტენდის გაშვება (Next.js)
გახსენით მეორე ტერმინალი, გადადით პროექტის მთავარ საქაღალდეში და გაუშვით:
cd "logistics-frontend"
npm install
npm run dev
(აპლიკაცია ხელმისაწვდომი იქნება http://localhost:3000-ზე)

---

## 🐞 QA Debugging Journal (ბაგების მოგვარების ჟურნალი)

### Bug 1: PostgreSQL Timestamp with Time Zone Mismatch
1. **Symptom (სიმპტომი):** ბექენდში რეისის შექმნისას პოსტგრესის ბაზა აგდებდა 400 Bad Request / 500 შეცდომას თარიღის ფორმატთან დაკავშირებით.
2. **Hypothesis (ჰიპოთეზა):** .NET აპი ელოდებოდა ზუსტ UTC ტიპის თარიღს, მაგრამ ფრონტენდიდან იგზავნებოდა ლოკალური დროის სტრიქონი დროის ზონის გარეშე.
3. **DevTools (დეველოპერის ინსტრუმენტები):** გამოყენებულ იქნა Browser Network Tab (Payload ანალიზი) და .NET Kestrel კონსოლის ლოგები.
4. **Root Cause (ძირითადი მიზეზი):** PostgreSQL `timestamp with time zone` ტიპი მკაცრად მოითხოვს UTC მითითებას DateTime ობიექტში.
5. **Fix (გადაწყვეტა):** C# DTO-ს მიღებისას დავამატეთ: `DateTime.SpecifyKind(dto.Date, DateTimeKind.Utc)`.
6. **Prevention (პრევენცია):** მომავალში შემომავალი DTO თარიღების გლობალური ვალიდაცია ModelBinder-ის დონეზე.

### Bug 2: EF Core Circular Reference Serialization Crash
1. **Symptom (სიმპტომი):** მარშრუტების წამოღებისას (`GET /api/Routes`) სერვერი აგდებდა JSON სერიალიზაციის კრიტიკულ შეცდომას (Infinite Loop).
2. **Hypothesis (ჰიპოთეზა):** Entity Framework-ის ნავიგაციის ფროფერთის (მაგ. Route ➔ User ➔ Routes) ციკლური კავშირი იწვევდა ჩახლართვას და მეხსიერების გადავსებას.
3. **DevTools (დეველოპერის ინსტრუმენტები):** გამოყენებულ იქნა Visual Studio Output Window / .NET Exception Stack Trace.
4. **Root Cause (ძირითადი მიზეზი):** მძღოლთან მიბმული `User` ობიექტი თავის მხრივ აბრუნებდა ყველა სხვა მარშრუტსაც, რამაც გამოიწვია უსასრულო წრე.
5. **Fix (გადაწყვეტა):** კონტროლერში მონაცემების დაბრუნებისას გამოვიყენეთ სუფთა ანონიმური ობიექტები (Anonymous Objects), სადაც ვარჩევთ მხოლოდ საჭირო ველებს.
6. **Prevention (პრევენცია):** ყოველთვის გამოვიყენოთ Response DTO-ები პირდაპირი ბაზის მოდელების დაბრუნების ნაცვლად.