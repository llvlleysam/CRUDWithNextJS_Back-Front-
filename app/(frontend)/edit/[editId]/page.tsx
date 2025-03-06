import FormComponent from "@/app/_Components/FormComponent";
import dbConnect from "@/db/db-connect";
import ProductModelDB, { ProductModel } from "@/Models/Product";


export default async function EditIdPage({
  params,
}: {
  params: { editId: string };
}) {
  // این یه پراپس هست که نکست در اختیار شما میذاره تا بتونید مقدار داینامیکی رو دریافت کنید
  const { editId } = await params;
  // دریافت تکی محصول نکته !!!!!!!! چون کامپوننت سرور ساید هست میتونیم مستقیم به دیتا بیس درخواست بزنیم و نیاز به فنچ نیست
  await dbConnect();
  // محصول مورد نظر یبار از دیتا بیس خوانده شده و به کامپوننت فرم ارسال میشه تا فرم با مقادیر ور بشه و آماده ویرایش کردن
  const res = await ProductModelDB.findById(editId)
  const product = JSON.parse(JSON.stringify(res))
  return (
    <div>
      <p>Edit Product ID {editId}</p>
      <FormComponent editProduct={product} editMode={true} />
    </div>
  );
}
