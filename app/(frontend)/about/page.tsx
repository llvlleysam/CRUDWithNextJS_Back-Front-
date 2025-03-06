import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About page",
  
}

export default async function AboutPage() {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return (
    <div>
      <h1>About page</h1>
    </div>
  )
}
