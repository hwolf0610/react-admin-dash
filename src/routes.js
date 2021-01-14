import React from 'react';

const Login = React.lazy(() => import('./views/Pages/Login/Login'));

const Plan = React.lazy(() => import('./views/programs/Plans'));
const NewPlan = React.lazy(() => import('./views/programs/NewPlan'));
const PlanVersion = React.lazy(() => import('./views/programs/PlanVersion'));
const PlanVersionTaskShow = React.lazy(() => import('./views/programs/PlanVersionTaskShow'));
// const NewPlanVersionDaytask = React.lazy(() => import('./views/programs/NewPlanVersionDayTask'));
const NewPlanTask = React.lazy(() => import('./views/programs/NewPlanTask'));
const PlanDrop_test = React.lazy(() => import('./views/programs/PlanDrop_test'));

const TestDropDrag = React.lazy(() => import('./views/DropDrag/TestDropDrag'));
const Kanban = React.lazy(() => import('./views/DropDrag/kanban'));

const Challenges = React.lazy(() => import('./views/Challenges/Challenges'));
const NewChallenge = React.lazy(() => import('./views/Challenges/NewChallenge'));
const Challenge = React.lazy(() => import('./views/Challenges/Challenge'));

const CardLibrarys = React.lazy(() => import('./views/CardLibrary/CardLibrarys'));
const CardLibrary = React.lazy(() => import('./views/CardLibrary/CardLibrary'));
const NewCardLibrary = React.lazy(() => import('./views/CardLibrary/NewCardLibrary'));

const FlaggedPosts = React.lazy(() => import('./views/FlaggedPost/FlaggedPosts'));
const FlaggedPostDetail = React.lazy(() => import('./views/FlaggedPost/FlaggedPost'));
const FlaggedPostUserHistory = React.lazy(() => import('./views/FlaggedPost/PostUserHistory'));

const MainSetting = React.lazy(() => import('./views/Settings/MainSetting/MainSetting'));


const CodeEditors = React.lazy(() => import('./views/Editors/CodeEditors'));
const TextEditors = React.lazy(() => import('./views/Editors/TextEditors'));

const Compose = React.lazy(() => import('./views/Apps/Email/Compose'));
const Inbox = React.lazy(() => import('./views/Apps/Email/Inbox'));
const Message = React.lazy(() => import('./views/Apps/Email/Message'));
const Invoice = React.lazy(() => import('./views/Apps/Invoicing/Invoice'));

const AdvancedForms = React.lazy(() => import('./views/Forms/AdvancedForms'));
const BasicForms = React.lazy(() => import('./views/Forms/BasicForms'));
const ValidationForms = React.lazy(() => import('./views/Forms/ValidationForms'));
const GoogleMaps = React.lazy(() => import('./views/GoogleMaps'));
const Toaster = React.lazy(() => import('./views/Notifications/Toaster'));
const Calendar = React.lazy(() => import('./views/Plugins/Calendar'));
const Draggable = React.lazy(() => import('./views/Plugins/Draggable'));
const Spinners = React.lazy(() => import('./views/Plugins/Spinners'));
const DataTable = React.lazy(() => import('./views/Tables/DataTable'));
const Tables = React.lazy(() => import('./views/Tables/Tables'));
//const LoadingButtons = React.lazy(() => import('./views/Buttons/LoadingButtons'));

const Breadcrumbs = React.lazy(() => import('./views/Base/Breadcrumbs'));
const Cards = React.lazy(() => import('./views/Base/Cards'));
const Carousels = React.lazy(() => import('./views/Base/Carousels'));
const Collapses = React.lazy(() => import('./views/Base/Collapses'));
//const Dropdowns = React.lazy(() => import('./views/Base/Dropdowns'));

