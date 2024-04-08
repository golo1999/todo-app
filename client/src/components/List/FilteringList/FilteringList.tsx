import styled from "styled-components";

import { FILTERING_ITEMS } from "consts";
import { FilteringItem } from "models";
import { useTodoStore } from "store";

interface ItemProps {
  $isSelected: boolean;
}

const Container = {
  Main: styled.ul`
    align-items: center;
    display: flex;
    gap: 1rem;
    list-style-type: none;
    user-select: none;

    @media screen {
      @media (max-width: 425px) {
        font-size: 13px;
      }
    }
  `,
};

const Item = styled.li<ItemProps>`
  ${({ $isSelected }) => $isSelected && "color: royalblue;"};
  font-weight: bold;
`;

export function FilteringList() {
  const { selectedFilteringItem, setSelectedFilteringItem } = useTodoStore();

  return (
    <Container.Main>
      {FILTERING_ITEMS.map((item: FilteringItem, index) => {
        function handleClick() {
          if (selectedFilteringItem !== item) {
            setSelectedFilteringItem(item);
          }
        }

        const formattedStatus = item
          .substring(0, 1)
          .concat(item.substring(1).toLowerCase());
        const isSelected = selectedFilteringItem === item;

        return (
          <Item $isSelected={isSelected} key={index} onClick={handleClick}>
            {formattedStatus}
          </Item>
        );
      })}
    </Container.Main>
  );
}
