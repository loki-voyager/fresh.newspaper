const NotiRead = async ({ id, username }: { id: number; username: string }) => {
  const res = await fetch(`http://localhost:3000/api/NotiRead`, {
    cache: "no-cache",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, username }),
  });

  if (!res.ok) {
    throw new Error(`Failed to check notification. Error code: ${res.status}`);
  }
  return await res.json();
};

export { NotiRead };
