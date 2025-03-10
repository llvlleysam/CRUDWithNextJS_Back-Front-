import CardProduct from "@/app/_Components/CardProduct";
import SearchInput from "@/app/_Components/SearchInput";
import SessionComponent from "@/app/_Components/SessionComponent";
import { auth } from "@/app/lib/auth";
import dbConnect from "@/db/db-connect";
import ProductModelDB, { ProductModel } from "@/Models/Product";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products page",
};

export default async function ProductsPage({ searchParams }: { searchParams: { q?: string; available?: string } }) {
  const session = await auth();
  if (!session) {return <SessionComponent/>}
	// دریافت تکی محصول نکته !!!!!!!! چون کامپوننت سرور ساید هست میتونیم مستقیم به دیتا بیس درخواست بزنیم و نیاز به فنچ نیست
  await dbConnect();
	// مقادیر مربوط به سرچ که نکست در قالب یک پراپس در خدممتون میذاره
  const { q, available } = await searchParams;
	// مقادیر مربوط به سرچ
  const query = q || "";
	// مقادیر مربوط به دکمه
  const availableValue = available ? { available: true } : {};
	// دریافت همه محصولات و فیلتر کردن با توجه به نام
  const allProducts = await ProductModelDB.find({
    name: { $regex: query, $options: "i" },
    ...availableValue,
  });
	// تبدیل به ارایه
  const pars: ProductModel[] = JSON.parse(JSON.stringify(allProducts));

  return (
    <div className="p-4">
      <h1 className="mb-2">Products page</h1>
      <SearchInput />
      <div className="grid grid-cols-4 gap-2">
        {pars.length > 0 ? (
          pars.map((product) => <CardProduct key={product._id} product={product} />)
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
}
