
export default async function WeatherChart() {
    await new Promise((resolve) => setTimeout(resolve, 2000))
  return (
    <div className="p-4 border w-[200px] h-[200px] bg-white/25">
      <h1>WeatherChart</h1>
    </div>
  )
}
