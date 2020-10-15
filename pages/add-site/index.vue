<template>
  <div>
    <section class="add-site">
      <div class="father__background">
        <div class="container">
          <AddSite />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import AddSite from '~/components/UI/AddSite.vue';
  export default {
    components: { AddSite },
  };
</script>
