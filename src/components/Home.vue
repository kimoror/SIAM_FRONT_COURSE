<template>
  <div class="container">
    <div v-if="content.length !== 0">
    <header class="jumbotron">
      <h3 class="text-center" >Последние посты за сегодняшний день</h3>
    </header>
      <div class="card mx-auto text-center bg-light mb-4" style="max-width: 30rem; border-radius: 20px" v-for="post in content" :key="post.id">
        <div class="card-body">
          <p style="" class="card-text text-dark">{{post.text}}</p>
        </div>
      </div>
    </div>
    <div v-else>
      <header class="jumbotron">
        <h3 class="text-center">Станьте первыми, кто напишет сегодня пост</h3>
      </header>
    </div>

<!--    <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Большое модальное окно</button>-->

<!--    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">-->
<!--      <div class="modal-dialog modal-lg">-->
<!--        <div class="modal-content">-->
<!--          -->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->


  </div>

</template>

<script>
import PostService from '../services/user-post.service'

export default {
  name: "Home.vue",
  data() {
    return {
      content: []
    };
  },
  mounted() {
    this.getLastPosts()
  },
  methods: {
    getLastPosts(){
      this.content = PostService.getLastPosts().then(response => {
        this.content = response.data.params;
        console.log(response.data.params.length)
        console.log(this.content.length !== 0)
      })
    }
  }
}
</script>

<style scoped>

</style>