import { Delete, Edit, MoreHoriz } from "@mui/icons-material";
import {
  Checkbox,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { MouseEvent, useCallback, useState } from "react";

import { useWindowSize } from "hooks";
import { Todo } from "models";

import { Container, Text } from "./Item.style";

interface Props {
  todo: Todo;
  onCheckboxValueChange: (value: boolean) => void;
  onDeleteIconClick: () => void;
  onEditIconClick: () => void;
}

export function Item({
  todo: { dateTime, isComplete, id, name },
  onCheckboxValueChange,
  onDeleteIconClick,
  onEditIconClick,
}: Props) {
  const [menuAnchorElement, setMenuAnchorElement] =
    useState<HTMLElement | null>(null);
  const { width } = useWindowSize();

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

  const closeMenu = useCallback(() => setMenuAnchorElement(null), []);
  const openMenu = useCallback(
    ({ currentTarget }: MouseEvent<HTMLElement>) =>
      setMenuAnchorElement(currentTarget),
    []
  );

  const iconFontSize =
    width <= 425 ? "small" : width <= 1440 ? "medium" : "large";

  return (
    <Container.Main>
      <Checkbox
        checked={isComplete}
        color="primary"
        inputProps={{ "aria-label": "controlled" }}
        size={iconFontSize}
        style={{ padding: 0 }}
        onChange={({ target: { checked } }) => onCheckboxValueChange(checked)}
      />
      <Container.Details>
        <Text.Name $isSelected={isComplete}>{name}</Text.Name>
        <Text.DateTime>{getFormattedDateTime(dateTime)}</Text.DateTime>
      </Container.Details>
      <Container.Icons>
        {width < 600 ? (
          <div>
            <div onClick={openMenu}>
              <MoreHoriz fontSize="small" />
            </div>
            <Menu
              anchorEl={menuAnchorElement}
              anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
              autoFocus={false}
              id="account-menu"
              open={Boolean(menuAnchorElement)}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              onClick={closeMenu}
              onClose={closeMenu}
            >
              <MenuItem onClick={onEditIconClick}>
                <ListItemIcon>
                  <Edit color="action" fontSize={iconFontSize} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: width <= 425 ? "14px" : "unset",
                  }}
                >
                  Edit name
                </ListItemText>
              </MenuItem>
              <MenuItem onClick={onDeleteIconClick}>
                <ListItemIcon>
                  <Delete color="error" fontSize={iconFontSize} />
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    fontSize: width <= 425 ? "14px" : "unset",
                  }}
                >
                  Delete todo
                </ListItemText>
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <>
            <Edit color="action" fontSize="large" onClick={onEditIconClick} />
            <Delete
              color="error"
              fontSize="large"
              onClick={onDeleteIconClick}
            />
          </>
        )}
      </Container.Icons>
    </Container.Main>
  );
}
