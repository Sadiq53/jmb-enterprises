import * as yup from 'yup'

const AddDataSchema = yup.object({
    upload_file: yup.mixed().required('A file is required'),
    bank : yup.string().required("Select Bank")
  });

export default AddDataSchema;