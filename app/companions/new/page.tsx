import CompanionForm from "@/components/CompanionForm";
import { newCompanionPermissons } from "@/lib/actions/companion.actions";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

const NewCompanion = async () => {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");
  const canCreateCompanion = await newCompanionPermissons();
  return (
    <main className="lg:w-1/3 md:w-2/3 items-center justify-center">
      {canCreateCompanion ? (
        <article className="w-full gap-4 flex flex-col ">
          <h1>Companion Builder</h1>

          <CompanionForm />
        </article>
      ) : (
        <article className="companion-limit">
          <Image src="/images/limit.svg" alt="Companion limit reached" width={360} height={230} />
          <div className="cta-bridge">Upgrade your plan</div>
          <h1>You've reached your companion limit. Upgrade your plan to create more companions.</h1>
          <Link href="/subscription" className="btn-primary w-full justify-center text-black">
            Upgrade My Plan
          </Link>
        </article>
      )}
    </main>
  );
};

export default NewCompanion;
