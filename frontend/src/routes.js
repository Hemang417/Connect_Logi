import { element, exact } from 'prop-types';
import React from 'react';
// import PasswordApprover from './views/passwordChangeReq/ChangeReq';


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const ForgetPassword =React.lazy(()=>import('./views/pages/login/ForgetPassword'))
const changeReq = React.lazy(()=>import('./views/passwordChangeReq/ChangeReq'))
const RecycleBin = React.lazy(()=>import('./views/recyclebin/RecycleBin'))
const UserRole = React.lazy(() => import('./views/roles/roles'))
const ApproverLog = React.lazy(() => import('./views/approverlog/approverlog'))
const OrgApproval = React.lazy(() => import('./views/approverlog/Innerpage/OrgApproval'))
const JobApproval = React.lazy(() => import('./views/approverlog/Innerpage/JobApproval'))
const NotifyRender = React.lazy(() => import('./views/notifrender/notifyrender'))
const ConnectSpace = React.lazy(() => import('./views/connectSpace/ConnectSpace'))
// const PaymentSheet = React.lazy(() => import('./views/accounts/PaymentSheet'))


// const Prospect = React.lazy(() => import('./views/sales/InnerPage/Prospect'))
const Prospect = React.lazy(() => import('./views/sales/InnerPage/Prospect'))
const salesProspects = React.lazy(() => import('./views/sales/salesProspects'))
const salesEnquiry = React.lazy(() => import('./views/sales/salesEnquiry'))
const salesQuotations = React.lazy(() => import('./views/sales/salesQuotations'))
const ProspectCreate = React.lazy(() => import('./views/sales/InnerPage/ProspectCreate'))
const NewEnquiry = React.lazy(() => import('./views/sales/InnerPage/NewEnquiry'))
const Quotation = React.lazy(() => import('./views/sales/InnerPage/Quotation'))
const QuoEdit = React.lazy(() => import('./views/sales/InnerPage/QuoEdit'))
const EditLogs = React.lazy(() => import('./views/EditLogs/EditLogs'))
const impdetails = React.lazy(() => import('./views/import/impdetails'))
const impDelayedJobs = React.lazy(() => import('./views/import/impDelayedJobs'))
const impOwnTransport = React.lazy(() => import('./views/import/impOwnTransport'))
const impOwnBooking = React.lazy(() => import('./views/import/impOwnBooking'))
const impCompletedOnTime = React.lazy(() => import('./views/import/impCompletedOnTime'))
const expCompletedOnTime = React.lazy(() => import('./views/export/expCompletedOnTime'))
const expOwnBooking = React.lazy(() => import('./views/export/expOwnBooking'))
const expOwnTransport = React.lazy(() => import('./views/export/expOwnTransport'))
const expDelayedJobs = React.lazy(() => import('./views/export/expDelayedJobs'))

const expdetails = React.lazy(() => import('./views/export/expdetails'))
const transportDetails = React.lazy(() => import('./views/transportation/transportDetails'))
const transportOwnVehicles = React.lazy(() => import('./views/transportation/transportOwnVehicles'))
const transportOutsideVehicles = React.lazy(() => import('./views/transportation/transportOutsideVehicles'))
const freightForwardingDetails = React.lazy(() => import('./views/freightForwarding/freightForwardingDetails'))
const accountsDetails = React.lazy(() => import('./views/accounts/accountsDetails'))
const accountsAdvance = React.lazy(() => import('./views/accounts/accountsAdvance'))
const accountsOutstanding = React.lazy(() => import('./views/accounts/accountsOutstanding'))
const accountsMilestoneReport = React.lazy(() => import('./views/accounts/accountsMilestoneReport'))
const accountsBankDetails = React.lazy(() => import('./views/accounts/accountsBankDetails'))

const NewEnquiryCreate = React.lazy(() => import('./views/sales/InnerPage/NewEnquiryCreate'))



const PaymentSheetCreditCreate = React.lazy(() => import('./views/accounts/Innerpages/CreditCreate'))
const PaymentSheetDebitCreate = React.lazy(() => import('./views/accounts/Innerpages/DebitCreate'))
const PaymentSheetDebit = React.lazy(() => import('./views/accounts/Innerpages/Debit'))
const PaymentSheetCredit = React.lazy(() => import('./views/accounts/Innerpages/Credit'))
const FourZeroFour = React.lazy(() => import('./views/errorPages/FourZeroFour'))
const FiveZeroThree = React.lazy(() => import('./views/errorPages/FiveZeroThree'))
const FiveZeroZero = React.lazy(() => import('./views/errorPages/FiveZeroZero'))
const FourZeroOne = React.lazy(() => import('./views/errorPages/FourZeroOne'))
const FourZeroThree = React.lazy(() => import('./views/errorPages/FourZeroThree'))
const delegations = React.lazy(() => import('./views/Delegation/delegations'))








const AllTransportation = React.lazy(() => import('./views/transportation/AllTransportation'))
const Uneed = React.lazy(() => import('./views/transportation/Uneed'))
const Expenses = React.lazy(() => import('./views/transportation/Expenses'))
const TransportPlanning = React.lazy(() => import('./views/transportation/TransportPlanning'))


