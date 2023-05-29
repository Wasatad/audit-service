<template>
  <el-empty style="min-height: 100vh" description="Полезное"></el-empty>
</template>

<script>
export default {
  middleware: ["auth"],
  name: "IndexPage",
};
</script>
