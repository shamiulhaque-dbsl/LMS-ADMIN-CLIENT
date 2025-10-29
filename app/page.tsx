import { getServerUser } from "@/lib/getServerUser";

export default async function DashboardPage() {
  const user = await getServerUser();
  if (!user) return <p>Please login</p>;

  return (
    <div>
      <h1>Welcome, {user.user_name}</h1>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}
