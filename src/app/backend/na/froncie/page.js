import os from "os";

export default function BackendNaFroncie() {
  return (
    <div>
      <h1>Hostname serwera to {os.hostname()}</h1>
      <h2>Coś zmieniłem</h2>
    </div>
  );
}
