import { AddSlateForm } from "./AddSlateForm";
import ManageHeader from "@/app/components/ManageHeader";
import ManagePanel from "@/app/components/ManagePanel";
import ManageWrapper from "@/app/components/ManageWrapper";

const AddSlate = () => {
  return (
    <ManageWrapper>
      <ManageHeader
        title="Add a Slate"
        backLink="/manage/slates"
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
