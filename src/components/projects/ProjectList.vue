<template>
  <section>
    <h2>Project List</h2>
    <ul>
      <project-item
        v-for="project in projects"
        :key="project.id"
        :name="project.name"
        :team-id="project.teamId"
        :project-id="project.id"
        :team-details-visible="selectedProjectId === project.id"
        @toggle-team-details="selectTeam"
      ></project-item>
    </ul>
  </section>
</template>

<script>
import ProjectItem from './ProjectItem.vue';
export default {
  name: 'ProjectList',
  components: {
    ProjectItem,
  },
  inject: ['projects'],
  data() {
    return {
      selectedProjectId: null,
    };
  },
  watch: {
    '$route.params.projectId'(newId) {
      this.selectedProjectId = newId || null;
    },
  },
  methods: {
    selectTeam(projectId) {
      const newSelectedProjectId =
        this.selectedProjectId === projectId ? null : projectId;
      this.selectedProjectId = newSelectedProjectId;
      if (newSelectedProjectId) {
        this.$router.push({
          name: 'project-members',
          params: { projectId: newSelectedProjectId },
        });
      } else {
        this.$router.push({ name: 'projects' });
      }
    },
  },
  created() {
    const projectId = this.$route.params.projectId;
    if (projectId) {
      this.selectedProjectId = projectId;
    }
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 2rem auto;
  max-width: 100%;
  padding: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: flex-start;
  flex-wrap: wrap;
}

li {
  list-style: none;
  padding: 8px 12px;
  cursor: pointer;
}

section {
  padding: 1rem;
}
</style>
