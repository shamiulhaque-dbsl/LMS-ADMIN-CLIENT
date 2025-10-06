import type { LucideIcon, LucideProps } from "lucide-react";
import {
  Send,
  Upload,
  Loader,
  Trash,
  Bell,
  Ellipsis,
  Eye,
  ChartBarBig,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleUser,
  ClipboardPlus,
  CreditCard,
  File,
  Headset,
  HeartHandshake,
  LayoutDashboard,
  MessageSquareMore,
  MessageSquareText,
  Pencil,
  Search,
  Settings,
  ShieldAlert,
  ShoppingCart,
  Users,
  KeyRound,
  LogIn,
  Globe,
  Code,
  Brush,
  Briefcase,
  X,
  Menu,
  Info,
  LogOut,
  BookOpen,
  Star,
  Play,
  Check,
  ArrowUp,
  Laptop,
  Presentation,
  BrainCircuit,
  Users2,
  Award,
  Lightbulb,
  Target,
  BookCheck,
  MessageSquare,
  Handshake,
  SquarePlay,
  Video,
  FolderClosed,
  Mail,
  MapPin,
  Phone,
  Shield,
  Twitter,
  PlayCircle,
  ArrowLeft,
  GraduationCap,
  CheckCircle2,
  Share2,
  Building2,
  Banknote,
  ClipboardList,
  FileQuestion,
  Calendar,
  Bookmark,
  MoreVertical,
  Filter,
  ArrowUpDown,
  FileText,
  House,
  CircleX,
  Clock,
  PanelBottomClose,
  ShoppingBag,
  Plus,
  ArrowDownUp,
  RotateCcw,
} from "lucide-react";

export type Icon = LucideIcon;
export type IconProps = LucideProps;
export type ValidIcon = keyof typeof Icons;

export const Icons = {
  rotateCcw: RotateCcw,
  loader: Loader,
  arrowDownUp: ArrowDownUp,
  plus: Plus,
  ellipsis: Ellipsis,
  upload: Upload,
  trash: Trash,
  send: Send,
  lightbulb: Lightbulb,
  shoppingBag: ShoppingBag,
  eye: Eye,
  messageSquare: MessageSquare,
  target: Target,
  bookCheck: BookCheck,
  handshake: Handshake,
  laptop: Laptop,
  presentation: Presentation,
  brainCircuit: BrainCircuit,
  users2: Users2,
  award: Award,
  user: Users,
  alert: ShieldAlert,
  bell: Bell,
  cart: ShoppingCart,
  message: MessageSquareText,
  dashboard: LayoutDashboard,
  carrowdown: ChevronDown,
  chartBar: ChartBarBig,
  report: ClipboardPlus,
  settings: Settings,
  userCircle: CircleUser,
  helpCircle: HeartHandshake,
  feedback: MessageSquareMore,
  fileText: File,
  headset: Headset,
  creditCard: CreditCard,
  edit: Pencil,
  chevronRight: ChevronRight,
  chevronLeft: ChevronLeft,
  search: Search,
  key: KeyRound,
  login: LogIn,
  globe: Globe,
  code: Code,
  brush: Brush,
  briefcase: Briefcase,
  x: X,
  menu: Menu,
  help: Info,
  logout: LogOut,
  bookOpen: BookOpen,
  star: Star,
  play: Play,
  check: Check,
  arrowup: ArrowUp,
  filetext: FileText,
  building: Building2,
  banknote: Banknote,
  calendar: Calendar,
  bookmark: Bookmark,
  moreVertical: MoreVertical,
  filter: Filter,
  arrowUpDown: ArrowUpDown,
  clipboard: ClipboardList,
  filequestion: FileQuestion,
  share: Share2,
  checkcircle: CheckCircle2,
  graduationcap: GraduationCap,
  playcircle: PlayCircle,
  arrowleft: ArrowLeft,
  mail: Mail,
  mappin: MapPin,
  phone: Phone,
  shield: Shield,
  twitter: Twitter,
  video: Video,
  squareplay: SquarePlay,
  folder: FolderClosed,
  book: BookOpen,
  clock: Clock,
  panelbottom: PanelBottomClose,
  house: House,
  circlex: CircleX,
  google: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-0.5 0 48 48" version="1.1" {...props}>
      <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Color-" transform="translate(-401.000000, -860.000000)">
          <g id="Google" transform="translate(401.000000, 860.000000)">
            <path
              d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
              id="Fill-1"
              fill="#FBBC05"
            ></path>
            <path
              d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
              id="Fill-2"
              fill="#EB4335"
            ></path>
            <path
              d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
              id="Fill-3"
              fill="#34A853"
            ></path>
            <path
              d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
              id="Fill-4"
              fill="#4285F4"
            ></path>
          </g>
        </g>
      </g>
    </svg>
  ),
  facebook: (props: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" version="1.1" {...props}>
      <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Color-" transform="translate(-200.000000, -160.000000)" fill="#4460A0">
          <path
            d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
            id="Facebook"
          ></path>
        </g>
      </g>
    </svg>
  ),

  github: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      />
    </svg>
  ),
  discord: ({ ...props }: LucideProps) => (
    <svg viewBox="0 0 640 512" {...props}>
      <path
        fill="currentColor"
        d="M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
      />
    </svg>
  ),
} as const;
