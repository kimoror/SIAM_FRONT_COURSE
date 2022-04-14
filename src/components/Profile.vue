<template>
  <div class="container-fluid">
    <div>
      <p>
      <strong>Id:</strong>
      {{currentUser.id}}
      </p>
      <p>
        <strong>Email:</strong>
        {{currentUser.email}}
      </p>
      <ul>
        <li v-for="role in currentUser.roles" :key="role">{{role}}</li>
      </ul>
    </div>
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
    <Form @submit="createPost" class="input-group">
      <div class="input-group-prepend">
        <span class="input-group-text">Ваш пост</span>
      </div>
      <textarea id="post-form" v-model="post.text" type="text" class="form-control" aria-label="With textarea"></textarea>
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
      resumeName: 'Выберите файл',
      fileArray: [],
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  mounted() {
    console.log(this.currentUser)
    if(!this.currentUser){
      this.$router.push("/login");
    }
    this.getAllPosts()
  },
  methods:{
    createPost(){
      UserPostService.createPost(this.post)
      this.post=""
      setTimeout(() =>{this.getAllPosts();}, 300)

    },
    getAllPosts(){
      UserPostService.getAllPosts().then(
          response => {
            this.allPosts = response.data.params;
          }
      )
    },
    onChange (event) {
      this.fileArray = event.target.files[0]
      this.resumeName = this.fileArray.name
    },
    uploadResume() {
      UserService.uploadResume(this.fileArray);
      this.resumeName = ''
    },
    deletePost(id){
      UserPostService.deletePost(id)
      setTimeout(() =>{this.getAllPosts();}, 300)
    }
  }
}
</script>

<style scoped>

</style>