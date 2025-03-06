import ProductPageComponent from "@/app/_Components/ProductPageComponet"
import dbConnect from "@/db/db-connect"
import ProductModelDB, { ProductModel } from "@/Models/Product"

export default async function ProductPage({ params }:{ params: { productId: string } }) {
  // این یه پراپس هست که نکست در اختیار شما میذاره تا بتونید مقدار داینامیکی رو دریافت کنید
  const { productId } = await params
  // const res = await fetch(`http://localhost:4000/Products/${productId}`)
  // const product:ProductModel = await res.json()
    // دریافت تکی محصول نکته !!!!!!!! چون کامپوننت سرور ساید هست میتونیم مستقیم به دیتا بیس درخواست بزنیم و نیاز به فنچ نیست
  await dbConnect();
  // محصول به صورت تکی خوانده میشه و به کامپوننت نمایش تک محصول ارسال میشه
  const res = await ProductModelDB.findById(productId)
  const product = JSON.parse(JSON.stringify(res))

  return (
    <div className="p-4">
      <h1>Product page {productId}</h1>
      <ProductPageComponent product={product}/>
    </div>
  )
}
