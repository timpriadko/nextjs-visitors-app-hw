'use client';

import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import cx from 'classnames';
import GreenCheckMarkVerified from '../../assets/greenCheckMarkVerified.svg';
import styles from './contactUsFrom.module.scss';
import { useState } from 'react';

const validationSchema = Yup.object().shape({
  username: Yup.string().required('User name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  message: Yup.string().required('Message is required'),
});

interface FormData {
  username: string;
  email: string;
  message: string;
}

const initialValues: FormData = {
  username: '',
  email: '',
  message: '',
};

const ContactUsForm = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const handleSubmit = (values: FormData) => {
    console.log(values);
    setIsFormSubmitted(true);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) =>
        isFormSubmitted ? (
          <div className="text-green-500">
            <p className="text-center mb-3">Your message is sent!</p>
            <GreenCheckMarkVerified className="mx-auto mb-2" />
          </div>
        ) : (
          <Form className="max-w-2xl mx-auto">
            <div
              className={cx(styles.formItem, {
                [styles['error']]: errors.username && touched.username,
              })}
            >
              <label htmlFor="username">User Name</label>
              <Field type="text" name="username" />
              <ErrorMessage
                name="username"
                component="div"
                className={cx(styles.error)}
              />
            </div>

            <div
              className={cx(styles.formItem, {
                [styles['error']]: errors.email && touched.email,
              })}
            >
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" />
              <ErrorMessage
                name="email"
                component="div"
                className={cx(styles.error)}
              />
            </div>

            <div
              className={cx(styles.formItem, {
                [styles['error']]: errors.message && touched.message,
              })}
            >
              <label htmlFor="message">Message</label>
              <Field as="textarea" name="message" />
              <ErrorMessage
                name="message"
                component="div"
                className={cx(styles.error)}
              />
            </div>

            <button
              type="submit"
              className="block mx-auto mt-3 border-solid border-2 border-gray-500 px-5 py-2 rounded-md hover:bg-gray-500 hover:text-neutral-100 ease-out duration-100"
            >
              Submit
            </button>
          </Form>
        )
      }
    </Formik>
  );
};

export default ContactUsForm;
