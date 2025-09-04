import { useTranslation } from "react-i18next";
// import ProtectedComponent from "../ProtectedComponent";
import { Button } from "./button";
import { capitalize } from "lodash";
import { CirclePlus } from "lucide-react";
// import { Subjects } from "@/features/access-control/types";

interface NewEntityElementButtonProps {
  permissionRole: string;
  path?: string;
  // subject?: Subjects;
  subject?: any;
  entity?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

const NewElementButton = ({
  permissionRole,
  entity,
  onClick,
  disabled,
  className,
  subject,
}: NewEntityElementButtonProps) => {
  const { t } = useTranslation();

  return (
    // <ProtectedComponent action={permissionRole} subject={subject}>
    <Button
      className={`bg-white border-sky-700 border text-sky-700 hover:bg-sky-700 hover:text-white group ${className}`}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      <CirclePlus
        size={20}
        className="text-sky-700 mr-2 size-5 group-hover:text-white"
      />
      {entity ? (
        <span>
          {capitalize(
            t("button.addEntity", { entity: t(`entities.${entity}`) })
          )}
        </span>
      ) : (
        <span>{t("button.addNew")}</span>
      )}
    </Button>
    // </ProtectedComponent>
  );
};

NewElementButton.displayName = "NewElementButton";

export default NewElementButton;
