import CompanionList from "@/components/CompanionList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getBookmarkedCompanions, getUserCompanions, getUserSessions } from "@/lib/actions/companion.actions";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";


const Profil = async () => {
  // Current User
  const user = await currentUser();

  if(!user) redirect("/sign-in");

  const userCompanions = await getUserCompanions(user.id);
  const userSessionHistory = await getUserSessions(user.id);
  const userBookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image src={user.imageUrl} alt={user.firstName!} width={110} height={110} className="rounded-sm" />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{user.firstName} {user.lastName}</h1>
            <p className="text-sm text-muted-foreground">Email: {user.emailAddresses[0].emailAddress}</p>
          </div>
        </div>

        <div className="flex gap-4">
          {/* User lessons completed */}
          <div className="border border-black/10 rounded-md p-3 gap-2 flex flex-col h-fit">
            <div className="flex items-center gap-2">
              <Image src="/icons/check.svg" alt="checkmark" width={22} height={22} />
              <p className="text-2xl font-bold">
                {userSessionHistory.length}
              </p>
            </div> 
            <div>Leçons Terminées</div> 
          </div>

          {/* User lessons completed */}
          <div className="border border-black/10 rounded-md p-3 gap-2 flex flex-col h-fit">
            <div className="flex items-center gap-2">
              <Image src="/icons/cap.svg" alt="checkmark" width={22} height={22} />
              <p className="text-2xl font-bold">
                { userCompanions.length }
              </p>
            </div> 
            <div>Companions</div> 
          </div>
        </div>
        
      </section>
      <Accordion type="multiple">
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold">
            Companions Favoris {`(${userBookmarkedCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList
              companions={userBookmarkedCompanions}
              title="Bookmarked Companions"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Récentes Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList
              title="Récentes Sessions"
              companions={userSessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            Mes Companions {`(${userCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionList title="My Companions" companions={userCompanions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  )
}

export default Profil;