const OwnVehicleCreate = React.lazy(() => import('./views/transportation/Innerpage/OwnVehicleCreate'))
const OwnVehicleOutsideCreate = React.lazy(() => import('./views/transportation/Innerpage/OwnVehicleOutsideCreate'))
const ReturnLoadOwnVehicleCreate = React.lazy(() => import('./views/transportation/Innerpage/ReturnLoadOwnVehicleCreate'))
const OutsideVehicleCreate = React.lazy(() => import('./views/transportation/Innerpage/OutsideVehicleCreate'))
const DieselOwnVehicleCreate = React.lazy(() => import('./views/transportation/Innerpage/DieselOwnVehicleCreate'))
const TaxANDInsuranceOwnVehicleCreate = React.lazy(() => import('./views/transportation/Innerpage/TaxANDInsuranceOwnVehicleCreate'))
const TollTaxOwnVehicleCreate = React.lazy(() => import('./views/transportation/Innerpage/TollTaxOwnVehicleCreate'))
const MaintenanceOwnVehicleCreate = React.lazy(() => import('./views/transportation/Innerpage/MaintenanceOwnVehicleCreate'))
const DriverSalaryCreate = React.lazy(() => import('./views/transportation/Innerpage/DriverSalaryCreate'))
const EMIVehicleCreate = React.lazy(() => import('./views/transportation/Innerpage/EMIVehicleCreate'))
const TransportDepartmentSalaryCreate = React.lazy(() => import('./views/transportation/Innerpage/TransportDepartmentSalaryCreate'))
const CashCreate = React.lazy(() => import('./views/transportation/Innerpage/CashCreate'))



