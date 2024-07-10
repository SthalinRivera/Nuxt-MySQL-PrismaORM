<template>
  <div>
   <h1>users </h1>

   <table class="table">
  <thead>
    <tr >
      <th scope="col" >#</th>
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col">created_at</th>
      <th scope="col">updated_at</th>    
        <th scope="col">action</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(user, index) in user">
      <th scope="col" >{{ index+1 }}</th>
      <th scope="col">{{ user.name }}</th>
      <th scope="col">{{ user.email }}</th>
      <th scope="col">{{ user.created_at }}</th>
      <th scope="col">{{ user.updated_at }}</th>
      <th scope="col">
        <button type="button" class="btn btn-success">edit</button>
<button type="button" class="btn btn-danger">delete</button>
      </th>
    </tr>
    
  </tbody>
</table>
  </div>
</template>
<script setup>

const user = ref(null)
user.value=await getUser()
console.log(user.value);
//** @desc get users */
async function getUser(){
 return await $fetch('/api/users')
}

useHead({
  link:{
    rel:"stylesheet",
    href:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    type:"text/css",
  },
  script:{
    src:"https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
  }
})
</script>