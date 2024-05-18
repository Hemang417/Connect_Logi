import React, { useEffect, useState, useCallback } from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

import { Mailing } from './views/mailing'

const isAdmin = localStorage.getItem('username') === 'admin';


const _nav = [

  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Organization',
    to: '/organization',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'ApproverLog',
    to: '/approverlog',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: localStorage.getItem('countofremainingrows'),
    },
  },
  {
    component: CNavItem,
    name: 'Import',
    to: '/import',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Export',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,

    items: [
      {
        component: CNavItem,
        name: 'Job Creation & Process',
        to: '/forms/select',
      },

      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },

    ],
  },

  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,

    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,

    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Admin',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,

    items: [
      {
        component: CNavItem,
        name: 'New User',
        to: '/new_user',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'User Report',
        to: '/user_report',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'User List',
        to: '/userlist',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'TAT',
        to: '/tat',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Workflow',
        to: '/workflow',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Mailing',
        to: '/mailing',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Create Branch',
        to: '/branches',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Branch List',
        to: '/branchlist',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Approvers',
        to: '/approvername',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'User Role',
        to: '/userroles',
        icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />
      }

    ],
  },



  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,

    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,

    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]




const visibleNav = isAdmin
  ? _nav // If isAdmin is true, show all items
  : _nav.filter(item => item.name !== 'Admin'); // Exclude "New User" and "User List" if isAdmin is false


// export default visibleNav;
export default visibleNav
















