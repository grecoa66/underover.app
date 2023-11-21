import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { InactiveSlates, ActiveSlates } from "./components/slate";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";

const ManageSlates = async () => {
  console.log("Rendering manage slates...");
  // Page requires admin access
  await requireAdmin();

  // Fetch all the slates
  const slates = await prisma.slates.findMany();

  const activeSlates = slates.filter((slate) => slate.is_active);
  const inactiveSlates = slates.filter((slate) => slate.is_active === false);

  return (
    <div>
      <div className="m-4 flex flex-row justify-between">
        <h2 className="text-xl">Manage Slates</h2>
        {/* TODO: Abstract Button */}
        <Link
          href="/under-over/manage/slates/add"
          className={
            "flex flex-row items-center justify-center space-x-2 rounded-lg border-2 border-mint p-2 hover:bg-mint hover:text-black"
          }
        >
          <FaPlus />
          <button type="button">Add</button>
        </Link>
      </div>
      <div className="flex flex-row justify-around">
        <ActiveSlates slates={activeSlates} />
        <InactiveSlates slates={inactiveSlates} />
      </div>
    </div>
  );
};

export default ManageSlates;
