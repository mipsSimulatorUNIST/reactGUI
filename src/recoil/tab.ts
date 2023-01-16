import {atom} from "recoil";

export interface TabTypes {
  id: number;
  name: string;
  isActive: boolean;
}

export const tabState = atom<TabTypes[]>({
  key: "tabs",
  default: [
    {
      id: 1,
      name: "어셈블러",
      isActive: true,
    },

    {
      id: 2,
      name: "시뮬레이터",
      isActive: false,
    },

    {
      id: 3,
      name: "캐쉬",
      isActive: false,
    },
  ],
});
