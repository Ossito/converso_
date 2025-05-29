import { cn, getSubjectColor } from "@/lib/utils";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableRow, TableHeader, TableFooter } from "./ui/table";

import Link from "next/link";
import Image from "next/image";

interface CompanionListProps{
    title: string,
    companions?: Companion[],
    classNames?: string, 
}

const CompanionList = ({ title, companions, classNames }: CompanionListProps) => {
  return (
    <article className={cn("companion-list", classNames)}>
        <h2 className="font-bold text-2xl mb-2">Session Récentes</h2>
        <Table>
            <TableHeader>
                <TableRow className="border-blue-400">
                    <TableHead className="text-lg w-2/3">Leçons</TableHead>
                    <TableHead className="text-lg">Sujet</TableHead>
                    <TableHead className="text-lg text-right">Duration</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {companions?.map(({ id, name, subject, topic, duration }) => (
                    <TableRow key={id} className="border-gray-200">
                        <TableCell>
                            <Link href={`/companion/${id}`}>
                                <div className="flex items-center gap-2">
                                    <div className="size-[52px] flex items-center justify-center rounded-lg max-md:hidden" style={{ backgroundColor: getSubjectColor(subject)}}>
                                        <Image src={`/icons/${subject}.svg`} alt={subject} width={25} height={25} />
                                    </div>  

                                    <div className="flex flex-col gap-2">
                                        <p className="font-bold text-md">{name}</p>
                                        <p className="text-md">{topic}</p>
                                    </div>
                                </div>
                            </Link>
                        </TableCell>
                        <TableCell>
                            <div className="subject-badge w-fit max-md:hidden">
                                {subject}
                            </div>
                            <div className="flex items-center justify-center rounded-sm w-fit p-2 md:hidden" style={{ backgroundColor: getSubjectColor(subject)}}>
                                <Image src={`/icons/${subject}.svg`} alt={subject} width={18} height={18} />
                            </div>
                        </TableCell>
                        <TableCell>
                            <div className="flex items-center gap-2 w-full justify-end">
                                <p className="text-sm">
                                    {duration} {' '}
                                    <span className="max-xs:hidden">mins</span>
                                </p>
                                <Image src="/icons/clock.svg" alt="duration_clock" width={12} height={12}/>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </article>
  )
}

export default CompanionList;