const BankDetails = React.lazy(() => import('./views/accounts/BankDetails'))
const PayeDetails = React.lazy(() => import('./views/accounts/PayeDetails'))
const Memberapprover = React.lazy(() => import('./views/approver/Memberapprover'))
const Approvername = React.lazy(() => import('./views/approver/Approvername'))
const Import = React.lazy(() => import('./views/import/import'))
const Export = React.lazy(() => import('./views/export/export'))
const impcreatejob = React.lazy(() => import('./views/import/impcreatejob'))
const impeditjob = React.lazy(() => import('./views/import/impeditjob'))
const expcreatejob = React.lazy(()=> import('./views/export/expcreatejob'))
const expeditjob = React.lazy(()=> import('./views/export/expeditjob'))
const organization = React.lazy(() => import('./views/organization/organization'))
const CreateOrg = React.lazy(() => import('./views/organization/CreateOrg'))
const EditOrg = React.lazy(() => import('./views/organization/EditOrg'))
const addnewBranch = React.lazy(() => import('./views/organization/Innerpage/addnewBranch'))
const NewUser = React.lazy(() => import('./views/new_user/NewUser'))
const branches = React.lazy(() => import('./views/branches/branches'))
const branchlist = React.lazy(() => import('./views/branches/branchlist'))
const UserList = React.lazy(() => import('./views/userlist/UserList'))
const NewKYCAccess = React.lazy(() => import('./views/userlist/InnerPage/NewKYCAccess'))
const workflow = React.lazy(() => import('./views/workflow/workflow'))
const setWorkflow = React.lazy(() => import('./views/workflow/Innerpage/setWorkflow'))
const TAT = React.lazy(() => import('./views/tat/tat'));
// const generateReport = React.lazy(() => import('./views/userreport/generateReport'));
const IMPTAT = React.lazy(() => import('./views/tat/InnerPage/ImpTAT'))
const UserListAccess = React.lazy(() => import('./views/userlist/InnerPage/UserListAccess'))
const Mailing = React.lazy(() => import('./views/mailing/Mailing'))
const User_Report = React.lazy(() => import('./views/user_report/User_Report'))
const individualUserReport = React.lazy(() => import('./views/user_report/individualUserReport'))
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
  // {
  //   path: '/forgetpassword' , element:ForgetPassword
  // },
  { path: '/dashboard', element: Dashboard },
  { path: '/import', element: Import },
  { path: '/export', element: Export },
  { path: '/impcreatejob', element: impcreatejob },
  { path: '/impdetails', element: impdetails },
  { path: '/impOwnTransport', element: impOwnTransport },
  { path: '/impOwnBooking', element: impOwnBooking },
  { path: '/impCompletedOnTime', element: impCompletedOnTime },
  { path: '/expCompletedOnTime', element: expCompletedOnTime },
  { path: '/expOwnBooking', element: expOwnBooking },
  { path: '/expOwnTransport', element: expOwnTransport },

  { path: '/impDelayedJobs', element: impDelayedJobs },
  { path: '/expDelayedJobs', element: expDelayedJobs },
  { path: '/expdetails', element: expdetails },

  { path: '/expeditjob', element: expeditjob },
  { path: '/impeditjob', element: impeditjob },
  { path: '/expcreatejob', element: expcreatejob },
  { path: '/organization', element: organization },
  { path: '/Createorg', element: CreateOrg },
  { path: '/Editorg', element: EditOrg },
  { path: '/addnewBranch', element: addnewBranch },
  { path: '/new_user', element: NewUser },
  { path: '/userlist', element: UserList },
  { path: '/NewKYCAccess', element: NewKYCAccess },
  { path: '/tat', element: TAT },
  // { path: '/PaymentSheet', element: PaymentSheet },
  { path: '/PaymentSheetCredit', element: PaymentSheetCredit },
  { path: '/PaymentSheetCreditCreate', element: PaymentSheetCreditCreate },
  { path: '/OwnVehicleCreate', element: OwnVehicleCreate },
  { path: '/OwnVehicleOutsideCreate', element: OwnVehicleOutsideCreate },
  { path: '/ReturnLoadOwnVehicleCreate', element: ReturnLoadOwnVehicleCreate },
  { path: '/OutsideVehicleCreate', element: OutsideVehicleCreate },
  { path: '/DieselOwnVehicleCreate', element: DieselOwnVehicleCreate },
  { path: '/TaxANDInsuranceOwnVehicleCreate', element: TaxANDInsuranceOwnVehicleCreate },
  { path: '/TollTaxOwnVehicleCreate', element: TollTaxOwnVehicleCreate },
  { path: '/MaintenanceOwnVehicleCreate', element: MaintenanceOwnVehicleCreate },
  { path: '/DriverSalaryCreate', element: DriverSalaryCreate },
  { path: '/EMIVehicleCreate', element: EMIVehicleCreate },
  { path: '/TransportDepartmentSalaryCreate', element: TransportDepartmentSalaryCreate },
  { path: '/CashCreate', element: CashCreate },
  { path: '/AllTransportation', element: AllTransportation },
  { path: '/Expenses', element: Expenses },
  { path: '/Uneed', element: Uneed },
  { path: '/TransportPlanning', element: TransportPlanning },
  { path: '/PaymentSheetDebitCreate', element: PaymentSheetDebitCreate },
  { path: '/PaymentSheetDebit', element: PaymentSheetDebit },
  { path: '/Prospect', element: Prospect },
  { path: '/salesProspects', element: salesProspects },
  { path: '/salesEnquiry', element: salesEnquiry },
  { path: '/salesQuotations', element: salesQuotations },
  { path: '/ProspectCreate', element: ProspectCreate },
  { path: '/NewEnquiryCreate', element: NewEnquiryCreate },
  { path: '/NewEnquiry', element: NewEnquiry },
  { path: '/Quotation', element: Quotation },
  { path: '/QuoEdit', element: QuoEdit },
  { path: '/EditLogs', element: EditLogs },
  { path: '/transportDetails', element: transportDetails },
  { path: '/transportOwnVehicles', element: transportOwnVehicles },
  { path: '/transportOutsideVehicles', element: transportOutsideVehicles },
  { path: '/freightForwardingDetails', element: freightForwardingDetails },
  { path: '/accountsDetails', element: accountsDetails },
  { path: '/accountsAdvance', element: accountsAdvance },
  { path: '/accountsOutstanding', element: accountsOutstanding },
  { path: '/accountsMilestoneReoprt', element: accountsMilestoneReport },
  { path: '/accountsBankDetails', element: accountsBankDetails },



  { path: '/BankDetails', element: BankDetails },
  { path: '/PayeDetails', element: PayeDetails },
  { path: '/branches', element: branches },
  { path: '/branchlist', element: branchlist },
  { path: '/ImpTAT', element: IMPTAT },
  { path: '/UserListAccess/:username', element: UserListAccess },
  { path: '/mailing', element: Mailing },
  {path : '/passReq', element: changeReq},
  { path: '/User_Report', element: User_Report },
  { path: '/individualUserReport', element: individualUserReport },
  { path: '/Generate_Report', element: Generate_Report },
  { path: '/workflow', element: workflow },
  { path: '/setWorkflow', element: setWorkflow },
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
  { path: '/approvername', name: 'Approvername', element: Approvername },
  { path: '/memberapprover', name: 'Memberapprover', element: Memberapprover },
  { path: '/userroles', name: 'User Roles', element: UserRole },
  { path: '/approverlog', name: 'Approver Log', element: ApproverLog },
  { path: '/recyclebin', name: 'Recycle Bin', element: RecycleBin },
  { path: '/notifyrender', name: 'Notify Render', element: NotifyRender },
  { path: '/FourZeroFour', name: 'FourZeroFour', element: FourZeroFour },
  { path: '/FourZeroThree', name: 'FourZeroFour', element: FourZeroThree },
  { path: '/FourZeroOne', name: 'FourZeroFour', element: FourZeroOne },
  { path: '/FiveZeroZero', name: 'FourZeroFour', element: FiveZeroZero },
  { path: '/FiveZeroThree', name: 'FourZeroFour', element: FiveZeroThree },
  { path: '/delegations', name: 'delegations', element: delegations },

  { path: '/connectSpace', name: 'Connect Space', element: ConnectSpace },
]

export default routes
