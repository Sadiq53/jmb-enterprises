import * as yup from 'yup'

const ManageTagsSchema = yup.object({
    pending_records : yup.number().required("Input Is Required"),
    in_yard_records : yup.number().required("Input Is Required"),
    release_records : yup.number().required("Input Is Required"),
    hold_records : yup.number().required("Input Is Required"),
  });

export default ManageTagsSchema;