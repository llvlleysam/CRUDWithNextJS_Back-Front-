export default async function WeatherChart() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return (
    <div className="p-4 border rounded-xl flex flex-col items-center justify-center gap-2 bg-orange-600/50 animate-pulse">
      <h1 className="text-2xl font-bold">Hello World</h1>
      <p>
        This is my first project using the Next.js framework, where I handled
        both the frontend and backend with Next.js and connected it to a MongoDB
        database.
      </p>
      <p>
        It was quite challenging, but in the end, completing it felt very
        rewarding.
      </p>
      <p>I hope to work on better and more powerful projects in the future.</p>
      <p>This was just a simple CRUD application.</p>
      <p className="text-red-500 font-extrabold">Wishing for success!</p>
    </div>
  );
}
