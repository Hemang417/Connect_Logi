import { element } from 'prop-types';
import React from 'react';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Import = React.lazy(() => import('./views/import/import'))
const impcreatejob = React.lazy(() => import('./views/import/impcreatejob'))
const organization = React.lazy(() => import('./views/organization/organization'))  
const CreateJob = React.lazy(() => import('./views/organization/Createjob'))  
const addnewBranch = React.lazy(() => import('./views/organization/Innerpage/addnewBranch'))
const NewUser = React.lazy(() => import('./views/new_user/NewUser'))
const branches = React.lazy(() => import('./views/branches/branches'))
const branchlist = React.lazy(() => import('./views/branches/branchlist'))
const UserList = React.lazy(() => import('./views/userlist/UserList'))
const TAT = React.lazy(() => import('./views/tat/tat'));
// const generateReport = React.lazy(() => import('./views/userreport/generateReport'));
const IMPTAT = React.lazy(() => import('./views/tat/InnerPage/ImpTAT'))
const UserListAccess = React.lazy(() => import('./views/userlist/InnerPage/UserListAccess'))
const Mailing = React.lazy(() => import('./views/mailing/Mailing'))
const User_Report = React.lazy(() => import('./views/user_report/User_Report'))
const Generate_Report = React.lazy(() => import('./views/user_report/Generate_Report'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true },
  { path: '/dashboard', element: Dashboard },
  { path: '/import', element: Import },
  { path: '/impcreatejob', element: impcreatejob },
  { path: '/organization', element: organization },
  { path: '/Createjob', element: CreateJob },
  { path: '/addnewBranch', element: addnewBranch },
  { path: '/new_user', element: NewUser },
  { path: '/userlist', element: UserList },
  { path: '/tat', element: TAT },
  { path: '/branches', element: branches},
  { path: '/branchlist', element: branchlist},
  { path: '/ImpTAT', element: IMPTAT },
  { path: '/UserListAccess', element: UserListAccess },
  { path: '/mailing', element: Mailing },
  { path: '/User_Report', element: User_Report },
  { path: '/Generate_Report', element: Generate_Report },
  // { path: '/generatereportImport', element: generatereportImport },
  { path: '/theme', element: Colors, exact: true },
  { path: '/theme/colors', element: Colors },
  { path: '/theme/typography', element: Typography },
  { path: '/base', element: Cards, exact: true },
  { path: '/base/accordion', element: Accordion },
  { path: '/base/breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', element: Cards },
  { path: '/base/carousels', element: Carousels },
  { path: '/base/collapses', element: Collapses },
  { path: '/base/list-groups', element: ListGroups },
  { path: '/base/navs', element: Navs },
  { path: '/base/paginations', element: Paginations },
  { path: '/base/placeholders', element: Placeholders },
  { path: '/base/popovers', element: Popovers },
  { path: '/base/progress', element: Progress },
  { path: '/base/spinners', element: Spinners },
  { path: '/base/tables', element: Tables },
  { path: '/base/tooltips', element: Tooltips },
  { path: '/buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', element: Buttons },
  { path: '/buttons/dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
