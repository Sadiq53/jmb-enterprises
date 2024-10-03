import * as yup from 'yup'

const DeleteFileSchema = yup.object({
    file : yup.string().required("Select A File")
})

export default DeleteFileSchema;