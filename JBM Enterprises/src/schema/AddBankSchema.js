import * as yup from 'yup'

const AddBankSchema = yup.object({
    bank : yup.string().required("Enter Bank Name")
})

export default AddBankSchema;