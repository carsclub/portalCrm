import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FormProject, { action as newProject } from './components/FormProject'
import FormCustomer, { action as newCustomer } from './components/FormCustomer'
import FormDeal, { action as newDeal } from './components/FormDeal'
import FormContact, { action as newContact } from './components/FormContact'
import Dashboard, { loader as dashboardLoader } from './pages/Dashboard'
import Customers, { loader as customersLoader } from './pages/Customers'
import Deals, { loader as dealsLoader } from './pages/Deals'
import Contacts, { loader as contactsLoader } from './pages/Contacts'
import EditProject, {
    loader as editProject,
    action as editedProject,
} from './pages/EditProject'
import EditCustomer, {
    loader as editCustomer,
    action as editedCustomer,
} from './pages/EditCustomer'
import EditDeal, {
    loader as editDeal,
    action as editedDeal,
} from './pages/EditDeal'
import EditContact, {
    loader as editContact,
    action as editedContact,
} from './pages/EditContact'
import Layout from './pages/Layout'
import Projects from './pages/Projects'
import { action as deleteProject } from './components/BoxProject'
import { action as deleteCustomer } from './components/CustomerCard'
import { action as deleteDeal } from './components/DealCard'
import { action as deleteContact } from './components/ContactCard'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Dashboard />,
                loader: dashboardLoader,
            },
            {
                path: '/customers',
                element: <Customers />,
                loader: customersLoader,
            },
            {
                path: '/customers/new',
                element: <FormCustomer />,
                action: newCustomer,
            },
            {
                path: '/customers/:customerId/edit',
                element: <EditCustomer />,
                loader: editCustomer,
                action: editedCustomer,
            },
            {
                path: '/customers/:customerId/remove',
                action: deleteCustomer,
            },
            {
                path: '/deals',
                element: <Deals />,
                loader: dealsLoader,
            },
            {
                path: '/deals/new',
                element: <FormDeal />,
                action: newDeal,
            },
            {
                path: '/deals/:dealId/edit',
                element: <EditDeal />,
                loader: editDeal,
                action: editedDeal,
            },
            {
                path: '/deals/:dealId/remove',
                action: deleteDeal,
            },
            {
                path: '/contacts',
                element: <Contacts />,
                loader: contactsLoader,
            },
            {
                path: '/contacts/new',
                element: <FormContact />,
                action: newContact,
            },
            {
                path: '/contacts/:contactId/edit',
                element: <EditContact />,
                loader: editContact,
                action: editedContact,
            },
            {
                path: '/contacts/:contactId/remove',
                action: deleteContact,
            },
            {
                path: '/projects',
                element: <Projects />,
            },
            {
                path: '/projects/new',
                element: <FormProject />,
                action: newProject,
            },
            {
                path: '/projects/:projectId/edit',
                element: <EditProject />,
                loader: editProject,
                action: editedProject,
            },
            {
                path: '/projects/:projectId/remove',
                action: deleteProject,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
