import * as yup from 'yup'

const AddMemberSchema = yup.object({
    member_name : yup.string().required("Enter Member Name"),
    member_email : yup.string().email().required("Enter Email Address"),
    member_phone : yup.number().typeError("Enter a Valid Number").min(1000000000).max(9999999999).required("Enter Phone Number"),
    address : yup.string().required("Enter Address")
})

export default AddMemberSchema;