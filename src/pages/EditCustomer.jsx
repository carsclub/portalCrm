import {
    useLoaderData,
    useNavigate,
    Form,
    redirect,
    useActionData,
} from 'react-router-dom'
import FormCustomer from '../components/FormCustomer'
import { getCustomerId, updateCustomer } from '../data/customers'

export async function loader({ params }) {
    const customer = await getCustomerId(params.customerId)
    return customer
}

export async function action({ params, request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    const error = []
    if (Object.values(data).includes('')) {
        error.push('⛔ All the fields are required. ⛔')
    }

    if (Object.keys(error).length) {
        return error
    }

    await updateCustomer(params.customerId, data)
    return redirect('/customers')
}

function EditCustomer() {
    const customer = useLoaderData()
    return <FormCustomer customer={customer} />
}

export default EditCustomer