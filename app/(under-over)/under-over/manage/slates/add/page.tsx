import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { AddSlateForm } from "./AddSlateForm";
import ManageHeader from "@/app/(under-over)/components/ManageHeader";

const AddSlate = () => {
  return (
    <div>
      <ManageHeader title="Add a Slate" backLink="/under-over/manage/slates" />
      {/* Start Add Slate Form */}
      <div>
        <AddSlateForm />
      </div>
      {/* End Add Slate Form */}
    </div>
  );
};

export default AddSlate;
