import { AddSlateForm } from "./AddSlateForm";
import ManageHeader from "@/app/(over-under)/components/ManageHeader";
import ManagePanel from "@/app/(over-under)/components/ManagePanel";
import ManageWrapper from "@/app/(over-under)/components/ManageWrapper";

const AddSlate = () => {
  return (
    <ManageWrapper>
      <ManageHeader
        title="Add a Slate"
        backLink="/over-under/manage/slates"
        backText="Slates"
      />
      {/* Start Add Slate Form */}
      <ManagePanel>
        <AddSlateForm />
      </ManagePanel>
      {/* End Add Slate Form */}
    </ManageWrapper>
  );
};

export default AddSlate;
