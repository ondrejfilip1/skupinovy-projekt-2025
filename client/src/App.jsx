import { Toaster } from "./components/ui/sonner";
import AppRoutes from "./pages/AppRoutes";
import Cursor from "@/components/Cursor";

function App() {
  return (
    <>
      <Cursor />
      <AppRoutes />
      <Toaster
        position="bottom-right"
        className="!border-none !rounded-none"
        toastOptions={{
          unstyled: false,
          classNames: {
            toast: "custom_font !text-xl text_text background_bg border_color !rounded-none",
            title: "",
            description: "text_text text-base",
            actionButton: "!bg-transparent !p-1 !h-7 !w-7 !transition-colors",
            cancelButton: "!bg-transparent !p-1 !h-7 !w-7 !transition-colors",
            closeButton: "!bg-transparent !p-1 !h-7 !w-7 !transition-colors",
          },
        }}
      />
    </>
  );
}

export default App;
