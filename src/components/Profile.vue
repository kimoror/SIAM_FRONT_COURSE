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
        <div class="form-group">
          <button  type="submit" class="input-group-text">upload</button>
        </div>
      </form>
    </div>
    <div>
      <Form  @submit="createPost">
        <textarea id="post-form" v-model="post.text" type="text"></textarea>
        <button>Создать пост</button>
      </Form>
    </div>
    <div class="card text-center bg-dark mb-3" style="max-width: 18rem" v-for="post in allPosts" :key="post.id">
      <div class="card-body">
        <p class="card-text text-white">{{post.text}}</p>
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
      resumeName: '',
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
    }
  }
}
</script>

<style scoped>

</style>