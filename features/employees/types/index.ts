
export interface Employee {
  id: number;
  name: string;
  role: string;
  email: string;
  status: string;
  country?: string;
  active?: string
}

export interface FilterEmployee {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  showCalendar: boolean;
  handleReset: () => void;
  handleChange: (label: string, selectedValue: string) => void;
  setShowCalendar: React.Dispatch<React.SetStateAction<boolean>>;
  dates: { startDate: string; endDate: string };
  handleDateChange: (field: string, value: string) => void;
}

export interface Modal {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  onClick: any;
  title?: string;
  footer?: string;
  parentClassName?: string;
  childClassName?: string;
  headerSection?:boolean 
  footerSection?:boolean
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  setRows: (rows: number) => void;
  rows: number;
}

export interface SelectButton {
  label: string;
  value: string[];
  selectClassName?: string;
  title: string;
  className?: string;
  onSelect: (label: string, selectedValue: string) => void;
}

export interface UserTable {
  openModal: () => void;
  employees: Employee[];
  openMenu: number | null;
  isModalOpen: boolean;
  setIsModalOpen: (state: boolean) => void;
  toggleMenu: (index: number | null) => void;
}

export interface EmployeeModal {
  handleClick: () => void;
  setIsModalOpen: (state: boolean) => void; 
  modalRef: React.RefObject<HTMLDivElement>;
  formData: Employee;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setIsDelete?: (state: boolean) => void ;
}