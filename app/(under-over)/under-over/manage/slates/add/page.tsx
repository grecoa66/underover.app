import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { AddSlateForm } from "./AddSlateForm";

const AddSlate = () => {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="text-xl">Add a Slate</h2>

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
      {/* Start Add Slate Form */}
      <div>
        <AddSlateForm />
      </div>
      {/* End Add Slate Form */}
    </div>
  );
};

export default AddSlate;
