"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { subjects } from "@/constants";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";


const SubjectFilters = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get("subject") || "";

    const [subject, setSubject] = useState(query);

    useEffect(() => {
        let newUrl = "";
        if (subject === "all") {
            newUrl = removeKeysFromUrlQuery({
                params: searchParams.toString(),
                keysToRemove: ["subject"],
            });
        } else {
            newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "subject",
                    value: subject,
                });
        }
        router.push(newUrl, { scroll: false });
    }, [subject]);

  return (
    <Select onValueChange={setSubject} value={subject}>
      <SelectTrigger className="w-44 py-2 px-2">
        <SelectValue placeholder="Sélectionner un sujet" />
      </SelectTrigger>
      <SelectContent className="bg-white text-black border border-gray-200 shadow-lg rounded-sm">
        <SelectItem value="all">Tous les sujets</SelectItem>
        {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
                {subject}
            </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default SubjectFilters;