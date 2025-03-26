import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik'
import { TUser } from '../types';

const FormSchema = Yup.object().shape({
  name: Yup.string().max(50, "Maximum 50 characters allowed").required('Name is required'),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().oneOf(["male", "female", "other"]).required("Gender is required"),
  bio: Yup.string().max(100, "Maximum 100 characters are allowed").optional()
})

interface UserFormProps {
  user?: TUser,
  onSubmit: (user: TUser) => Promise<void | { TUserField: string }>
  onEdit: (user: TUser) => void
}

function UserForm(props: Readonly<UserFormProps>) {

  const { user, onSubmit } = props;

  const isEditng = user !== undefined;

  const onFormSubmit = (value: TUser, helpers: FormikHelpers<TUser>) => {
    // update the store / state

    if (isEditng) {
      props.onEdit(user)
    } else {
      onSubmit(value).then(() => {
        helpers.resetForm()
        // TODO: reset form
      }).catch(err => {
        helpers.setErrors({ "email": err?.email })
      });
    }
  }

  return (
    <div>
      <h1>{isEditng ? "Edit" : "Add"} User Form</h1>
      <Formik initialValues={user ? user : {
        name: "",
        email: "",
        gender: "male", // FIXME: Set none initially
        bio: ""
      }}
        validationSchema={FormSchema}
        onSubmit={onFormSubmit}
      >
        {({ isValid }) => (
          <Form>
            <label htmlFor="name">Name:</label>
            <Field name="name" />
            <ErrorMessage name="name" />
            <label htmlFor="email">Email</label>
            <Field name="email" />
            <ErrorMessage name="email" />
            <p className='gender-label'>Gender</p>
            <div role="group">
              <label>
                <Field type="radio" name="gender" value="male" />
                Male
              </label>
              <label>
                <Field type="radio" name="gender" value="female" />
                Female
              </label>
              <label>
                <Field type="radio" name="gender" value="other" />
                Female
              </label>
            </div>
            <ErrorMessage name="gender" />
            <label htmlFor="bio">Bio</label>
            <Field name="bio" as="textarea" />
            <ErrorMessage name="bio" />
            <button type="submit" disabled={!isValid}>Add user</button>
          </Form>
        )}
      </Formik>
    </div >
  )
}

export default UserForm