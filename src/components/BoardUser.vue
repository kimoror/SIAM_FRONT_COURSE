<template>
  <div class="container">
    <div class="card card-container">
      <Form @submit="handleUserInfo">
        <div v-if="!successful">
          <div class="form-group">
            <label for="name">Имя</label>
            <Field name="name" type="text" class="form-control" />
            <ErrorMessage name="name" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="surname">Фамилия</label>
            <Field name="surname" type="text" class="form-control" />
            <ErrorMessage name="surname" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="middleName">Отчество</label>
            <Field name="middleName" type="text" class="form-control" />
            <ErrorMessage name="middleName" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="birthday">Дата рождения</label>
            <Field name="birthday" type="date" class="form-control" />
            <ErrorMessage name="birthday" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="address">Адрес</label>
            <Field name="address" type="text" class="form-control" />
            <ErrorMessage name="address" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="status">Рабочий статус</label>
            <Field name="status" type="text" class="form-control" />
            <ErrorMessage name="status" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="company_id">Id компании</label>
            <Field name="company_id" type="text" class="form-control" />
            <ErrorMessage name="company_id" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="workPosition">Должность</label>
            <Field name="workPosition" type="text" class="form-control" />
            <ErrorMessage name="workPosition" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="education">Образование</label>
            <Field name="education" type="text" class="form-control" />
            <ErrorMessage name="education" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="school">Школа</label>
            <Field name="school" type="text" class="form-control" />
            <ErrorMessage name="school" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="university">Университет</label>
            <Field name="university" type="text" class="form-control" />
            <ErrorMessage name="university" class="error-feedback" />
          </div>
          <div class="form-group">
            <label for="phoneNumber">Номер телефона</label>
            <Field name="phoneNumber" type="text" class="form-control" />
            <ErrorMessage name="phoneNumber" class="error-feedback" />
          </div>

          <div class = "form-group">
            <button class="btn btn-primary btn-block" :disabled="loading">
                            <span
                                v-show="loading"
                                class="spinner-border spinner-border-sm" />
              Add user info
            </button>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import userService from '../services/user.service.js';

export default {
  name: "AddInfo",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      name:yup
          .string()
          .required('Name is required'),
      middleName: yup
          .string(),
      surname: yup
          .string()
          .required('Surname is required'),
      birthday: yup
          .date()
          .required('Name is required'),
      address: yup
          .string(),
      status: yup
          .string(),
      company_id: yup
          .number,
      workPosition: yup
          .string,
      education: yup
          .string,
      school: yup
          .string,
      university: yup
          .string,
      phoneNumber: yup
          .string

    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    }
  },
  methods: {
    handleUserInfo(userInfo){
      userService.addInfo(userInfo);
    }
  }
}
</script>