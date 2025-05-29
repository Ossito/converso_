import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissions } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

const NewCompanion = async () => {

  const { userId } = await auth();
  if(!userId) redirect("/sign-in");

  const canCreateCompanion = await newCompanionPermissions(); 

  return (
    <main className="min-lg:w-1/3 min-md:w-2/3 items-center justify-center">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col">
          <h1>Créateur de Companion</h1>
          <CompanionForm />
        </article>
      ): (
        <article className="companion-limit">
          <Image src="/images/limit.svg" className="mb-5 -mt-20" alt="Limite Companion atteint" width={360} height={330} />
          <div className="cta-badge rounded-md">
            <h3 className="font-bold">Oups, Limite de Companions Atteinte !</h3>
          </div>
          <p>
            Vous avez atteint la limite de companions que vous pouvez créer. <br/> Veuillez mettre à jour votre plan pour créer plus de companion !
          </p>
          <Link href="/subscription" className="items-center bg-red-900 mt-4 pl-6 pr-6 pt-2 pb-2 text-white rounded-md flex justify-center">
            Mettre à jour mon plan
          </Link>
        </article>
      )}
    </main>
  )
}

export default NewCompanion;