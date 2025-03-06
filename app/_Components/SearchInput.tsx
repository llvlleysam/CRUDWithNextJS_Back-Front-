"use client";

import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function SearchInput() {
  // مقادیر مربوط به جستجو از یوآرال میگیریم باهاش
  const searchParams = useSearchParams();
  // مقادیر مربوط به صفحه جاری
  const pathname = usePathname();
  // با این هوک مقادر سرچ را در یوآرال ثبت میکنیم URL
  const router = useRouter();
  // این یک آبجکت جاوااسکریپت است و برای ست کردن مقدار سرچ و دکمه موجود است
  const params = new URLSearchParams(searchParams.toString());
  // مقادیر مربوط به سرچ
  const [search, setSearch] = useState( params.get("q") ? params.get("q")?.toString() : "");
  // مقادیر مربوط به دکمه
  const [available, setAvailable] = useState(params.get("available") ? true : false);
  
  useEffect(() => {
    // اینجا دیبانس دستی نوشتم
    const delayDebounce = setTimeout(() => {
      // اگر سرچ خالی نبود
      if (search) {
        // به پارامتر ها اضافه میکنیم
        params.set("q", search);
        // اگر سرچ خالی بود
      } else {
        // پارامتر سرچ را حذف میکنیم
        params.delete("q");
      }
      // به صفحه جاری اضافه میکنیم
      router.push(`${pathname}?${params.toString()}`);
    }, 1000);
    // اگر دکمه موجود بود
    if (available) {
      // به پارامتر ها اضافه میکنیم
      params.set("available", "true");
    } else {
      // پارامتر دکمه را حذف میکنیم
      params.delete("available");
    }
            // دی بانس رو حذف میکنیم
    return () => clearTimeout(delayDebounce);
  }, [search, available]);

  return (
    <div className="flex gap-4">
      <input
        type="text"
        placeholder="Search..."
        className="w-1/2 border rounded-2xl p-2 mb-4 hover:bg-gray-200/50 cursor-pointer transition-all duration-300 ease-in-out"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <label className="flex gap-2 items-center justify-center cursor-pointer">
        Available :
        <input
          className="cursor-pointer"
          type="checkbox"
          checked={available}
          onChange={(e) => setAvailable(e.target.checked)}
        />
      </label>
    </div>
  );
}
