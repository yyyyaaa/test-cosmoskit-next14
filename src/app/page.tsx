import { AppProvider } from "@/components/AppProvider";
import { Connect } from "@/components/Connect";
import { ModalExample } from "@/components/ModalExample";
import { wallets } from "@/components/stub-data";

export default function Home() {
  return (
    <AppProvider>
      <main className="flex min-h-screen flex-col items-center p-24">
        <Connect>
          <ModalExample wallets={wallets} />
        </Connect>
      </main>
    </AppProvider>
  );
}
