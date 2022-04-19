<template>
  <div class="container-fluid">
    <div>
      <p v-if="userInfo.name">
        <strong>Имя:</strong>
        {{userInfo.name}}
      </p>
      <p v-if="userInfo.surname">
        <strong>Фамилия:</strong>
        {{userInfo.surname}}
      </p>
      <p v-if="userInfo.middleName">
        <strong>Отчество:</strong>
        {{userInfo.middleName}}
      </p>
      <p v-if="userInfo.phoneNumber">
        <strong>Номер телефона:</strong>
        {{userInfo.phoneNumber}}
      </p>
      <p v-if="currentUser.email">
        <strong>Email:</strong>
        {{currentUser.email}}
      </p>
      <p v-if="userInfo.address">
        <strong>Адрес:</strong>
        {{userInfo.address}}
      </p>
      <p v-if="userInfo.status">
        <strong>Рабочее положение:</strong>
        {{userInfo.status}}
      </p>
      <p v-if="userInfo.workPosition">
        <strong>Должность:</strong>
        {{userInfo.workPosition}}
      </p>
      <p v-if="userInfo.education">
        <strong>Образование:</strong>
        {{userInfo.education}}
      </p>
      <p v-if="userInfo.school">
        <strong>Школа:</strong>
        {{userInfo.school}}
      </p>
      <p v-if="userInfo.university">
        <strong>Университет:</strong>
        {{userInfo.university}}
      </p>
    </div>
    <table class="table table-bordered table-hover">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Номер</th>
          <th scope="col">Название файла</th>
          <th class="text-center" scope="col">Скачать</th>
          <th class="text-center" scope="col">Удалить</th>
        </tr>
      </thead>
      <tbody v-for="resume in allResumes" :key="allResumes.indexOf(resume)">
        <tr>
          <th scope="row">{{allResumes.indexOf(resume) + 1}}</th>
          <td>{{JSON.parse(resume).resumeName}}</td>
          <td class="text-center">
            <button class="btn btn-outline-secondary" @click="getResumeFile(JSON.parse(resume).resumeName)">
              Скачать
            </button>
          </td>
          <td class="text-center">
            <button class="btn btn-outline-secondary" @click="deleteResumeById(JSON.parse(resume).resumeName)">
              Удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div>Загрузить резюме:</div>
    <div>
      <form class="input-group mb-3" @submit.prevent="uploadResume">
        <div class="custom-file">
          <label class="custom-file-label" for="fileArray">{{resumeName}}</label>
          <input class="custom-file-input" type="file" id="fileArray" name="fileArray" @change="onChange">
        </div>
        <div class="input-group-append">
          <button  type="submit" class="btn btn-outline-secondary">Upload</button>
        </div>
      </form>
    </div>
    <Form @submit="createPost" class="input-group was-validated">
      <div class="input-group-prepend">
        <span class="input-group-text">Ваш пост</span>
      </div>
      <textarea id="post-form" v-model="post.text" type="text" class="form-control is-invalid" aria-label="With textarea" required></textarea>
      <div class="input-group-append">
        <button type="submit" class="btn btn-outline-secondary">Создать пост</button>
      </div>
    </Form>
    <p style="padding: 3% " class="text-center h3">Мои посты:</p>
    <div class="card mx-auto text-center bg-light mb-4" style="max-width: 30rem; border-radius: 20px" v-for="post in allPosts" :key="post.id">
      <div class="card-body">
        <p style="" class="card-text text-dark">{{post.text}}</p>
        <button class="btn btn-block btn-outline-secondary" style="border-radius: 7px" @click="deletePost(post.id)">Удалить</button>
      </div>
    </div>

  </div>
</template>

<script>
import UserPostService from '../services/user-post.service.js'
import UserService from '../services/user.service.js'
import { Form } from "vee-validate";

export default {
  name: "Profile.vue",
  components: {
    Form
  },
  data(){
    return {
      post: {
        text:''
      },
      allPosts:[],
      allResumes: [],
      resumeName: 'Выберите файл pdf',
      fileArray: [],
      userInfo: {
        name: '',
        surname: '',
        middleName: '',
        birthday: '',
        address: '',
        status: '',
        company_id: '',
        workPosition: '',
        education: '',
        school: '',
        university: '',
        phoneNumber: ''
      }
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    if(!this.currentUser){
      this.$router.push("/login");
    }
    this.getUserInfo()
    this.getAllPosts()
    this.getResumes()
  },
  methods: {
    createPost() {
      if (this.post.text !== '') {
        UserPostService.createPost(this.post)
        this.post.text = ''
        setTimeout(() => {
          this.getAllPosts();
        }, 300)
      }

    },
    getAllPosts() {
      UserPostService.getAllPosts().then(
          response => {
            this.allPosts = response.data.params;
          }
      )
    },
    onChange(event) {
      this.fileArray = event.target.files[0]
      this.resumeName = this.fileArray.name
    },
    uploadResume() {
      UserService.uploadResume(this.fileArray);
      this.resumeName = ''
      setTimeout(() => {
        this.getResumes();
      }, 300)
    },
    deletePost(id) {
      UserPostService.deletePost(id)
      setTimeout(() => {
        this.getAllPosts();
      }, 300)
    },
    getUserInfo() {
      UserService.getInfo().then(response => {
        this.userInfo = response.data.params
      })
    },
    getResumes() {
      UserService.getAllResumes().then(response => {
        this.allResumes = response.data
      })
    },
    deleteResumeById(resumeName) {
      UserService.deleteResumeById(resumeName)
      setTimeout(() => {
        this.getResumes();
      }, 300)
    },
    getResumeFile(resumeName) {
      UserService.getResumeByName(resumeName)
    }
  }
}
</script>

<style scoped>

</style>