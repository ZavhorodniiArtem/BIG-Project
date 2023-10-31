export type TEditProfile = {
  isModalOpen: boolean;
  setIsModalOpen: (bool: boolean) => void;
  username: string;
};

type TDatePicker = {
  $d: string;
};

export type TEditValues = {
  userName: string;
  birthday: TDatePicker;
};
