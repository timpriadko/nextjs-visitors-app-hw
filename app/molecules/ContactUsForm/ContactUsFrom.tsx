"use client";

import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import GreenCheckMarkVerified from "../../assets/greenCheckMarkVerified.svg";
import styles from "./contactUsFrom.module.scss";
import { useEffect, useState } from "react";
import useAxios from "axios-hooks";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("User name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

interface FormData {
  username: string;
  email: string;
  message: string;
}

const initialValues: FormData = {
  username: "",
  email: "",
  message: "",
};

const ContactUsForm = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  // const handleSubmit = (values: FormData) => {
  //   console.log(values);
  //   setIsFormSubmitted(true);
  // };

  // const [
  //   { data: formFetchData, loading: formFetchLoading, error: formFetchError },
  //   refetch,
  // ] = useAxios({
  //   url: "/api/contactUsFrom",
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });

  const handleSubmit = async (values: FormData) => {
    // e.preventDefault();
    // if (candidat.lastName === "" || candidat.firstName === "")
    //   return alert("last name or first name is empty");

    await fetch("/api/contactUsFrom", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      // .then(() => setIsFormSubmitted(true));
      .then((data) => {
        console.log("res-handleSubmit", {
          data,
          "JSON.stringify(values)": JSON.stringify(values),
        });
        setIsFormSubmitted(true);
      });

    // await refetch({
    //   data: values,
    // })
    //   .then((res) => res)
    //   .then((data) => {
    //     console.log("data-handleSubmit", {
    //       data,
    //       // "JSON.stringify(values)": JSON.stringify(values),
    //     });
    //     setIsFormSubmitted(true);
    //   });
  };

  // useEffect(() => {
  //   // todo - rm
  //   console.log("formFetchData", { formFetchData });
  // }, [formFetchData]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) =>
        isFormSubmitted ? (
          <div className='text-green-500'>
            <p className='text-center mb-3'>Your message is sent!</p>
            <GreenCheckMarkVerified className='mx-auto mb-2' />
          </div>
        ) : (
          <Form className={cx(styles.form, "max-w-3xl mx-auto")}>
            <div
              className={cx(styles.formItem, {
                [styles["error"]]: errors.username && touched.username,
              })}
            >
              <label htmlFor='username'>User Name</label>
              <Field type='text' name='username' />
              <ErrorMessage
                name='username'
                component='div'
                className={cx(styles.error)}
              />
            </div>

            <div
              className={cx(styles.formItem, {
                [styles["error"]]: errors.email && touched.email,
              })}
            >
              <label htmlFor='email'>Email</label>
              <Field type='email' name='email' />
              <ErrorMessage
                name='email'
                component='div'
                className={cx(styles.error)}
              />
            </div>

            <div
              className={cx(styles.formItem, {
                [styles["error"]]: errors.message && touched.message,
              })}
            >
              <label htmlFor='message'>Message</label>
              <Field as='textarea' name='message' />
              <ErrorMessage
                name='message'
                component='div'
                className={cx(styles.error)}
              />
            </div>

            <button
              type='submit'
              className='block mx-auto mt-3 border-solid border-2 border-gray-500 px-5 py-2 rounded-md hover:bg-gray-500 hover:text-neutral-100 ease-out duration-100'
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
