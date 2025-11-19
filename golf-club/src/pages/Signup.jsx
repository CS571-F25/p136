export default function Signup() {
  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form className="flex flex-col gap-3">
        <input className="border p-2 rounded" placeholder="Name" />
        <input className="border p-2 rounded" placeholder="Email" />
        <input className="border p-2 rounded" type="password" placeholder="Password" />
        <button className="bg-green-700 text-white p-2 rounded">Create Account</button>
      </form>
    </div>
  );
}