export default async function getAllTokens() {
  const res = await fetch("http://localhost:3000/api/list-nfts");
  if (!res.ok) throw new Error("failed to fetch data");
  return res.json();
}
