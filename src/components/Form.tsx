import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik'
import { TUser } from '../types';

const FormSchema = Yup.object().shape({
  name: Yup.string().max(50, "Maximum 50 characters allowed").required('Name is required'),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().oneOf(["male", "female", "other"]).required("Gender is required"),
  bio: Yup.string().max(100, "Maximum 100 characters are allowed").optional()
})

interface UserFormProps {
  user: TUser
}

function UserForm() {

  const onFormSubmit = () => {
    // update the store / state
    // reset form
  }

  return (
    <div>
      {/* TODO: Update the form title */}
      <h1>User Form</h1>
      <Formik initialValues={{
        name: "",
        email: "",
        gender: "",
        bio: ""
      }}
        validationSchema={FormSchema}
        onSubmit={onFormSubmit}
      >
        {() => (
          <Form>
            <label htmlFor="name">Name:</label>
            <Field name="name" />
            <label htmlFor="email">Email</label>
            <Field name="email" />
            <p className='gender-label'>Gender</p>
            <div role="group">
              <label>
                <Field type="radio" name="gender" value="Male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="Female" />
                Female
              </label>
              <label>
                <Field type="radio" name="gender" value="Other" />
                Female
              </label>
            </div>
            <label htmlFor="bio">Bio</label>
            <Field name="bio" as="textarea" />
          </Form>
        )}
      </Formik>
    </div >
  )
}

export default UserForm