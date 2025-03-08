export default function NotificationOrder() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-2 bg-white/20 p-4 rounded">
      <div className="absolute flex flex-col items-center gap-2 bg-purple-500 p-4 rounded">
        <h1 className="text-2xl font-bold">success</h1>
        <p className="text-sm">Order Placed</p>
        <p className="text-sm">Please check your email</p>
      </div>
    </div>
  );
}
