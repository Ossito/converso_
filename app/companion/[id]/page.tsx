import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";


interface CompanionSessionPageProps {
  params: Promise<{id: string}>;
}

const CompanionSession = async ({ params}: CompanionSessionPageProps) => {

  const {id} = await params;
  const companion = await getCompanion(id);
  const user = await currentUser();
  
  const {name, subject, topic, duration, title} = companion;

  if(!user){
    redirect("/sign-in");
  }

  if(!name){
    redirect("/companion");
  }

  return (
    <main>
      <article className="flex border rounded-sm justify-between p-4 max-md:flex-col">
          <div className="flex items-center gap-2">
            <div className="size-[52px] flex items-center justify-center rounded-sm" style={{ backgroundColor: getSubjectColor(subject) }}>
              <img src={`/icons/${subject}.svg`} alt={subject} width={33} height={33} />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <p className="text-xl font-bold">{name}</p>
                <div className="subject-badge max-sm:hidden">
                  {subject}
                </div>  
              </div>
              <p className="text-md">{topic}</p>
            </div>
          </div>
          <div className="items-start flex gap-2 text-md max-md:mt-10">
            <img src="/icons/clock.svg" alt="Companion_Icon" className="align-middle" width={20} height={20} />
            Durée : {duration} mins
          </div> 
      </article>
      <CompanionComponent {...companion} companionId={id} userName={user.firstName!} userImage={user.imageUrl!} />
    </main>
  )
}

export default CompanionSession;