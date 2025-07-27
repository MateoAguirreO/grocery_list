import { ClerkProvider } from "@clerk/clerk-react";
import { GroceryListComponent } from "./GroceryListComponent";

const PUBLISHABLE_KEY = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function ReactGroceryApp() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <GroceryListComponent />
    </ClerkProvider>
  );
}
