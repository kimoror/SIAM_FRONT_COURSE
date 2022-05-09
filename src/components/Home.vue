<template>
  <div class="container">
    <div v-if="content.length !== 0">
    <header class="jumbotron">
      <h3 class="text-center" >Последние посты за сегодняшний день</h3>
    </header>
      <div class="card mx-auto text-center bg-light mb-4" style="max-width: 30rem; border-radius: 20px" v-for="post in content" :key="post.id">
        <div class="card-body">
          <p style="" class="card-text text-dark">{{post.text}}</p>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg" @click="getUserInfoById(post.userId)">Информация об авторе</button>
          <div  class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
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
                    <p v-if="userInfo.email">
                      <strong>Email:</strong>
                      {{userInfo.email}}
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
                    <button class="btn btn-outline-secondary" @click="getResumeFile(currentUser.email)">
                      Скачать последнее резюме
                    </button>
                  </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
  <div v-if="content.length === 0">
    <header class="jumbotron">
      <h3 class="text-center">Станьте первыми, кто напишет сегодня пост</h3>
    </header>
  </div>
  </div>
</template>

<script>
import PostService from '../services/user-post.service'
import UserService from '../services/user.service'

export default {
  name: "Home.vue",
  data() {
    return {
      content: [],
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
        phoneNumber: '',
        email:''
      }
    };
  },
  mounted() {
    this.getLastPosts()
  },
  methods: {
    getLastPosts(){
      PostService.getLastPosts().then(response => {
        this.content = response.data.params.reverse();
      })
    },
    getUserInfoById(id){
      UserService.getInfoById(id).then(response => {
        this.userInfo = response.data.params
      })
    },
    getResumeFile(email) {
      UserService.getLastResumeByEmail(email).catch(function (error){
        alert("У этого пользователя нет резюме")
        error.content
      }).then(response => {
        const blob = new Blob([response.data], {type: "application/pdf"})
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = email + ".pdf";
        link.click();
        URL.revokeObjectURL(link.href);
      })
    }
  }
}
</script>

<style scoped>

</style>