const Jumbotrons = React.lazy(() => import('./views/Base/Jumbotrons'));
const ListGroups = React.lazy(() => import('./views/Base/ListGroups'));
const Navbars = React.lazy(() => import('./views/Base/Navbars'));
const Navs = React.lazy(() => import('./views/Base/Navs'));
const Paginations = React.lazy(() => import('./views/Base/Paginations'));
const Popovers = React.lazy(() => import('./views/Base/Popovers'));
const ProgressBar = React.lazy(() => import('./views/Base/ProgressBar'));
const SpinnersB4 = React.lazy(() => import('./views/Base/Spinners'));
const Switches = React.lazy(() => import('./views/Base/Switches'));

const Tabs = React.lazy(() => import('./views/Base/Tabs'));
const Tooltips = React.lazy(() => import('./views/Base/Tooltips'));
const BrandButtons = React.lazy(() => import('./views/Buttons/BrandButtons'));
const ButtonDropdowns = React.lazy(() => import('./views/Buttons/ButtonDropdowns'));
const ButtonGroups = React.lazy(() => import('./views/Buttons/ButtonGroups'));
const Buttons = React.lazy(() => import('./views/Buttons/Buttons'));
const Charts = React.lazy(() => import('./views/Charts'));
const Dashboard = React.lazy(() => import('./views/Dashboard'));
const CoreUIIcons = React.lazy(() => import('./views/Icons/CoreUIIcons'));
const Flags = React.lazy(() => import('./views/Icons/Flags'));
const Brands = React.lazy(() => import('./views/Icons/Brands'));
const Alerts = React.lazy(() => import('./views/Notifications/Alerts'));
const Badges = React.lazy(() => import('./views/Notifications/Badges'));
const Modals = React.lazy(() => import('./views/Notifications/Modals'));
const Colors = React.lazy(() => import('./views/Theme/Colors'));
const Typography = React.lazy(() => import('./views/Theme/Typography'));
const Widgets = React.lazy(() => import('./views/Widgets/Widgets'));
const Users = React.lazy(() => import('./views/Users/Users'));
const User = React.lazy(() => import('./views/Users/User'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/login', name: 'login', component: Login },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/programs/plans', exact: true, name: 'Plans', component: Plan },
  { path: '/programs/CreateNewPlan', exact: true, name: 'NewPlan', component: NewPlan },
  { path: '/programs/Plans/:id', exact: true, name: 'Plan Details', component: PlanVersion },
  { path: '/programs/Plans/VersionTask/:id', exact: true, name: 'Plan VersionTask', component: PlanVersionTaskShow },
  { path: '/Version/NewTask', exact: true, name: 'NewPlanTask', component: NewPlanTask },
  { path: '/Version/PlanDrop_test', exact: true, name: 'PlanDrop_test', component: PlanDrop_test },
  { path: '/DropDrag/sortDataTable', exact: true, name: 'DropDrag', component: TestDropDrag },
  { path: '/DropDrag/Kanban', exact: true, name: 'DropDrag', component: Kanban },
  { path: '/Challenges', exact: true, name: 'Challenges', component: Challenges },
  { path: '/Challenges/:id', exact: true, name: 'Challenge Details', component: Challenge },
  { path: '/Challenge/CreateNew', exact: true, name: 'Create New Challenge ', component: NewChallenge },
  { path: '/CardLibrarys', exact: true, name: 'CardLibrarys', component: CardLibrarys },
  { path: '/CardLibrarys/:id', exact: true, name: 'CardLibrary Detail', component: CardLibrary },
  { path: '/CardLibrary/CreateNew/:id', exact: true, name: 'Create New CardLibrary', component: NewCardLibrary },
  { path: '/FlaggedPosts', exact: true, name: 'FlaggedPosts', component: FlaggedPosts },
  { path: '/FlaggedPosts/:id', exact: true, name: 'Post Deatil', component: FlaggedPostDetail },
  { path: '/Post/UserHistory', exact: true, name: 'User History', component: FlaggedPostUserHistory },
  { path: '/setting/MainSetting', name: 'Setting', component: MainSetting },
  { path: '/theme', name: 'Theme', component: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', component: Colors },
  { path: '/theme/typography', name: 'Typography', component: Typography },
  { path: '/base', name: 'Base', component: Cards, exact: true },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', component: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', component: Cards },
  { path: '/base/carousels', name: 'Carousel', component: Carousels },
  { path: '/base/collapses', name: 'Collapse', component: Collapses },
  { path: '/base/jumbotrons', name: 'Jumbotrons', component: Jumbotrons },
  { path: '/base/list-groups', name: 'List Groups', component: ListGroups },
  { path: '/base/navbars', name: 'Navbars', component: Navbars },
  { path: '/base/navs', name: 'Navs', component: Navs },
  { path: '/base/paginations', name: 'Paginations', component: Paginations },
  { path: '/base/popovers', name: 'Popovers', component: Popovers },
  { path: '/base/progress-bar', name: 'Progress Bar', component: ProgressBar },
  { path: '/base/spinners', name: 'Spinners', component: SpinnersB4 },
  { path: '/base/switches', name: 'Switches', component: Switches },
  { path: '/base/tabs', name: 'Tabs', component: Tabs },
  { path: '/base/tooltips', name: 'Tooltips', component: Tooltips },
  { path: '/buttons', name: 'Buttons', component: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', component: Buttons },
  { path: '/buttons/button-dropdowns', name: 'Dropdowns', component: ButtonDropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', component: ButtonGroups },
  { path: '/buttons/brand-buttons', name: 'Brand Buttons', component: BrandButtons },
  { path: '/charts', name: 'Charts', component: Charts },
  { path: '/editors', name: 'Editors', component: CodeEditors, exact: true },
  { path: '/editors/code-editors', name: 'Code Editors', component: CodeEditors },
  { path: '/editors/text-editors', name: 'Text Editors', component: TextEditors },
  { path: '/forms', name: 'Forms', component: BasicForms, exact: true },
  { path: '/forms/advanced-forms', name: 'Advanced Forms', component: AdvancedForms },
  { path: '/forms/basic-forms', name: 'Basic Forms', component: BasicForms },
  { path: '/forms/validation-forms', name: 'Form Validation', component: ValidationForms },
  { path: '/google-maps', name: 'Google Maps', component: GoogleMaps },
  { path: '/icons', exact: true, name: 'Icons', component: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', component: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', component: Flags },
  { path: '/icons/brands', name: 'Brands', component: Brands },
  { path: '/notifications', name: 'Notifications', component: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', component: Alerts },
  { path: '/notifications/badges', name: 'Badges', component: Badges },
  { path: '/notifications/modals', name: 'Modals', component: Modals },
  { path: '/notifications/toaster', name: 'Toaster', component: Toaster },
  { path: '/plugins', name: 'Plugins', component: Calendar, exact: true },
  { path: '/plugins/calendar', name: 'Calendar', component: Calendar },
  { path: '/plugins/draggable', name: 'Draggable Cards', component: Draggable },
  { path: '/plugins/spinners', name: 'Spinners', component: Spinners },
  { path: '/tables', name: 'Tables', component: Tables, exact: true },
  { path: '/tables/data-table', name: 'Data Table', component: DataTable },
  { path: '/tables/tables', name: 'Tables', component: Tables },
  { path: '/widgets', name: 'Widgets', component: Widgets },
  { path: '/apps', name: 'Apps', component: Compose, exact: true },
  { path: '/apps/email', name: 'Email', component: Compose, exact: true },
  { path: '/apps/email/compose', name: 'Compose', component: Compose },
  { path: '/apps/email/inbox', name: 'Inbox', component: Inbox },
  { path: '/apps/email/message', name: 'Message', component: Message },
  { path: '/apps/invoicing', name: 'Invoice', component: Invoice, exact: true },
  { path: '/apps/invoicing/invoice', name: 'Invoice', component: Invoice },
  { path: '/users', exact: true, name: 'Users', component: Users },
  { path: '/users/:id', exact: true, name: 'User Details', component: User }
];


export default routes;
