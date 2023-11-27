import { prisma } from "@/app/api/__prismaClient";
import { requireAdmin } from "@/app/api/auth/getUser";
import { Slates } from "./components/slate";
import Link from "next/link";
import { FaArrowLeft, FaPlus } from "react-icons/fa";

const ManageSlates = async () => {
  // Page requires admin access
  await requireAdmin();

  // Fetch all the slates
  const slates = await prisma.slates.findMany();

  const activeSlates = slates.filter((slate) => slate.is_active);
  const inactiveSlates = slates.filter((slate) => slate.is_active === false);

  return (
    <div className="mb-24">
      <div className="m-4 flex flex-row justify-between">
        <h2 className="text-xl">Manage Slates</h2>
        {/* TODO: Abstract Button */}
        <div className="flex flex-row space-x-4">
          <Link
            href="/under-over/manage"
            className={
              "flex flex-row items-center justify-center space-x-2 rounded-lg border-2 border-mint p-2 hover:bg-mint hover:text-black"
            }
          >
            <FaArrowLeft />
            <button type="button">Back</button>
          </Link>
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
      </div>
      <div className="flex flex-col items-center justify-around space-y-4 lg:flex-row lg:items-start lg:space-y-0">
        <Slates slates={activeSlates} areSlatesActive={true} />
        <Slates slates={inactiveSlates} areSlatesActive={false} />
      </div>
    </div>
  );
};

export default ManageSlates;
