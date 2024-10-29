import { Pill } from "@/app/(over-under)/components/Pill";
import { Button, LinkButton } from "@/app/components/Button";
import { ReactNode } from "react";

const ComponentPanel = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="flex flex-col gap-3 rounded-md bg-white-300 p-4 dark:bg-black-300">
      <h2 className="text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
};

const ComponentsPage = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-4xl font-bold">Components</h1>

      <ComponentPanel title="Button">
        <h3 className="">Enabled</h3>
        <div className="flex flex-row gap-2">
          <Button text={"Base Button"} />
          <Button text={"Danger Button"} variant="danger" />
          <Button text={"Inverse Button"} variant="inverse" />
        </div>
        <h3 className="">Disabled</h3>
        <div className="flex flex-row gap-2">
          <Button text={"Base Button"} disabled={true} />
          <Button text={"Danger Button"} variant="danger" disabled={true} />
          <Button text={"Inverse Button"} variant="inverse" disabled={true} />
        </div>
        <h3 className="">Links</h3>
        <div className="flex flex-row gap-2">
          <LinkButton
            text={"Link Button"}
            href={"/css-playground/components"}
          />
          <LinkButton
            text={"Link Button"}
            href={"/css-playground/components"}
            variant="danger"
          />
          <LinkButton
            text={"Link Button"}
            href={"/css-playground/components"}
            variant="inverse"
          />
        </div>
      </ComponentPanel>
      <ComponentPanel title="Pill">
        <Pill text={"Pill Component"} />
      </ComponentPanel>
    </div>
  );
};

export default ComponentsPage;
