import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { requireAdmin } from "@/app/api/auth/getUser";
import { prisma } from "@/app/api/__prismaClient";
import { EditSlateForm } from "./EditSlateForm";

const EditSlate = async ({ params }: { params: { id: string } }) => {
  // Page requires admin access
  await requireAdmin();

  // Fetch all the slates
  const slate = await prisma.slates.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!slate) {
    throw Error("Slate not found");
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="text-xl">Edit Slate #{params.id}</h2>

        {/* TODO: Abstract Button */}
        <Link
          href="/under-over/manage/slates"
          className={
            "flex w-1/6 flex-row items-center justify-center space-x-2 rounded-lg border-2 border-mint p-2 hover:bg-mint hover:text-black"
          }
        >
          <FaArrowLeft />
          <button type="button">Back</button>
        </Link>
      </div>
      <EditSlateForm slate={slate} />
    </div>
  );
};

export default EditSlate;
