import {
    useLoaderData,
    useNavigate,
    Form,
    redirect,
    useActionData,
} from 'react-router-dom'
import FormContact from '../components/FormContact'
import { getContactId, updateContact } from '../data/contacts'

export async function loader({ params }) {
    const contact = await getContactId(params.contactId)
    return contact
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

    await updateContact(params.contactId, data)
    return redirect('/contacts')
}

function EditContact() {
    const contact = useLoaderData()
    return <FormContact contact={contact} />
}

export default EditContact