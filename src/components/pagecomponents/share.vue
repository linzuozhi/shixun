<template>
  <div>
    <span>{{ qslink }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      qslink: "",
    };
  },
  mounted() {
    let questionnairelink = localStorage.getItem("link");
    console.log(questionnairelink);
    this.qslink = questionnairelink;
    console.log(this.qslink);
  },
};
</script>