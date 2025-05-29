import { PricingTable } from "@clerk/nextjs";

const Subscription = () => {
  return (
    <main className="flex items-center justify-center mt-10">
      <h1 className="text-xl font-semibold mb-2 items-start justify-start">Veuillez choisir votre plan</h1>
      {/* Pricing Table from Clerk */}
      <PricingTable />
    </main>
  )
}

export default Subscription;