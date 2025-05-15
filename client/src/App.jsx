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
        className="!border-none box_shadow_cyberpunk"
        toastOptions={{
          unstyled: false,
          classNames: {
            toast: "!border-none custom_font !text-xl text_text background_bg button_cyberpunk box_shadow_cyberpunk",
            title: "",
            description: "",
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
