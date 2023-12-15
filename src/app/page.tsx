import { AppProvider } from "@/components/AppProvider";
import { Connect } from "@/components/Connect";

export default function Home() {
  return (
    <AppProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Connect />
      </main>
    </AppProvider>
  );
}
