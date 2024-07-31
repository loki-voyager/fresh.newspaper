"use client"

import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error);
  return (
    <>
      <div className="wrapper">
        <div className="error">
          <h1>Oops!!! {error.message}</h1>
          <div>
            <Link className="button" href={`/`}>
              {"{Go to home}"}
            </Link>
            <button onClick={reset}>{"{TryAgain}"}</button>
          </div>
        </div>
      </div>
    </>
  );
}
