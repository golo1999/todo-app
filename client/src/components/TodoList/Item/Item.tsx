import { Checkbox } from "@mui/material";
import { MdDelete, MdEdit } from "react-icons/md";

import { Todo } from "models";

import { Container, Text } from "./Item.style";

interface Props {
  todo: Todo;
  onCheckboxValueChange: (value: boolean) => void;
  onDeleteIconClick: () => void;
}

export function Item({
  todo: { dateTime, isComplete, name },
  onCheckboxValueChange,
  onDeleteIconClick,
}: Props) {
  function getFormattedDateTime(timestamp: string) {
    const dateTime = new Date(Number(timestamp));

    const hour = dateTime.getHours();
    const minute = dateTime.getMinutes();

    const formattedHour = hour < 10 ? `0${hour}` : hour.toString();
    const formattedMinute = minute < 10 ? `0${minute}` : minute.toString();
    const formattedMonthName = dateTime.toLocaleString("default", {
      month: "long",
    });

    return formattedMonthName
      .concat(" ")
      .concat(dateTime.getDate().toString())
      .concat(", ")
      .concat(dateTime.getFullYear().toString())
      .concat(" ")
      .concat(formattedHour)
      .concat(":")
      .concat(formattedMinute);
  }

  return (
    <Container.Main>
      <Checkbox
        color="primary"
        defaultChecked={isComplete}
        inputProps={{ "aria-label": "controlled" }}
        style={{ padding: 0 }}
        sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
        onChange={({ target: { checked } }) => onCheckboxValueChange(checked)}
      />
      <Container.Details>
        <Text.Name $isSelected={isComplete}>{name}</Text.Name>
        <Text.DateTime>{getFormattedDateTime(dateTime)}</Text.DateTime>
      </Container.Details>
      <Container.Icons>
        <MdEdit color="black" size={32} />
        <MdDelete color="red" size={32} onClick={onDeleteIconClick} />
      </Container.Icons>
    </Container.Main>
  );
}
