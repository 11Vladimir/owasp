<template>
  <div>
    <section class="delete-site">
      <div class="father__background">
        <div class="container">
          <DeleteSite />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import DeleteSite from '~/components/UI/DeleteSite.vue';
  export default {
    components: { DeleteSite },
  };
</script>
