<template>
  <div>
    <h1>users </h1>
    <div class="container">
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" v-model="editedUser.email" class="form-control" id="exampleInputEmail1"
                  aria-describedby="emailHelp">
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Name</label>
                <input type="text" v-model="editedUser.name" class="form-control" id="exampleInputPassword1">
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                @click="$event => editUser(editedUser)">Save changes</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="error" class="alert alert-warning alert-dismissible fade show" role="alert">
        <strong>Error!</strong> user
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
          @click="$event => error = null"></button>
      </div>
      <form>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" v-model="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Name</label>
          <input type="text" v-model="name" class="form-control" id="exampleInputPassword1">
        </div>

        <button type="submit" class="btn btn-primary" @click.prevent="addUser">add user</button>
      </form>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">name</th>
          <th scope="col">email</th>
          <th scope="col">created_at</th>
          <th scope="col">updated_at</th>
          <th scope="col">action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in user" :key="index">
          <th scope="col">{{ index + 1 }}</th>
          <th scope="col">{{ user.name }}</th>
          <th scope="col">{{ user.email }}</th>
          <th scope="col">{{ user.created_at }}</th>
          <th scope="col">{{ user.updated_at }}</th>
          <th scope="col">
            <!-- Button trigger modal -->
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="$event => {
              editedUser.id = user.id;
              editedUser.name = user.name;
              editedUser.email = user.email;
            }">
              Edit
            </button>
            <button type="button" class="btn btn-danger" @click="deleteUser(user.id)">delete</button>
          </th>
        </tr>

      </tbody>
    </table>
  </div>
</template>
<script setup>
const user = ref(null)
const name = ref('');
const email = ref('');
const error = ref(null)
const editedUser = ref({
  id: null,
  email: null,
  name: null,
}
)
user.value = await getUser()

/**
 * @desc get user
 * @param 
 */
async function getUser() {
  return await $fetch('/api/users')
}
/**
 * @desc add user
 */
async function addUser() {
  const newUser = {
    name: name.value,
    email: email.value,
  };

  let addedUser = null
  if (name.value && email.value)
    addedUser = await $fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })

  if (addedUser) {
    // Clear input fields
    name.value = '';
    email.value = '';

    // Refresh user list
    user.value = await getUser();
  } else {
    console.error('Failed to add user');
  }
}
/**
 * @desc delete user
 */
async function deleteUser(id) {
  try {
    let deleteUserOrError = null
    if (id)
      deleteUserOrError = await $fetch('/api/users', {
        method: 'DELETE',
        body: {
          id: id,
        }
      })

    if (!deleteUserOrError) user.value = await getUser();
  } catch (error) {
    // Si ocurre un error de red u otro tipo de error
    console.error('Error deleting user', error);
    error.value = 'Failed to delete user';
  }

}
/**
 * @desc update users
 * @param 
 */
 async function editUser(editedUser) {

  try {
    let updatedUser = null;
    if (editedUser.id && editedUser.name) {
      updatedUser = await $fetch('/api/users', {
        method: 'PUT',
        body: JSON.stringify({
          id: editedUser.id,
          name: editedUser.name,
          email: editedUser.email,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    if (updatedUser) {
      user.value = await getUser();
    } else {
      throw new Error('Failed to update user');
    }
  } catch (error) {
    console.error('Error updating user', error);
    error.value = 'Failed to update user';
  }

}
useHead({
  link: {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
    type: "text/css",
  },
  script: {
    src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
  }
})
</script>