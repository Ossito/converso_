import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilters from "@/components/SubjectFilters";

import Image from "next/image";
import Link from "next/link";


const CompanionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;

  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";

  const companions = await getAllCompanions({ subject, topic });

  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col">
        <h1 className="text-2xl font-semibold">
          Librairie de Companion
        </h1>
        <button className="btn-primary">
            <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
            <Link href="/companion/new">
                <p className="text-sm">
                  Créer un nouveau compagnon
                </p>
            </Link>
        </button>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilters />
        </div>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {companions.map((companion) => (
          <CompanionCard key={companion.id} {...companion} color={getSubjectColor(companion.subject)} />
        ))}
      </section>

    </main>
  )
}

export default CompanionsLibrary;