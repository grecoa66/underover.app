import { AddSlateForm } from "./AddSlateForm";
import ManageHeader from "@/app/(under-over)/components/ManageHeader";
import ManagePanel from "@/app/(under-over)/components/ManagePanel";
import ManageWrapper from "@/app/(under-over)/components/ManageWrapper";

const AddSlate = () => {
  return (
    <ManageWrapper>
      <ManageHeader title="Add a Slate" backLink="/under-over/manage/slates" />
      {/* Start Add Slate Form */}
      <ManagePanel>
        <AddSlateForm />
      </ManagePanel>
      {/* End Add Slate Form */}
    </ManageWrapper>
  );
};

export default AddSlate;
