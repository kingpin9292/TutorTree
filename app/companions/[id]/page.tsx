import CompanionComponent from "@/components/CompanionComponent";
import { getCompanionById } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
interface CompanionSessionParams {
  params: Promise<{ id: string }>;
}
const CompanionSession = async ({ params }: CompanionSessionParams) => {
  const { id } = await params;
  const companion = await getCompanionById(id);
  const { name, subject, topic, voice, style, duration } = companion;
  const user = await currentUser();

  if (!companion) redirect("/companions");
  if (!user) redirect("/sign-in");

  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="size-18 flex items-center justify-center rounded-lg max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image src={`/icons/${subject}.svg`} alt={subject} width={36} height={36} />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <div className="subject-badge max-sm:hidden">{subject}</div>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>
        <div className="items-start text-2xl max-md:hidden">{duration} minutes</div>
      </article>
      <CompanionComponent {...companion} companionId={id} userName={user.firstName} userImage={user.imageUrl} />
    </main>
  );
};

export default CompanionSession;
