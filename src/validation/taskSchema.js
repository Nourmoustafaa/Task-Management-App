import * as yup from 'yup';
const taskSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required')
    .max(30, 'Title should not exceed 50 characters'),
  description: yup
    .string()
    .required('Description is required')
    .max(200, 'Description should not exceed 200 characters'),
  priority: yup
    .mixed()
    .oneOf(['Low', 'Medium', 'High'], 'Select a valid priority level')
    .required('Select a priority level'),
  state: yup
    .mixed()
    .oneOf(['todo', 'doing', 'done'], 'Select a valid state')
    .required('Select a state'),
    image: yup
    .mixed()
    .required('An image file is required')
    .test('fileType', 'Select a valid image ', value => {
      if (!value) return false;
      return value.length > 0 && value[0].type.startsWith('image/');
    }),
});

export default taskSchema;
