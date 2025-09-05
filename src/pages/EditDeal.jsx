import {
    useLoaderData,
    useNavigate,
    Form,
    redirect,
    useActionData,
} from 'react-router-dom'
import FormDeal from '../components/FormDeal'
import { getDealId, updateDeal } from '../data/deals'

export async function loader({ params }) {
    const deal = await getDealId(params.dealId)
    return deal
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

    await updateDeal(params.dealId, data)
    return redirect('/deals')
}

function EditDeal() {
    const deal = useLoaderData()
    return <FormDeal deal={deal} />
}

export default EditDeal