import FormComponent from "@/app/_Components/FormComponent";
import SessionComponent from "@/app/_Components/SessionComponent";
import { auth } from "@/app/lib/auth";


export default async function AddProductPage() {
  const session = await auth();
    if (!session) {return <SessionComponent/>}
  return (
    <div className="p-4 flex flex-col gap-2 justify-center items-center">
      <p>Add Product Page</p>
      <FormComponent />
    </div>
  );
}
